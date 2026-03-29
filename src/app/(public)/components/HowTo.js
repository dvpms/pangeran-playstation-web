import Container from "@/components/ui/Container"

export default function HowTo() {
  const steps = [
    { title: 'Pilih Paket', desc: 'Pilih paket sesuai durasi dan kebutuhan.' },
    { title: 'Checkout & Bayar', desc: 'Isi alamat dan lakukan pembayaran cepat.' },
    { title: 'Nikmati Game', desc: 'Kami antar, pasang, dan jelaskan cara pakai.' },
  ]

  return (
    <section id="cara-pesan" className="py-12 bg-surface">
      <Container>
        <h2 className="text-2xl font-extrabold mb-4">Cara Pesan</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {steps.map((s, i) => (
            <div key={i} className="p-4 bg-surface-container-low rounded-lg text-center">
              <div className="w-12 h-12 mx-auto rounded-full bg-primary text-white flex items-center justify-center font-bold mb-3">{i+1}</div>
              <h3 className="font-semibold mb-1">{s.title}</h3>
              <p className="text-sm text-on-surface-variant">{s.desc}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
