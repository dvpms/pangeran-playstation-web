// const { PrismaClient } = require('@prisma/client');
// import { PrismaClient } from "./generated/prisma";
// import { PrismaClient } from "./generated/prisma/client";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

// Inisialisasi tanpa argumen tambahan untuk menggunakan Library Engine bawaan Node.js

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('--- Memulai proses seeding ---');

  try {
    // 1. Pembersihan data (Berurutan untuk menghindari Foreign Key constraint)
    await prisma.bookingItem.deleteMany();
    await prisma.booking.deleteMany();
    await prisma.inventory.deleteMany();
    await prisma.catalog.deleteMany();
    console.log('✅ Data lama dibersihkan');

    // 2. Buat Katalog Produk
    const ps4Pro = await prisma.catalog.create({
      data: { name: 'PS4 Pro 4K', type: 'CONSOLE', basePrice: 105000 }
    });
    const ps4Slim = await prisma.catalog.create({
      data: { name: 'PS4 Slim', type: 'CONSOLE', basePrice: 60000 }
    });
    const tv40 = await prisma.catalog.create({
      data: { name: 'Smart TV 40" Add-on', type: 'ADDON', basePrice: 25000 }
    });
    console.log('✅ Katalog produk berhasil dibuat');

    // 3. Buat Inventory Fisik
    await prisma.inventory.createMany({
      data: [
        { catalogId: ps4Pro.id, serialCode: 'PRO-001', status: 'AVAILABLE' },
        { catalogId: ps4Pro.id, serialCode: 'PRO-002', status: 'AVAILABLE' },
        { catalogId: ps4Pro.id, serialCode: 'PRO-003', status: 'MAINTENANCE' },
        { catalogId: ps4Slim.id, serialCode: 'SLIM-001', status: 'AVAILABLE' },
        { catalogId: tv40.id, serialCode: 'TV-001', status: 'AVAILABLE' },
      ],
    });
    console.log('✅ Inventaris fisik berhasil disuntikkan');

  } catch (error) {
    console.error('❌ Error saat proses seeding:', error);
    process.exit(1);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
    console.log('--- Seeding Selesai ---');
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });