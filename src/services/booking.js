"use server";

import { prisma } from "@/lib/prisma";
import { transporter } from "./email";

export async function getUnavailableDates(catalogId) {
  if (!catalogId) return [];

  try {
    // 1. Hitung total mesin fisik yang SIAP disewakan (Bukan yang rusak/MAINTENANCE)
    const totalUnits = await prisma.inventory.count({
      where: {
        catalogId: catalogId,
        status: "AVAILABLE",
      },
    });

    // Jika tidak ada mesin sama sekali, blokir semua tanggal
    if (totalUnits === 0) {
      return ["ALL"];
    }

    // 2. Ambil semua pesanan aktif dari hari ini ke depan
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const activeBookings = await prisma.booking.findMany({
      where: {
        items: {
          some: { inventory: { catalogId: catalogId } },
        },
        status: {
          // Kita anggap pesanan PENDING juga mengunci jadwal agar tidak rebutan
          in: ["PENDING", "WAITING_PAYMENT", "CONFIRMED", "ACTIVE"],
        },
        endDate: { gte: today },
      },
      select: {
        startDate: true,
        endDate: true,
        items: {
          where: { inventory: { catalogId: catalogId } },
        },
      },
    });

    // 3. Petakan penggunaan mesin per tanggal (Misal: 18 April dipakai 2 unit)
    const dateUsage = {};

    activeBookings.forEach((booking) => {
      const start = new Date(booking.startDate);
      const end = new Date(booking.endDate);
      const itemCount = booking.items.length; // Berapa unit yang disewa dalam 1 pesanan ini

      // Looping dari hari pertama sampai hari terakhir sewa
      for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        // Format ke YYYY-MM-DD menggunakan local time untuk mencegah bug zona waktu (UTC)
        const dateStr = d.toLocaleDateString("en-CA");

        if (!dateUsage[dateStr]) dateUsage[dateStr] = 0;
        dateUsage[dateStr] += itemCount;
      }
    });

    // 4. Saring tanggal yang pemakaiannya sudah mentok kuota total mesin
    const unavailableDates = [];
    for (const [date, usage] of Object.entries(dateUsage)) {
      if (usage >= totalUnits) {
        unavailableDates.push(date);
      }
    }

    return unavailableDates;
  } catch (error) {
    console.error("Gagal mengecek ketersediaan:", error);
    return []; // Jika error, anggap tersedia (fallback)
  }
}

// Tambahkan di bagian bawah src/app/actions/booking.js

