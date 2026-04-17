// src/app/actions/booking.js
"use server";

import { prisma } from "@/lib/prisma";

export async function getUnavailableDates(catalogId) {
  if (!catalogId) return [];

  try {
    // 1. Hitung total mesin fisik yang SIAP disewakan (Bukan yang rusak/MAINTENANCE)
    const totalUnits = await prisma.inventory.count({
      where: {
        catalogId: catalogId,
        status: 'AVAILABLE'
      }
    });

    // Jika tidak ada mesin sama sekali, blokir semua tanggal
    if (totalUnits === 0) {
      return ['ALL'];
    }

    // 2. Ambil semua pesanan aktif dari hari ini ke depan
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const activeBookings = await prisma.booking.findMany({
      where: {
        items: {
          some: { inventory: { catalogId: catalogId } }
        },
        status: {
          // Kita anggap pesanan PENDING juga mengunci jadwal agar tidak rebutan
          in: ['PENDING', 'WAITING_PAYMENT', 'CONFIRMED', 'ACTIVE'] 
        },
        endDate: { gte: today }
      },
      select: {
        startDate: true,
        endDate: true,
        items: {
          where: { inventory: { catalogId: catalogId } }
        }
      }
    });

    // 3. Petakan penggunaan mesin per tanggal (Misal: 18 April dipakai 2 unit)
    const dateUsage = {}; 

    activeBookings.forEach(booking => {
      const start = new Date(booking.startDate);
      const end = new Date(booking.endDate);
      const itemCount = booking.items.length; // Berapa unit yang disewa dalam 1 pesanan ini

      // Looping dari hari pertama sampai hari terakhir sewa
      for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        // Format ke YYYY-MM-DD menggunakan local time untuk mencegah bug zona waktu (UTC)
        const dateStr = d.toLocaleDateString('en-CA'); 
        
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