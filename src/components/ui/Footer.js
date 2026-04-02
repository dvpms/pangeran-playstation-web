import Container from "./Container";
import Link from "next/link";
import Image from "next/image";
import { BsInstagram, BsTiktok, BsWhatsapp } from "react-icons/bs";
import { MdLocationPin } from "react-icons/md";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  // Ekstraksi Navigasi
  const quickLinks = [
    { label: "Beranda", href: "#" },
    { label: "Area Jangkauan", href: "#area" },
    { label: "Syarat & Ketentuan", href: "#sk" },
    { label: "Cara Pesan", href: "#cara-pesan" },
  ];

  // Ekstraksi Media Sosial (Ikon SVG disimpan sebagai komponen)
  const socialLinks = [
    {
      name: "Instagram",
      href: "https://instagram.com/pangeranplaystation",
      icon: <BsInstagram className="w-5 h-5" />,
    },
    {
      name: "TikTok",
      href: "https://tiktok.com/@pangeranplaystation",
      icon: <BsTiktok className="w-5 h-5" />,
    },
  ];

  return (
    <footer className="w-full bg-surface-container-low border-t border-outline-variant/20">
      <Container className="py-12">
        <div className="max-w-7xl mx-auto px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-5">
            {/* Logo & Address */}
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center gap-4">
                <div className="relative h-36 w-36 shrink-0">
                  {/* Pastikan logo diletakkan di folder public/ */}
                  <Image
                    src="/images/logo.png"
                    alt="Pangeran Playstation Logo"
                    sizes=" ( min-width: 768px ) 144px, 72px"
                    fill
                    className="rounded-xl shadow-ambient-blue object-cover"
                  />
                </div>
                <div className="flex flex-col text-center md:text-left">
                  <span className="text-xl font-extrabold text-primary tracking-tighter uppercase">
                    Pangeran Playstation
                  </span>
                  {/* <span className="text-xs font-bold text-surface-on/60 uppercase tracking-widest">
                    High-End Gaming Rentals
                  </span> */}
                </div>
              </div>
            </div>
            <div className="flex gap-3 text-surface-on/80">
              <span className="material-symbols-outlined text-primary shrink-0 content-center">
                <MdLocationPin className="w-5 h-5" />
              </span>
              <p className="text-sm leading-relaxed content-center">
                Jl. Raya Serang KM 14, <br />
                Kec. Cikupa, Kabupaten Tangerang, <br />
                Banten 15710
              </p>
            </div>

            {/* Quick Links */}
            <div className="flex flex-col gap-6 text-center md:text-left">
              <h4 className="text-sm font-bold text-surface-on uppercase tracking-widest">
                Navigasi
              </h4>
              <div className="grid grid-cols-1 gap-3 justify-items-center md:justify-items-start">
                {quickLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="text-sm text-surface-on/80 hover:text-primary transition-colors w-fit"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Socials & Contact */}
            <div className="flex flex-col gap-6 text-center items-center md:text-left md:items-start">
              <h4 className="text-sm font-bold text-surface-on uppercase tracking-widest">
                Hubungi Kami
              </h4>
              <div className="flex flex-col gap-4">
                <div className="flex gap-4 justify-center md:justify-start">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="size-10 rounded-xl bg-surface-container flex items-center justify-center text-surface-on/80 hover:bg-primary hover:text-surface-container-lowest transition-all"
                      aria-label={social.name}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>

                <a
                  href="https://wa.me/6285776172812"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#25D366] text-white px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-3 hover:scale-[1.02] transition-transform shadow-lg shadow-green-500/20 w-fit md:w-full lg:w-fit"
                >
                  <span className="material-symbols-outlined">
                    <BsWhatsapp />
                  </span>
                  Chat via WhatsApp
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-5 border-t border-outline-variant/20 flex flex-col md:flex-row justify-between items-center gap-6 text-surface-on/60">
            <p className="text-sm font-medium text-center md:text-left">
              © {currentYear} Pangeran Playstation. All Rights Reserved.
            </p>
            <div className="flex gap-8">
              <Link
                href=""
                className="text-xs font-bold uppercase tracking-widest hover:text-primary transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href=""
                className="text-xs font-bold uppercase tracking-widest hover:text-primary transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
