import Container from "@/components/ui/Container";
import Image from "next/image";

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
    <section className="py-24 px-8 overflow-hidden bg-surface" id="area">
      <Container>
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            {/* Kolom Kiri: Teks & Informasi */}
            <div className="lg:col-span-5">
              <h2 className="text-4xl font-extrabold tracking-tight text-surface-on mb-6">
                Area Jangkauan Kami
              </h2>
              <p className="text-surface-on/80 mb-10 text-lg">
                Kami memiliki 2 Base Station strategis untuk memastikan
                pengantaran secepat kilat ke rumah Anda.
              </p>

              {/* Kartu Base Station */}
              <div className="grid grid-cols-2 gap-4 mb-10">
                <div className="p-6 rounded-xl bg-primary-fixed/30 border border-primary/10">
                  <h4 className="font-bold text-primary text-lg mb-1">
                    Base 01
                  </h4>
                  <p className="text-sm font-semibold text-surface-on">
                    Citra Raya
                  </p>
                </div>
                <div className="p-6 rounded-xl bg-primary-fixed/30 border border-primary/10">
                  <h4 className="font-bold text-primary text-lg mb-1">
                    Base 02
                  </h4>
                  <p className="text-sm font-semibold text-surface-on">
                    Balaraja
                  </p>
                </div>
              </div>

              {/* Area Layanan (Chips) */}
              <div className="space-y-4">
                <h4 className="text-xs font-extrabold text-surface-on/60 uppercase tracking-[0.2em] mb-4">
                  Service Area
                </h4>
                <div className="flex flex-wrap gap-2">
                  {serviceAreas.map((area) => (
                    <span
                      key={area}
                      className="px-4 py-2 rounded-xl bg-surface-container text-surface-on text-sm font-bold"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Kolom Kanan: Visual & Peta */}
            <div className="lg:col-span-7 relative">
              {/* Elemen Latar Belakang Asimetris (Sesuai aturan desain) */}
              <div className="absolute inset-0 bg-primary-container/20 rounded-[3rem] -rotate-3"></div>

              <div className="relative rounded-[3rem] bg-surface-container-lowest p-4 shadow-ambient-blue overflow-hidden aspect-video">
                {/* Catatan: Ganti src dengan path gambar lokal yang valid, misal '/images/map-tangerang.webp' */}
                <Image
                  className="w-full h-full object-cover rounded-[2.5rem]"
                  width={400}
                  height={300}
                  alt="Peta ilustrasi jangkauan area Tangerang"
                  src="/placeholder-map.jpg"
                />

                {/* Floating Badge (Glassmorphism) */}
                <div className="absolute top-8 left-8 bg-surface-container-lowest/90 backdrop-blur-md p-4 rounded-xl shadow-ambient-blue border border-primary/10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-surface-container-lowest">
                      {/* Menggunakan standar ikon SVG lokal atau Font dari Google */}
                      <span className="material-symbols-outlined font-bold">
                        local_shipping
                      </span>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-surface-on/60 uppercase tracking-tighter">
                        Estimasi Waktu
                      </p>
                      <p className="text-sm font-extrabold text-primary">
                        30-60 Menit Saja
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
