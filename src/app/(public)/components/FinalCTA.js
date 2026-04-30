import Container from "@/components/ui/Container";
import Image from "next/image";
import Link from "next/link";
import { MdArrowForward } from "react-icons/md";
import { FadeInUp } from "@/components/animations";

export default function FinalCta() {
  return (
    <section className="py-12 px-4 md:px-8" id="booking">
      <Container>
        <div className="max-w-7xl mx-auto rounded-4xl md:rounded-[3rem] bg-primary p-4 md:p-16 text-center text-surface-container-lowest relative overflow-hidden">
          {/* Latar Belakang menggunakan next/image untuk optimasi */}
          <div className="absolute inset-0 w-full h-full opacity-10 pointer-events-none">
            {/* Pastikan gambar pattern ini ada di folder public/ */}
            <Image
              src="/images/pattern-bg.png"
              alt="Subtle geometric pattern"
              fill
              className="object-cover"
              priority={false}
            />
          </div>

          <FadeInUp delay={0} duration={0.6} className="relative z-10">
            <h2 className="text-xl md:text-5xl font-extrabold mb-6">
              Siap Main Game Sekarang?
            </h2>
          </FadeInUp>

          <FadeInUp delay={0.2} duration={0.6} className="relative z-10">
            <p className="text-primary-fixed text-sm md:text-lg mb-10 max-w-xl mx-auto">
              Lengkapi data diri Anda melalui formulir booking website kami untuk
              proses yang lebih cepat.
            </p>
          </FadeInUp>

          {/* Menggunakan Link sebagai pengganti button agar navigasi SPA Next.js berfungsi */}
          <FadeInUp delay={0.4} duration={0.6} className="relative z-10">
            <Link
              href="/booking"
              className="inline-flex items-center justify-center gap-3 mx-auto bg-secondary-container text-secondary-on-container px-5 md:px-12 py-4 md:py-5 rounded-xl font-extrabold text-lg md:text-xl shadow-ambient-blue hover:scale-105 transition-transform"
            >
              Booking Online
              <span className=" material-symbols-outlined font-extrabold">
                <MdArrowForward width={15} height={15}/>
              </span>
            </Link>
          </FadeInUp>
        </div>
      </Container>
    </section>
  );
}

