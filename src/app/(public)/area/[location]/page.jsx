import HeroSection from "../../components/HeroSection";
import CatalogUnit from "../../components/CatalogUnit";
import GamesCarousel from "../../components/GamesCarousel";
import HowTo from "../../components/HowTo";
import Terms from "../../components/Terms";
import FinalCTA from "../../components/FinalCTA";
import CoverageArea from "../../components/CoverageArea";
import FAQ from "../../components/FAQ";
import { faqData } from "@/lib/faqData";
import WhatsAppFloatingButton from '@/components/ui/WhatsAppFloatingButton';
import { ScrollReveal, StaggerContainer } from "@/components/animations";
import { getBookingFormData } from "@/services/catalog";
import { getAllGames } from "@/services/gameCatalog";
import { notFound } from "next/navigation";

// Daftar area yang di-support (untuk build time dan validasi)
const supportedAreas = [
  "bsd",
  "karawaci",
  "curug",
  "bitung",
  "citra-raya",
  "cikupa",
  "balaraja",
  "cisoka",
  "tangerang"
];

// Helper untuk format nama area (misal: "citra-raya" jadi "Citra Raya")
const formatLocationName = (slug) => {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export async function generateMetadata({ params }) {
  const { location } = await params;
  if (!supportedAreas.includes(location.toLowerCase())) {
    return {};
  }
  
  const locName = formatLocationName(location);
  
  return {
    title: `Rental PS4 & Sewa TV di ${locName} | Pangeran Playstation`,
    description: `Layanan rental PS4 dan sewa TV home service di ${locName}. Gratis ongkir, unit terawat, dan banyak bonus game terbaru. Pesan sekarang!`,
    keywords: [`rental ps4 ${locName.toLowerCase()}`, `sewa ps4 ${locName.toLowerCase()}`, `sewa tv ${locName.toLowerCase()}`, `rental playstation ${locName.toLowerCase()}`, `rental ps ${locName.toLowerCase()}`],
    openGraph: {
      title: `Rental PS4 & Sewa TV ${locName}`,
      description: `Layanan rental PS4 dan sewa TV home service di ${locName}. Langsung antar ke ruang tamu Anda!`,
      url: `https://www.pangeranplaystation.my.id/area/${location.toLowerCase()}`,
    },
    alternates: {
      canonical: `/area/${location.toLowerCase()}`,
    },
  };
}

export async function generateStaticParams() {
  return supportedAreas.map((location) => ({
    location,
  }));
}

export default async function AreaPage({ params }) {
  const { location } = await params;
  
  if (!supportedAreas.includes(location.toLowerCase())) {
    notFound();
  }

  const locName = formatLocationName(location);

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

  // --- Schema Generators ---
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": catalogItems.map((item, index) => {
      const prices = item.tiers.map(t => Number(t.price));
      const hasPrices = prices.length > 0;
      return {
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "Product",
          "name": `Sewa ${item.title} ${locName}`,
          "description": item.subtitle || `Rental ${item.title} Home Service ${locName}`,
          "image": item.image ? `https://www.pangeranplaystation.my.id${item.image}` : undefined,
          "offers": hasPrices ? {
            "@type": "AggregateOffer",
            "offerCount": prices.length,
            "lowPrice": Math.min(...prices),
            "highPrice": Math.max(...prices),
            "priceCurrency": "IDR",
            "availability": "https://schema.org/InStock"
          } : undefined
        }
      }
    })
  };

  return (
    <>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />

        <HeroSection location={`di ${locName}`} />

        <section className="py-20 md:py-25 bg-surface-container-low ">
          <div className="max-w-7xl mx-auto px-6">
            <ScrollReveal animation="fadeInUp" duration={0.6}>
              <h2 className="text-3xl font-extrabold mb-3">Unit Tersedia di {locName}</h2>
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
        <FAQ />
        <Terms />
        <FinalCTA />
        <WhatsAppFloatingButton />
    </>
  );
}
