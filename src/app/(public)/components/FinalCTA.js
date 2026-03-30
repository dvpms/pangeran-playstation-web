import Container from "@/components/ui/Container";

// src/components/FinalCta.jsx
import Image from "next/image";
import Link from "next/link";
import { MdArrowForward } from "react-icons/md";

export default function FinalCta() {
  return (
    <section className="py-12 px-4 md:px-8" id="booking">
      <Container>
        <div className="max-w-7xl mx-auto rounded-4xl md:rounded-[3rem] bg-primary p-8 md:p-16 text-center text-surface-container-lowest relative overflow-hidden">
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

          <h2 className="text-3xl md:text-5xl font-extrabold mb-6 relative z-10">
            Siap Main Game Sekarang?
          </h2>

          <p className="text-primary-fixed text-base md:text-lg mb-10 max-w-xl mx-auto relative z-10">
            Lengkapi data diri Anda melalui formulir booking website kami untuk
            proses yang lebih cepat.
          </p>

          {/* Menggunakan Link sebagai pengganti button agar navigasi SPA Next.js berfungsi */}
          <Link
            href="/booking"
            className="relative z-10 inline-flex items-center justify-center gap-3 mx-auto bg-secondary-container text-secondary-on-container px-8 md:px-12 py-4 md:py-5 rounded-xl font-extrabold text-lg md:text-xl shadow-ambient-blue hover:scale-105 transition-transform"
          >
            Booking Online
            <span className="material-symbols-outlined font-extrabold">
              <MdArrowForward width={15} height={15}/>
            </span>
          </Link>
        </div>
      </Container>
    </section>
  );
}

