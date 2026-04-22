import Container from "@/components/ui/Container";
import Image from "next/image";
import { ScrollReveal, StaggerContainer } from "@/components/animations";

export default function CoverageArea() {
  // Ekstraksi data untuk mencegah perulangan kode UI (DRY Principle)
  const serviceAreas = [
    "BSD",
    "Karawaci",
    "Curug",
    "Bitung",
    "Citra",
    "Cikupa",
    "Balaraja",
    "Cisoka",
  ];

  return (
    <section
      className="py-20 md:py-24 px-8 overflow-hidden bg-surface"
      id="area"
    >
      <Container>
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            {/* Kolom Kiri: Teks & Informasi */}
            <div className="lg:col-span-5">
              <ScrollReveal animation="fadeInUp" duration={0.6}>
                <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight text-surface-on mb-6">
                  Area Jangkauan Kami
                </h2>
                <p className="text-surface-on/80 mb-10 text-sm md:text-lg">
                  Kami memiliki 2 Base Station strategis untuk memastikan
                  pengantaran secepat kilat ke rumah Anda.
                </p>
              </ScrollReveal>

              {/* Kartu Base Station */}
              <div className="grid grid-cols-2 gap-4 mb-10">
                <div className="p-6 rounded-xl bg-primary-fixed/30 border border-primary/10 text-center">
                  <h4 className="font-bold text-primary text-sm md:text-lg mb-1">
                    Base 01
                  </h4>
                  <p className="text-sm font-semibold text-surface-on">
                    Citra Raya
                  </p>
                </div>
                <div className="p-6 md:p-6 rounded-xl bg-primary-fixed/30 border border-primary/10 text-center">
                  <h4 className="font-bold text-primary text-sm md:text-lg mb-1">
                    Base 02
                  </h4>
                  <p className="text-sm font-semibold text-surface-on">
                    Balaraja
                  </p>
                </div>
              </div>

              {/* Area Layanan (Chips) */}
              <div className="space-y-4">
                <h4 className="text-xs font-extrabold text-surface-on/60 uppercase tracking-[0.2em] mb-4 text-center ">
                  Service Area
                </h4>
                <StaggerContainer staggerDelay={0.1} duration={0.4} className="grid grid-cols-2 gap-2 text-center space-y-4">
                  {serviceAreas.map((area) => (
                    <span
                      key={area}
                      className="px-4 py-2 rounded-xl bg-surface-container text-surface-on text-sm font-bold"
                    >
                      {area}
                    </span>
                  ))}
                </StaggerContainer>
              </div>
            </div>

            {/* Kolom Kanan: Visual & Peta */}
            <div className="lg:col-span-7 relative">
              <div className="absolute inset-0 bg-primary-container/20 md:rounded-[3rem] rounded-xl -rotate-3"></div>

              <div className="relative rounded-xl md:rounded-[3rem] bg-surface-container-lowest md:p-4 shadow-ambient-blue overflow-hidden aspect-video">
                <Image
                  className="w-full h-full object-cover rounded-xl md:rounded-[2.5rem]"
                  width={400}
                  height={300}
                  alt="Peta ilustrasi jangkauan area Tangerang"
                  src="/images/placeholder-map.png"
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
