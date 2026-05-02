import HeroSection from "./components/HeroSection";
import CatalogUnit from "./components/CatalogUnit";
import GamesCarousel from "./components/GamesCarousel";
import HowTo from "./components/HowTo";
import Terms from "./components/Terms";
import FinalCTA from "./components/FinalCTA";
import CoverageArea from "./components/CoverageArea";
import WhatsAppFloatingButton from '@/components/ui/WhatsAppFloatingButton';
import { ScrollReveal, StaggerContainer } from "@/components/animations";
import { getBookingFormData } from "@/services/catalog";
import { getAllGames } from "@/services/gameCatalog";

export default async function Page() {
  const { consoles, addons } = await getBookingFormData();
  const gamesData = await getAllGames();

  // Gabungkan console dan addon untuk ditampilkan di landing page
  const catalogItems = [
    ...consoles.map((c) => ({
      id: c.id,
      title: c.name,
      subtitle: c.description,
      label: "Unit",
      tiers: c.tiers,
      image: c.imageUrl,
      type: "CONSOLE",
    })),
    ...addons.map((a) => ({
      id: a.id,
      title: a.name,
      subtitle: a.description,
      label: "Add-on",
      tiers: a.tiers,
      image: a.imageUrl,
      type: "ADDON",
    })),
  ];

  const games = gamesData.map((g) => ({ title: g.title, image: g.imageUrl }));

  return (
    <>
        <HeroSection />

        <section className="py-20 md:py-25 bg-surface-container-low ">
          <div className="max-w-7xl mx-auto px-6">
            <ScrollReveal animation="fadeInUp" duration={0.6}>
              <h2 className="text-3xl font-extrabold mb-3">Unit Tersedia</h2>
              <p className="text-on-surface-variant mb-8">
                Unit terawat, update game terbaru, dan siap pakai.
              </p>
            </ScrollReveal>
            <StaggerContainer staggerDelay={0.15} duration={0.5} className="grid md:grid-cols-2 gap-8">
              {catalogItems.map((item) => (
                <CatalogUnit key={item.id} {...item} />
              ))}
            </StaggerContainer>
          </div>
        </section>

        <section className="py-20 md:py-25 bg-surface md:h-screen">
          <div className="max-w-7xl mx-5 md:mx-auto">
            <ScrollReveal animation="fadeInLeft" duration={0.6}>
              <h2 className="text-xl md:text-4xl font-bold mb-2">
                Katalog Game Terkini
              </h2>
              <p className="text-on-surface-variant mb-2 max-w-lg font-light">
                Mainkan game PS4 terpopuler dan terfavorite
              </p>
            </ScrollReveal>
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
