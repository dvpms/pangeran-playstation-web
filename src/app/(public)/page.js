import HeroSection from './components/HeroSection'
import CatalogUnit from './components/CatalogUnit'
import GamesCarousel from './components/GamesCarousel'
import AreaCoverage from './components/AreaCoverage'
import HowTo from './components/HowTo'
import Terms from './components/Terms'
import FinalCTA from './components/FinalCTA'

export default function Page() {
  const items = [
    {
      title: 'Paket PS4 Pro / Slim',
      subtitle: 'Termasuk 2 Stick, Kabel HDMI, Kabel Power, dan 5+ Game pilihan (FIFA 24, Spiderman, dll).',
      price: '105k',
      image: '/images/ps4-setup.jpg',
    },
    {
      title: 'TV 40 Inch',
      subtitle: 'Smart TV 40 inch, cocok untuk pengalaman co-op.',
      price: '175k',
      image: '/images/tv-40.jpg',
    },
  ]

  return (
    <>
      <main>
        <HeroSection />

        <section className="py-16 bg-surface-container-low">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-extrabold mb-3">Pilih Senjata Bermainmu</h2>
            <p className="text-on-surface-variant mb-8">Unit terawat, update game terbaru, dan siap pakai.</p>
            <div className="grid md:grid-cols-2 gap-8">
              <CatalogUnit title={items[0].title} subtitle={items[0].subtitle} price={items[0].price} image={items[0].image} />
              <CatalogUnit title={items[1].title} subtitle={items[1].subtitle} price={items[1].price} image={items[1].image} />
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
  )
}
