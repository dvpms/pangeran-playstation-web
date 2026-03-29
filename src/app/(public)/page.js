import HeroSection from "./components/HeroSection";
import CatalogUnit from "./components/CatalogUnit";
import GamesCarousel from "./components/GamesCarousel";
import AreaCoverage from "./components/AreaCoverage";
import HowTo from "./components/HowTo";
import Terms from "./components/Terms";
import FinalCTA from "./components/FinalCTA";

export default function Page() {
  const items = [
    {
      title: "Paket PS4 Pro / Slim",
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

  return (
    <>
      <main>
        <HeroSection />

        <section className="py-5 md:py-16 bg-surface-container-low">
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

        <section className="py-12">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-2xl font-extrabold mb-6">Rekomendasi</h2>
            <GamesCarousel items={items} />
          </div>
        </section>

        <AreaCoverage />
        <HowTo />
        <Terms />
        <FinalCTA />
      </main>
    </>
  );
}
