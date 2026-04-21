// src/app/actions/inventory.js
"use server";

import { convertDecimals } from "@/lib/convertDecimal";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// 1. Ambil Semua Data Katalog & Mesin
export async function getInventory() {
  try {
    const catalogs = await prisma.catalog.findMany({
      select: {
        id: true,
        name: true,
        inventories: {
          select: {
            id: true,
            serialCode: true,
            status: true,
          },
          orderBy: { serialCode: 'asc' }
        },
      },
      orderBy: { name: 'asc' }
    });
    return catalogs;
  } catch (error) {
    console.error("Gagal mengambil data inventaris:", error);
    return [];
  }
}

// 2. Tambah Unit Fisik Baru ke Gudang
export async function addPhysicalUnit(catalogId, serialCode) {
  try {
    await prisma.inventory.create({
      data: {
        catalogId: catalogId,
        serialCode: serialCode.toUpperCase(), // Paksa huruf besar agar seragam
        status: 'AVAILABLE'
      }
    });
    
    // Perintahkan Next.js untuk menghapus cache halaman ini
    revalidatePath('/admin/inventory'); 
    return { success: true };
    
  } catch (error) {
    console.error("Gagal tambah unit:", error);
    // P2002 adalah kode error Prisma untuk data unik (Unique Constraint)
    if (error.code === 'P2002') {
      return { success: false, message: "Gagal: Kode Seri tersebut sudah ada di database." };
    }
    return { success: false, message: "Terjadi kesalahan sistem." };
  }
}

// 3. Ubah Status Mesin (Misal: Rusak/Maintenance)
export async function updateUnitStatus(inventoryId, newStatus) {
  try {
    await prisma.inventory.update({
      where: { id: inventoryId },
      data: { status: newStatus }
    });
    
    revalidatePath('/admin/inventory');
    return { success: true };
    
  } catch (error) {
    console.error("Gagal update status:", error);
    return { success: false, message: "Gagal memperbarui status unit." };
  }
}

// 4. Hapus Unit Permanen (Opsional)
export async function deletePhysicalUnit(inventoryId) {
  try {
    await prisma.inventory.delete({
      where: { id: inventoryId }
    });
    
    revalidatePath('/admin/inventory');
    return { success: true };
    
  } catch (error) {
    return { success: false, message: "Gagal menghapus unit. Pastikan unit tidak sedang disewa." };
  }
}

// 5. Tambah Jenis Konsol Baru
export async function addCatalog(name) {
  try {
    if (!name || name.trim() === "") {
      return { success: false, message: "Nama konsol tidak boleh kosong." };
    }

    const catalog = await prisma.catalog.create({
      data: {
        name: name.trim(),
      },
    });
    
    revalidatePath('/admin/inventory');
    return { success: true, data: catalog };
    
  } catch (error) {
    console.error("Gagal tambah konsol:", error);
    if (error.code === 'P2002') {
      return { success: false, message: "Konsol dengan nama ini sudah ada." };
    }
    return { success: false, message: "Terjadi kesalahan saat menambah konsol." };
  }
}