// src/app/actions/booking.js
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
          // fullAddress: payload.fullAddress,
          totalPrice: payload.totalPrice,
          addonTv: payload.addonTv,
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

      return booking;
    });

    // 3. Format isi email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: "pangeranplaystation@gmail.com",
      subject: "Konfirmasi Booking Baru",
      text: `Ada booking baru!`, // fallback
      html: `
        <div style="font-family: Arial, sans-serif; color: #222; background: #f7f7fa; padding: 24px;">
          <!-- Header Logo -->
          <div style="text-align: center; margin-bottom: 24px;">
            <img src="https://res.cloudinary.com/dnmhna2fc/image/upload/q_auto/f_auto/v1776429034/logo_n3akzn.png" alt="Pangeran Playstation" style="height: 60px; margin-bottom: 8px;" />
            <h2 style="color: #2d6cdf; margin: 0;">Konfirmasi Booking Baru</h2>
          </div>
          <!-- Booking Table -->
          <table style="border-collapse: collapse; width: 100%; background: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 8px #0001;">
            <tbody>
              <tr>
                <td style="font-weight: bold; padding: 10px 16px; background: #f0f4fa;">ID Pesanan</td>
                <td style="padding: 10px 16px;">${newBooking.id.slice(0, 8).toUpperCase()}</td>
              </tr>
              <tr>
                <td style="font-weight: bold; padding: 10px 16px; background: #f0f4fa;">Nama</td>
                <td style="padding: 10px 16px;">${payload.customerName}</td>
              </tr>
              <tr>
                <td style="font-weight: bold; padding: 10px 16px; background: #f0f4fa;">Unit</td>
                <td style="padding: 10px 16px;">${payload.unitName}</td>
              </tr>
              <tr>
                <td style="font-weight: bold; padding: 10px 16px; background: #f0f4fa;">Paket</td>
                <td style="padding: 10px 16px;">${payload.tierLabel}</td>
              </tr>
              <tr>
                <td style="font-weight: bold; padding: 10px 16px; background: #f0f4fa;">Add-on TV</td>
                <td style="padding: 10px 16px;">${payload.addonTv ? "Ya" : "Tidak"}</td>
              </tr>
              <tr>
                <td style="font-weight: bold; padding: 10px 16px; background: #f0f4fa;">Mulai</td>
                <td style="padding: 10px 16px;">${new Date(payload.startDate).toLocaleDateString("id-ID")}</td>
              </tr>
              <tr>
                <td style="font-weight: bold; padding: 10px 16px; background: #f0f4fa;">Area</td>
                <td style="padding: 10px 16px;">${payload.deliveryArea}</td>
              </tr>
              <tr>
                <td style="font-weight: bold; padding: 10px 16px; background: #f0f4fa;">Total Harga</td>
                <td style="padding: 10px 16px; color: #2d6cdf; font-weight: bold;">Rp ${payload.totalPrice.toLocaleString("id-ID")}</td>
              </tr>
            </tbody>
          </table>
          <!-- Footer -->
          <div style="margin-top: 32px; text-align: center; color: #888; font-size: 13px;">
            <p>Segera cek dashboard admin untuk detail dan konfirmasi!</p>
            <hr style="margin: 24px 0; border: none; border-top: 1px solid #eee;">
            <p>
              <b>Pangeran Playstation</b><br>
              <a href="https://yourdomain.com" style="color: #2d6cdf; text-decoration: none;">yourdomain.com</a><br>
              <span style="font-size: 12px;">Email otomatis dari sistem booking</span>
            </p>
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

    // Convert Decimal objects to numbers for Client Component serialization
    return bookings.map((booking) => ({
      ...booking,
      totalPrice: booking.totalPrice ? Number(booking.totalPrice) : 0,
      tier: booking.tier
        ? {
            ...booking.tier,
            price: booking.tier.price ? Number(booking.tier.price) : 0,
            oldPrice: booking.tier.oldPrice ? Number(booking.tier.oldPrice) : 0, // Tambahkan baris ini!
            discount: booking.tier.discount ? Number(booking.tier.discount) : 0,
            catalog: booking.tier.catalog ? { ...booking.tier.catalog } : null,
          }
        : null,
      items: booking.items
        ? booking.items.map((item) => ({
            ...item,
            inventory: item.inventory
              ? {
                  ...item.inventory,
                  dailyRate: item.inventory.dailyRate
                    ? Number(item.inventory.dailyRate)
                    : 0,
                }
              : null,
          }))
        : [],
    }));
  } catch (error) {
    console.error("Gagal mengambil data booking:", error);
    return [];
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
