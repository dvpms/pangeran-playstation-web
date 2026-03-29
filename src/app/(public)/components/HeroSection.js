import Image from "next/image";
import Container from "@/components/ui/Container";
import { BsFillLightningChargeFill } from "react-icons/bs";

export default function HeroSection() {
  return (
    <section className="py-5 md:py-12 h-screen bg-primary-fixed/70">
      <Container>
        <div className="grid gap-5
         md:gap-10 md:grid-cols-2 items-center">
          <div className="relative">
            <div className="absolute -right-6 -top-6 w-40 h-40 bg-primary-container/20 rounded-full blur-3xl"></div>
            <div className="relative rounded-2xl overflow-hidden shadow-ethereal">
              <Image
                src="/images/ps4-setup.jpg"
                alt="PS4 setup"
                width={900}
                height={600}
                className="object-cover w-full h-full"
              />
            </div>
          </div>
          <div>
            <span className="hidden md:inline-block px-3 py-1 rounded-full bg-primary-container text-on-primary text-xs font-bold uppercase tracking-widest mb-4">
              Premium Home Service
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold md:font-extrabold text-on-surface leading-tight mb-4">
              Rental PS4 &amp; TV, Langsung Antar ke{" "}
              <span className="text-primary-container">Ruang Tamu Anda.</span>
            </h1>
            <p className="text-sm md:text-base text-on-surface-variant mb-6 max-w-lg">
              Nikmati pengalaman gaming konsol premium tanpa ribet. Gratis
              ongkir hingga 7km dari Base Station kami.
            </p>
            <div className="flex gap-3 flex-col sm:flex-row">
              <a
                href="#booking"
                className="inline-flex items-center justify-center px-6 py-3 bg-secondary-container text-on-secondary-container rounded-xl font-bold"
              >
                Sewa Sekarang
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
