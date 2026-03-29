// import Container from '../../../components/ui/Container'
import Container from "@/components/ui/Container"

export default function AreaCoverage({ areas = ['Kota A', 'Kota B', 'Kota C'] }) {
  return (
    <section id="area" className="py-12">
      <Container>
        <h2 className="text-2xl font-extrabold text-on-surface mb-4">Area Coverage</h2>
        <p className="text-on-surface-variant mb-6">Kami melayani area terdekat dari base station kami. Cek apakah alamat Anda termasuk area layanan.</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {areas.map((a) => (
            <div key={a} className="p-4 bg-surface-container-low rounded-lg text-center">{a}</div>
          ))}
        </div>
      </Container>
    </section>
  )
}
