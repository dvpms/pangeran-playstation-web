"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export async function getBookingFormData() {
  try {
    const [consoles, addons] = await Promise.all([
      prisma.catalog.findMany({
        where: { type: "CONSOLE" },
        include: { tiers: { orderBy: { price: "asc" } } },
      }),
      prisma.catalog.findMany({
        where: { type: "ADDON" },
        include: { tiers: true },
      }),
    ]);

    return JSON.parse(JSON.stringify({ consoles, addons }));
  } catch (error) {
    console.error("Gagal mengambil data katalog:", error);
    return { consoles: [], addons: [] };
  }
}

// Task 1.1: Ambil semua catalog beserta pricing tiers-nya
export async function getAllCatalogsWithTiers() {
  try {
    const catalogs = await prisma.catalog.findMany({
      include: { tiers: true },
    });

    // Serialize untuk menghilangkan tipe non-serializable (Decimal, prototype methods)
    const serialized = JSON.parse(JSON.stringify(catalogs));

    // Konversi field Decimal ke Number agar aman dikirim ke client component
    return serialized.map((catalog) => ({
      ...catalog,
      tiers: catalog.tiers.map((tier) => ({
        ...tier,
        price: Number(tier.price),
        oldPrice: tier.oldPrice != null ? Number(tier.oldPrice) : null,
      })),
    }));
  } catch (error) {
    console.error("Gagal mengambil data katalog dengan tiers:", error);
    return [];
  }
}

// Task 1.3: Update nama dan deskripsi sebuah Catalog
export async function updateCatalog(id, payload) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return { success: false, message: "Unauthorized" };

    if (!payload.name?.trim()) {
      return { success: false, message: "Nama katalog tidak boleh kosong" };
    }

    await prisma.catalog.update({
      where: { id },
      data: {
        name: payload.name.trim(),
        description: payload.description,
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Gagal update catalog:", error);
    return { success: false, message: "Terjadi kesalahan server" };
  }
}

// Task 1.5: Update harga dan label sebuah PricingTier
export async function updatePricingTier(id, payload) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return { success: false, message: "Unauthorized" };

    if (!payload.price || payload.price <= 0) {
      return { success: false, message: "Harga harus berupa angka positif" };
    }

    // Jika oldPrice kosong/null/undefined → simpan null (hapus harga coret)
    const oldPrice =
      payload.oldPrice === "" ||
      payload.oldPrice === null ||
      payload.oldPrice === undefined
        ? null
        : payload.oldPrice;

    await prisma.pricingTier.update({
      where: { id },
      data: {
        label: payload.label,
        price: payload.price,
        oldPrice,
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Gagal update pricing tier:", error);
    return { success: false, message: "Terjadi kesalahan server" };
  }
}

// Task 1.7: Buat PricingTier baru untuk sebuah Catalog
export async function createPricingTier(catalogId, payload) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return { success: false, message: "Unauthorized" };

    if (!payload.label?.trim()) {
      return { success: false, message: "Label paket tidak boleh kosong" };
    }
    if (!payload.duration?.trim()) {
      return { success: false, message: "Durasi paket tidak boleh kosong" };
    }
    if (!payload.price || payload.price <= 0) {
      return { success: false, message: "Harga harus berupa angka positif" };
    }

    const oldPrice =
      payload.oldPrice === "" ||
      payload.oldPrice === null ||
      payload.oldPrice === undefined
        ? null
        : payload.oldPrice;

    await prisma.pricingTier.create({
      data: {
        catalogId,
        label: payload.label.trim(),
        duration: payload.duration.trim(),
        price: payload.price,
        oldPrice,
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Gagal membuat pricing tier baru:", error);
    return { success: false, message: "Terjadi kesalahan server" };
  }
}

// Task 1.9: Hapus PricingTier (dengan pengecekan booking aktif)
export async function deletePricingTier(id) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return { success: false, message: "Unauthorized" };

    // Cek apakah ada booking aktif yang menggunakan tier ini
    const activeBookingCount = await prisma.booking.count({
      where: {
        tierId: id,
        status: { notIn: ["COMPLETED", "CANCELLED"] },
      },
    });

    if (activeBookingCount > 0) {
      return {
        success: false,
        message: `Tidak bisa dihapus: ada ${activeBookingCount} booking aktif yang menggunakan paket ini`,
      };
    }

    await prisma.pricingTier.delete({ where: { id } });

    return { success: true };
  } catch (error) {
    console.error("Gagal menghapus pricing tier:", error);
    return { success: false, message: "Terjadi kesalahan server" };
  }
}
