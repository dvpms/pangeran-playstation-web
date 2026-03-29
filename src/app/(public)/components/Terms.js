import Container from "@/components/ui/Container"

export default function Terms() {
  return (
    <section id="sk" className="py-12">
      <Container>
        <h2 className="text-2xl font-extrabold mb-4">Syarat & Ketentuan</h2>
        <ul className="list-disc pl-5 text-sm text-on-surface-variant space-y-2">
          <li>Pengembalian unit harus sesuai waktu yang disepakati.</li>
          <li>Kerusakan akibat kelalaian menjadi tanggung jawab penyewa.</li>
          <li>Pembatalan kurang dari 24 jam akan dikenai biaya.</li>
        </ul>
      </Container>
    </section>
  )
}
