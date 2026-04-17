// prisma/seed.js
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();

async function main() {
  console.log("--- Memulai proses seeding data paket ---");

  try {
    // 1. Bersihkan tabel (Urutan Bottom-Up wajib agar tidak error relasi)
    await prisma.bookingItem.deleteMany();
    await prisma.booking.deleteMany();
    await prisma.pricingTier.deleteMany();
    await prisma.inventory.deleteMany();
    await prisma.catalog.deleteMany();
    console.log("✅ Data lama dibersihkan");

    // 2. Buat Katalog (Induk)
    const ps4Slim = await prisma.catalog.create({
      data: {
        name: "PS4 Slim",
        type: "CONSOLE",
        description: "Hemat daya, hening, dan performa stabil.",
      },
    });

    const tv40 = await prisma.catalog.create({
      data: {
        name: 'Smart TV 32"/40"',
        type: "ADDON",
        description: "Gak ada TV di rumah? Sewa satu set lengkap.",
      },
    });
    console.log("✅ Katalog produk berhasil dibuat");

    // 3. Buat Pricing Tiers (Anak Katalog - Sesuai Brosur Pangeran Playstation)
    await prisma.pricingTier.createMany({
      data: [
        // Paket PS4 Slim
        {
          catalogId: ps4Slim.id,
          duration: "12h",
          label: "12 Jam",
          price: 75000,
        },
        {
          catalogId: ps4Slim.id,
          duration: "1d",
          label: "1 Hari",
          price: 115000,
          oldPrice: 120000,
        },
        {
          catalogId: ps4Slim.id,
          duration: "2d",
          label: "2 Hari",
          price: 225000,
          oldPrice: 240000,
        },
        {
          catalogId: ps4Slim.id,
          duration: "3d",
          label: "3 Hari",
          price: 330000,
          oldPrice: 360000,
        },

        // Paket TV (Flat per sewa)
        {
          catalogId: tv40.id,
          duration: "flat",
          label: "Sewa TV",
          price: 49000,
        },
      ],
    });
    console.log("✅ Paket harga bertingkat berhasil disuntikkan");

    // 4. Buat Inventaris Fisik (Mesin yang siap disewakan)
    await prisma.inventory.createMany({
      data: [
        { catalogId: ps4Slim.id, serialCode: "SLIM-001", status: "AVAILABLE" },
        { catalogId: ps4Slim.id, serialCode: "SLIM-002", status: "AVAILABLE" },
        { catalogId: tv40.id, serialCode: "TV-001", status: "AVAILABLE" },
      ],
    });
    // ... (Kode seed katalog dan inventory sebelumnya) ...

    console.log("✅ Inventaris fisik berhasil disuntikkan");

    // =====================================
    // 5. Buat Akun Admin Pertama
    // =====================================
    const hashedPassword = await bcrypt.hash("Pangeran123!", 10); // GANTI PASSWORD INI NANTI

    // Cek apakah admin sudah ada agar tidak error duplikat jika di-seed ulang
    const existingAdmin = await prisma.user.findUnique({
      where: { email: "admin@pangeran.com" },
    });
    if (!existingAdmin) {
      await prisma.user.create({
        data: {
          name: "Pangeran Owner",
          email: "admin@pangeran.com", // Ini email untuk login
          password: hashedPassword,
          role: "OWNER",
        },
      });
      console.log("✅ Akun Admin berhasil dibuat (email: admin@pangeran.com)");
    }
  } catch (error) {
    console.error("❌ Error saat proses seeding:", error);
    process.exit(1);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
    console.log("--- Seeding Selesai ---");
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
