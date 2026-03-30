import HeroSection from "./components/HeroSection";
import CatalogUnit from "./components/CatalogUnit";
import GamesCarousel from "./components/GamesCarousel";
import HowTo from "./components/HowTo";
import Terms from "./components/Terms";
import FinalCTA from "./components/FinalCTA";
import CoverageArea from "./components/CoverageArea";

export default function Page() {
  const items = [
    {
      title: "Paket PS4 Pro",
      subtitle: "Termasuk 2 Stick, Kabel HDMI, Kabel Power",
      price: [
        { duration: "12 Jam", cost: "60k" },
        { duration: "1 Hari", cost: "105k" },
        { duration: "2 Hari", cost: "150k" },
        { duration: "3 Hari", cost: "245k" },
      ],
      image: "/images/ps4-setup.jpg",
    },
    {
      title: "TV 40 Inch",
      label: "Add-on",
      subtitle: "Smart TV 40 inch, cocok untuk pengalaman co-op.",
      price: [
        { duration: "12 Jam", cost: "60k" },
        { duration: "1 Hari", cost: "105k" },
        { duration: "2 Hari", cost: "150k" },
        { duration: "3 Hari", cost: "245k" },
      ],
      image: "/images/ps4-setup.jpg",
    },
  ];

  const games = [
    {
      title: "God of War Ragnarök",
      image: "/images/ps4-setup.jpg",
    },
    {
      title: "The Last of Us Part II",
      image: "/images/ps4-setup.jpg",
    },
    {
      title: "Spider-Man: Miles Morales",
      image: "/images/ps4-setup.jpg",
    },
    {
      title: "Horizon Forbidden West",
      image: "/images/ps4-setup.jpg",
    },
    {
      title: "Gran Turismo 7",
      image: "/images/ps4-setup.jpg",
    },
    {
      title: "FIFA 23",
      image: "/images/ps4-setup.jpg",
    },
    {
      title: "Call of Duty: Modern Warfare II",
      image: "/images/ps4-setup.jpg",
    },
    {
      title: "Elden Ring",
      image: "/images/ps4-setup.jpg",
    },
  ];

  return (
    <>
      <main>
        <HeroSection />

        <section className="py-5 md:py-14 bg-surface-container-low h-screen">
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

        <section className="py-12 bg-surface h-screen">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold mb-2 font-sans">
              Katalog Game Terkini
            </h2>
            <p className="text-on-surface-variant mb-2 max-w-lg font-light">
              Mainkan game PS4 terpopuler dan tervaforite
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
      </main>
    </>
  );
}
