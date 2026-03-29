import Container from './Container'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-surface text-on-surface border-t border-outline-variant">
      <Container className="py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h4 className="font-bold mb-3">Pangeran Playstation</h4>
            <p className="text-sm text-on-surface-variant">Sewa PS4 & TV dengan layanan antar. Jangkauan cepat dan unit terawat.</p>
          </div>
          <div>
            <h5 className="font-semibold mb-2">Layanan</h5>
            <ul className="space-y-2 text-sm">
              <li><Link href="#catalog">Katalog</Link></li>
              <li><Link href="#cara-pesan">Cara Pesan</Link></li>
              <li><Link href="#area">Area</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold mb-2">Hubungi</h5>
            <p className="text-sm">WhatsApp: +62 812-3456-7890</p>
            <p className="text-sm mt-2">Email: info@pangeranplaystation.id</p>
          </div>
        </div>
      </Container>
    </footer>
  )
}
