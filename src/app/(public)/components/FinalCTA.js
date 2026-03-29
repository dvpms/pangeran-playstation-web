import Container from "@/components/ui/Container"

export default function FinalCTA() {
  return (
    <section className="py-12 bg-primary-container/10">
      <Container>
        <div className="rounded-2xl p-8 bg-gradient-to-r from-white to-surface-container flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-extrabold">Siap Bermain? Booking Sekarang</h3>
            <p className="text-on-surface-variant">Unit terawat, antar & pasang. Nikmati gaming tanpa ribet.</p>
          </div>
          <div>
            <a href="#booking" className="inline-block px-6 py-3 bg-secondary-container text-on-secondary-container rounded-xl font-bold">Booking Sekarang</a>
          </div>
        </div>
      </Container>
    </section>
  )
}
