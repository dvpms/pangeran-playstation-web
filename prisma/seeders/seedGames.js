// prisma/seeders/seedGames.js
// Jalankan: node prisma/seeders/seedGames.js
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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

async function seedGames() {
  console.log("--- Seeding game catalog ---");
  let added = 0;
  let skipped = 0;

  for (const game of hardcodedGames) {
    const existing = await prisma.gameCatalog.findFirst({ where: { title: game.title } });
    if (!existing) {
      await prisma.gameCatalog.create({ data: game });
      added++;
    } else {
      skipped++;
    }
  }

  console.log(`✅ Selesai: ${added} game ditambahkan, ${skipped} game dilewati (sudah ada)`);
}

seedGames()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error("❌ Error:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
