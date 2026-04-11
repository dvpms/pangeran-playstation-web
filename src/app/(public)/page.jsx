import HeroSection from "./components/HeroSection";
import CatalogUnit from "./components/CatalogUnit";
import GamesCarousel from "./components/GamesCarousel";
import HowTo from "./components/HowTo";
import Terms from "./components/Terms";
import FinalCTA from "./components/FinalCTA";
import CoverageArea from "./components/CoverageArea";
import WhatsAppFloatingButton from '@/components/ui/WhatsAppFloatingButton';

export default function Page() {
  const items = [
    {
      title: "PS4 Slim",
      subtitle: "Termasuk 2 Stick, Kabel HDMI, Kabel Power",
      price: [
        { duration: "12 Jam", cost: "75k" },
        { duration: "1 Hari", cost: "115k" },
        { duration: "2 Hari", cost: "225k" },
        { duration: "3 Hari", cost: "330k" },
      ],
      image: "/images/ps4-slim1.png",
    },
    {
      title: "TCL 40 Inch",
      label: "Add-on",
      subtitle: "Smart TV 40 inch dengan resolusi Full HD",
      price: [
        { duration: "Hanya", cost: "49k" },
      ],
      image: "/images/tv-setup.png",
    },
  ];
  const games = [
    {
      title: "Moto GP 25",
      image: "https://res.cloudinary.com/dnmhna2fc/image/upload/q_auto/f_auto/moto-gp-25_h9grti.jpg",
    },
    {
      title: "NFS Heat",
      image: "https://res.cloudinary.com/dnmhna2fc/image/upload/q_auto/f_auto/nfs-heat_kzfqpu.jpg",
    },
    {
      title: "Naruto Storm 4",
      image: "https://res.cloudinary.com/dnmhna2fc/image/upload/q_auto/f_auto/naruto-storm-4_wykpfy.jpg",
    },
    {
      title: "Spiderman Miles Morales",
      image: "https://res.cloudinary.com/dnmhna2fc/image/upload/q_auto/f_auto/spider-man_odcq0g.jpg",
    },
    {
      title: "Lego Marvel Avengers",
      image: "https://res.cloudinary.com/dnmhna2fc/image/upload/q_auto/f_auto/lego-avengers_teddz6.jpg",
    },
    {
      title: "Mincecraft Dungeons",
      image: "https://res.cloudinary.com/dnmhna2fc/image/upload/q_auto/f_auto/minecraft-dungeons_krowpo.jpg",
    },
    {
      title: "Resident Evil 2 Remake",
      image: "https://res.cloudinary.com/dnmhna2fc/image/upload/q_auto/f_auto/resident-evil-2_g1v84i.jpg",
    },
    {
      title: "It Takes Two",
      image: "https://res.cloudinary.com/dnmhna2fc/image/upload/q_auto/f_auto/it-takes-two_uy4f4o.jpg",
    },
    {
      title: "Horizon Zero Dawn",
      image: "https://res.cloudinary.com/dnmhna2fc/image/upload/q_auto/f_auto/horizon-zero-dawn_gpcdzi.jpg",
    },
    {
      title: "God of War Ragnarok",
      image: "https://res.cloudinary.com/dnmhna2fc/image/upload/q_auto/f_auto/god-of-war-ragnarok_gpoeqr.jpg",
    },
    {
      title: "FC 26",
      image: "https://res.cloudinary.com/dnmhna2fc/image/upload/q_auto/f_auto/fc-26_fioyqd.jpg",
    },
    {
      title: "Dark Souls Remastered",
      image: "https://res.cloudinary.com/dnmhna2fc/image/upload/q_auto/f_auto/dark-souls_coabyz.jpg",
    },
    {
      title: "F1",
      image: "https://res.cloudinary.com/dnmhna2fc/image/upload/q_auto/f_auto/f1_kgpg6i.jpg",
    },
    {
      title: "Ben 10",
      image: "https://res.cloudinary.com/dnmhna2fc/image/upload/q_auto/f_auto/ben-ten_vlylpq.jpg",
    },
  ];

  return (
    <>
        <HeroSection />

        <section className="py-20 md:py-25 bg-surface-container-low ">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-extrabold mb-3">Unit Tersedia</h2>
            <p className="text-on-surface-variant mb-8">
              Unit terawat, update game terbaru, dan siap pakai.
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              {items.map((item) => (
                <CatalogUnit key={item.title} {...item} />
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 md:py-25 bg-surface md:h-screen">
          <div className="max-w-7xl mx-5 md:mx-auto">
            <h2 className="text-xl md:text-4xl font-bold mb-2">
              Katalog Game Terkini
            </h2>
            <p className="text-on-surface-variant mb-2 max-w-lg font-light">
              Mainkan game PS4 terpopuler dan terfavorite
            </p>
          </div>
          <div className="mx-7">
            <GamesCarousel items={games} />
          </div>
        </section>

        <CoverageArea />
        <HowTo />
        <Terms />
        <FinalCTA />
        <WhatsAppFloatingButton />
    </>
  );
}
