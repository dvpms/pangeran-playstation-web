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
    // 5. Seed Game Catalog (idempotent)
    // =====================================
    const hardcodedGames = [
      { title: "Moto GP 25", imageUrl: "https://res.cloudinary.com/dnmhna2fc/image/upload/q_auto/f_auto/moto-gp-25_h9grti.jpg" },
      { title: "NFS Heat", imageUrl: "https://res.cloudinary.com/dnmhna2fc/image/upload/q_auto/f_auto/nfs-heat_kzfqpu.jpg" },
      { title: "Naruto Storm 4", imageUrl: "https://res.cloudinary.com/dnmhna2fc/image/upload/q_auto/f_auto/naruto-storm-4_wykpfy.jpg" },
      { title: "Spiderman Miles Morales", imageUrl: "https://res.cloudinary.com/dnmhna2fc/image/upload/q_auto/f_auto/spider-man_odcq0g.jpg" },
      { title: "Lego Marvel Avengers", imageUrl: "https://res.cloudinary.com/dnmhna2fc/image/upload/q_auto/f_auto/lego-avengers_teddz6.jpg" },
      { title: "Minecraft Dungeons", imageUrl: "https://res.cloudinary.com/dnmhna2fc/image/upload/q_auto/f_auto/minecraft-dungeons_krowpo.jpg" },
      { title: "Resident Evil 2 Remake", imageUrl: "https://res.cloudinary.com/dnmhna2fc/image/upload/q_auto/f_auto/resident-evil-2_g1v84i.jpg" },
      { title: "It Takes Two", imageUrl: "https://res.cloudinary.com/dnmhna2fc/image/upload/q_auto/f_auto/it-takes-two_uy4f4o.jpg" },
      { title: "Horizon Zero Dawn", imageUrl: "https://res.cloudinary.com/dnmhna2fc/image/upload/q_auto/f_auto/horizon-zero-dawn_gpcdzi.jpg" },
      { title: "God of War Ragnarok", imageUrl: "https://res.cloudinary.com/dnmhna2fc/image/upload/q_auto/f_auto/god-of-war-ragnarok_gpoeqr.jpg" },
      { title: "FC 26", imageUrl: "https://res.cloudinary.com/dnmhna2fc/image/upload/q_auto/f_auto/fc-26_fioyqd.jpg" },
      { title: "Dark Souls Remastered", imageUrl: "https://res.cloudinary.com/dnmhna2fc/image/upload/q_auto/f_auto/dark-souls_coabyz.jpg" },
      { title: "F1", imageUrl: "https://res.cloudinary.com/dnmhna2fc/image/upload/q_auto/f_auto/f1_kgpg6i.jpg" },
      { title: "Ben 10", imageUrl: "https://res.cloudinary.com/dnmhna2fc/image/upload/q_auto/f_auto/ben-ten_vlylpq.jpg" },
    ];

    let gamesSeeded = 0;
    for (const game of hardcodedGames) {
      const existing = await prisma.gameCatalog.findFirst({ where: { title: game.title } });
      if (!existing) {
        await prisma.gameCatalog.create({ data: game });
        gamesSeeded++;
      }
    }
    console.log(`✅ Game catalog berhasil di-seed (${gamesSeeded} game baru ditambahkan)`);

    // =====================================
    // 6. Buat Akun Admin Pertama
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
