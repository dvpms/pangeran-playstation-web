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
      title: "PS4 Slim",
      subtitle: "Termasuk 2 Stick, Kabel HDMI, Kabel Power",
      price: [
        { duration: "12 Jam", cost: "60k" },
        { duration: "1 Hari", cost: "105k" },
        { duration: "2 Hari", cost: "150k" },
        { duration: "3 Hari", cost: "245k" },
      ],
      image: "/images/ps4-slim1.png",
    },
    {
      title: "TCL 40 Inch",
      label: "Add-on",
      subtitle: "Smart TV 40 inch dengan resolusi Full HD",
      price: [
        { duration: "Hanya", cost: "25k" },
      ],
      image: "/images/tv-setup.png",
    },
  ];

  const games = [
    {
      title: "Call of Duty: Black Ops 3",
      image: "/images/games/call-of-duty-bo-3.png",
    },
    {
      title: "Resident Evil 2 Remake",
      image: "/images/games/resident-evil2.png",
    },
    {
      title: "Spider-Man: Miles Morales",
      image: "/images/games/spiderman.png",
    },
    {
      title: "GTA 5",
      image: "/images/games/gta-v.png",
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
    </>
  );
}