export async function submitBooking(payload) {
  try {
    // 1. Cari SATU unit mesin fisik yang benar-benar nganggur di rentang tanggal tersebut
    const availableUnit = await prisma.inventory.findFirst({
      where: {
        catalogId: payload.catalogId,
        status: "AVAILABLE",
        // Pastikan mesin ini TIDAK ADA di tabel BookingItem yang jadwalnya bentrok
        bookingItems: {
          none: {
            booking: {
              status: {
                in: ["PENDING", "WAITING_PAYMENT", "CONFIRMED", "ACTIVE"],
              },
              // Logika irisan waktu (Overlap)
              startDate: { lte: new Date(payload.endDate) },
              endDate: { gte: new Date(payload.startDate) },
            },
          },
        },
      },
    });

    if (!availableUnit) {
      return {
        success: false,
        message:
          "Gagal: Unit sudah habis di-booking pada tanggal tersebut beberapa detik yang lalu. Silakan pilih tanggal lain.",
      };
    }

    if (payload.addonTv && !payload.tvCatalogId) {
      return {
        success: false,
        message: "Sistem mendeteksi anomali: Data ID TV tidak ditemukan dalam request payload Anda.",
      };
    }

    let availableTv = null;
    if (payload.addonTv && payload.tvCatalogId) {
      availableTv = await prisma.inventory.findFirst({
        where: {
          catalogId: payload.tvCatalogId, // Cari spesifik TV
          status: "AVAILABLE",
          bookingItems: {
            none: {
              booking: {
                status: {
                  in: ["PENDING", "CONFIRMED", "ACTIVE"],
                },
                startDate: { lte: new Date(payload.endDate) },
                endDate: { gte: new Date(payload.startDate) },
              },
            },
          },
        },
      });

      // Jika user minta TV tapi TV-nya habis, TOLAK pesanannya
      if (!availableTv) {
        return {
          success: false,
          message:
            "Gagal: Add-on TV sudah disewa orang lain pada tanggal tersebut. Silakan matikan Add-on TV atau pilih tanggal lain.",
        };
      }
    }

    // 2. Eksekusi Penyimpanan secara Atomik (Database Transaction)
    // Jika salah satu proses gagal, semua dibatalkan otomatis (Rollback)
    const newBooking = await prisma.$transaction(async (tx) => {
      // A. Buat data pesanan
      const booking = await tx.booking.create({
        data: {
          customerName: payload.customerName,
          whatsappNumber: payload.whatsappNumber,
          tierId: payload.tierId,
          startDate: new Date(payload.startDate),
          endDate: new Date(payload.endDate),
          deliveryArea: payload.deliveryArea,
          address: payload.address,
          paymentMethod: payload.paymentMethod,
          sourceInfo: payload.sourceInfo,
          totalPrice: payload.totalPrice,
          addonTv: payload.addonTv,
          jaminan: payload.jaminan,
          socialMediaType: payload.socialMediaType,
          socialMediaUsername: payload.socialMediaUsername,
          status: "PENDING",
        },
      });

      // B. Kunci mesin fisik tersebut untuk pesanan ini
      await tx.bookingItem.create({
        data: {
          bookingId: booking.id,
          inventoryId: availableUnit.id,
        },
      });

      if (availableTv) {
        await tx.bookingItem.create({
          data: {
            bookingId: booking.id, 
            inventoryId: availableTv.id },
        });
      }

      return booking;
    });

    // 3. Format isi email & teks copy-paste
    const bookingCode = newBooking.id.slice(0, 8).toUpperCase();
    const startDateFormatted = new Date(payload.startDate).toLocaleDateString("id-ID", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    const paymentMethodLabel =
      payload.paymentMethod === "CASH"
        ? "Cash (Bayar di Tempat)"
        : payload.paymentMethod === "TRANSFER"
        ? "Transfer Bank"
        : payload.paymentMethod || "-";

    const plainSummary = `*KONFIRMASI BOOKING PANGERAN PLAYSTATION*
----------------------------------------
ID Pesanan: #${bookingCode}
Nama: ${payload.customerName}
No. WhatsApp: ${payload.whatsappNumber}
Unit: ${payload.unitName}
Paket: ${payload.tierLabel}
Add-on TV: ${payload.addonTv ? "Ya" : "Tidak"}
Tanggal Mulai: ${startDateFormatted}
Metode Pembayaran: ${paymentMethodLabel}
Area Layanan: ${payload.deliveryArea || "-"}
Detail Alamat & Blok: ${payload.address || "-"}
Dokumen Jaminan: ${payload.jaminan || "-"}
Media Sosial: ${payload.socialMediaType || "-"} (${payload.socialMediaUsername || "-"})
Dapat Info Dari: ${payload.sourceInfo || "-"}
Total Harga: Rp ${Number(payload.totalPrice).toLocaleString("id-ID")}
----------------------------------------`;

    const waGreeting = `Halo ${payload.customerName}, kami dari Admin Pangeran Playstation.

Terima kasih telah melakukan booking! Berikut rincian pesanan Anda:
- ID Pesanan: #${bookingCode}
- Unit: ${payload.unitName} (${payload.tierLabel})
- Add-on TV: ${payload.addonTv ? "Ya" : "Tidak"}
- Tanggal Mulai: ${startDateFormatted}
- Metode Pembayaran: ${paymentMethodLabel}
- Area / Alamat: ${payload.deliveryArea} - ${payload.address || "-"}
- Total: Rp ${Number(payload.totalPrice).toLocaleString("id-ID")}
`;

    const waLink = `https://wa.me/${payload.whatsappNumber.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(waGreeting)}`;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: "devranmalik82@gmail.com",
      subject: `[Booking Baru] #${bookingCode} - ${payload.customerName} (${payload.unitName})`,
      text: plainSummary,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1e293b; background: #f1f5f9; padding: 24px;">
          <div style="max-width: 620px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 16px rgba(0,0,0,0.08); border: 1px solid #e2e8f0;">
            
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%); padding: 28px 24px; text-align: center; color: #ffffff;">
              <img src="https://res.cloudinary.com/dnmhna2fc/image/upload/q_auto/f_auto/v1776429034/logo_n3akzn.png" alt="Pangeran Playstation" style="height: 52px; margin-bottom: 12px;" />
              <h2 style="margin: 0; font-size: 22px; font-weight: 800; letter-spacing: -0.02em;">Booking Baru Masuk!</h2>
              <p style="margin: 6px 0 0; font-size: 14px; opacity: 0.9;">Kode Pesanan: <strong>#${bookingCode}</strong></p>
            </div>

            <div style="padding: 24px;">

              <!-- CTA Button: Direct WhatsApp -->
              <div style="text-align: center; margin-bottom: 24px;">
                <a href="${waLink}" target="_blank" style="display: inline-block; background: #25D366; color: #ffffff; font-weight: 700; font-size: 15px; padding: 12px 24px; border-radius: 10px; text-decoration: none; box-shadow: 0 2px 8px rgba(37, 211, 102, 0.35);">
                  Hubungi Customer
                </a>
              </div>

              <!-- Table of Details -->
              <h3 style="font-size: 16px; font-weight: 700; color: #0f172a; margin: 0 0 12px; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px;">
                📋 Detail Lengkap Pesanan
              </h3>

              <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 24px;">
                <tbody>
                  <tr style="border-bottom: 1px solid #f1f5f9;">
                    <td style="padding: 10px 12px; font-weight: 600; color: #64748b; width: 38%; background: #f8fafc;">Nama Customer</td>
                    <td style="padding: 10px 12px; font-weight: 700; color: #0f172a;">${payload.customerName}</td>
                  </tr>
                  <tr style="border-bottom: 1px solid #f1f5f9;">
                    <td style="padding: 10px 12px; font-weight: 600; color: #64748b; background: #f8fafc;">Nomor WhatsApp</td>
                    <td style="padding: 10px 12px; font-weight: 700; color: #2563eb;">
                      <a href="https://wa.me/${payload.whatsappNumber.replace(/[^0-9]/g, "")}" style="color: #2563eb; text-decoration: none;">${payload.whatsappNumber}</a>
                    </td>
                  </tr>
                  <tr style="border-bottom: 1px solid #f1f5f9;">
                    <td style="padding: 10px 12px; font-weight: 600; color: #64748b; background: #f8fafc;">Unit Konsol</td>
                    <td style="padding: 10px 12px; font-weight: 600; color: #0f172a;">${payload.unitName}</td>
                  </tr>
                  <tr style="border-bottom: 1px solid #f1f5f9;">
                    <td style="padding: 10px 12px; font-weight: 600; color: #64748b; background: #f8fafc;">Paket Durasi</td>
                    <td style="padding: 10px 12px; font-weight: 600; color: #0f172a;">${payload.tierLabel}</td>
                  </tr>
                  <tr style="border-bottom: 1px solid #f1f5f9;">
                    <td style="padding: 10px 12px; font-weight: 600; color: #64748b; background: #f8fafc;">Add-on TV</td>
                    <td style="padding: 10px 12px; font-weight: 600; color: ${payload.addonTv ? "#16a34a" : "#64748b"};">${payload.addonTv ? "Ya (+ TV)" : "Tidak"}</td>
                  </tr>
                  <tr style="border-bottom: 1px solid #f1f5f9;">
                    <td style="padding: 10px 12px; font-weight: 600; color: #64748b; background: #f8fafc;">Tanggal Mulai</td>
                    <td style="padding: 10px 12px; font-weight: 600; color: #0f172a;">${startDateFormatted}</td>
                  </tr>
                  <tr style="border-bottom: 1px solid #f1f5f9;">
                    <td style="padding: 10px 12px; font-weight: 600; color: #64748b; background: #f8fafc;">Metode Pembayaran</td>
                    <td style="padding: 10px 12px; font-weight: 700; color: #0f172a;">
                      <span style="display: inline-block; background: #e0f2fe; color: #0369a1; padding: 4px 10px; border-radius: 6px; font-size: 13px;">${paymentMethodLabel}</span>
                    </td>
                  </tr>
                  <tr style="border-bottom: 1px solid #f1f5f9;">
                    <td style="padding: 10px 12px; font-weight: 600; color: #64748b; background: #f8fafc;">Area Layanan</td>
                    <td style="padding: 10px 12px; font-weight: 600; color: #0f172a;">${payload.deliveryArea || "-"}</td>
                  </tr>
                  <tr style="border-bottom: 1px solid #f1f5f9;">
                    <td style="padding: 10px 12px; font-weight: 600; color: #64748b; background: #f8fafc;">Detail Alamat & Blok</td>
                    <td style="padding: 10px 12px; font-weight: 500; color: #0f172a; white-space: pre-wrap;">${payload.address || "-"}</td>
                  </tr>
                  <tr style="border-bottom: 1px solid #f1f5f9;">
                    <td style="padding: 10px 12px; font-weight: 600; color: #64748b; background: #f8fafc;">Dokumen Jaminan</td>
                    <td style="padding: 10px 12px; font-weight: 600; color: #0f172a;">${payload.jaminan || "-"}</td>
                  </tr>
                  <tr style="border-bottom: 1px solid #f1f5f9;">
                    <td style="padding: 10px 12px; font-weight: 600; color: #64748b; background: #f8fafc;">Akun Media Sosial</td>
                    <td style="padding: 10px 12px; font-weight: 600; color: #0f172a;">${payload.socialMediaType || "-"} (${payload.socialMediaUsername || "-"})</td>
                  </tr>
                  <tr style="border-bottom: 1px solid #f1f5f9;">
                    <td style="padding: 10px 12px; font-weight: 600; color: #64748b; background: #f8fafc;">Dapat Info Dari</td>
                    <td style="padding: 10px 12px; font-weight: 600; color: #0f172a;">${payload.sourceInfo || "-"}</td>
                  </tr>
                  <tr style="background: #f8fafc;">
                    <td style="padding: 12px; font-weight: 700; color: #0f172a;">Total Biaya</td>
                    <td style="padding: 12px; font-weight: 800; font-size: 16px; color: #2563eb;">Rp ${Number(payload.totalPrice).toLocaleString("id-ID")}</td>
                  </tr>
                </tbody>
              </table>

              <!-- Box Siap Salin / Copy-Paste -->
              <div style="margin-top: 24px; background: #f8fafc; border: 1px dashed #cbd5e1; border-radius: 12px; padding: 16px;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                  <strong style="font-size: 13px; color: #475569; text-transform: uppercase; letter-spacing: 0.05em;">
                    📋 Format Teks Siap Salin (Copy & Paste)
                  </strong>
                </div>
                <div style="font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace; font-size: 12.5px; line-height: 1.6; color: #1e293b; background: #ffffff; padding: 12px; border-radius: 8px; border: 1px solid #e2e8f0; white-space: pre-wrap; word-break: break-word; user-select: all;">${plainSummary}</div>
                <p style="margin: 8px 0 0; font-size: 11px; color: #94a3b8;">*Klik/blok kotak di atas untuk menyalin rangkuman pesanan secara instan.</p>
              </div>

            </div>

            <!-- Footer -->
            <div style="background: #f8fafc; border-top: 1px solid #e2e8f0; padding: 18px 24px; text-align: center; color: #64748b; font-size: 12px;">
              <p style="margin: 0 0 6px;">Segera cek dashboard admin untuk memverifikasi dan mengubah status booking.</p>
              <p style="margin: 0; font-weight: 600; color: #0f172a;">Pangeran Playstation Automation</p>
            </div>

          </div>
        </div>
      `,
    };
    await transporter.sendMail(mailOptions);

    return {
      success: true,
      message: "Booking berhasil, notifikasi email sudah dikirim.",
    };
  } catch (error) {
    console.error("Gagal submit booking:", error);
    return {
      success: false,
      message: "Terjadi kesalahan server saat memproses pesanan Anda.",
    };
  }
}

export async function getAllBookings() {
  try {
    const bookings = await prisma.booking.findMany({
      include: {
        tier: { include: { catalog: true } },
        items: { include: { inventory: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    return JSON.parse(JSON.stringify(bookings));
  } catch (error) {
    console.error("Gagal mengambil data booking:", error);
    return [];
  }
}

export async function getBookingById(id) {
  try {
    const booking = await prisma.booking.findUnique({
      where: { id },
      include: {
        tier: { include: { catalog: true } },
        items: { include: { inventory: true } },
      },
    });

    return booking ? JSON.parse(JSON.stringify(booking)) : null;
  } catch (error) {
    console.error("Gagal mengambil detail booking:", error);
    return null;
  }
}

export async function updateBookingStatus(id, newStatus) {
  try {
    await prisma.booking.update({
      where: { id },
      data: { status: newStatus },
    });
    return { success: true };
  } catch (error) {
    console.error("Gagal update status booking:", error);
    return { success: false, error: error.message };
  }
}

export async function deleteBooking(id) {
  try {
    // Delete associated booking items first
    await prisma.bookingItem.deleteMany({
      where: { bookingId: id },
    });

    // Then delete the booking
    await prisma.booking.delete({
      where: { id },
    });

    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
