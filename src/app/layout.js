import "./globals.css";
import ReactQueryProvider from "../providers/ReactQueryProvider";
import { Plus_Jakarta_Sans } from "next/font/google";

// Konfigurasi font
const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata = {
  metadataBase: new URL('https://www.pangeranplaystation.my.id'),
  title: "Pangeran Playstation | Rental PS4 & Sewa TV Home Service Tangerang",
  description: "Rental PS4 dan TV di Tangerang, langsung antar ke rumah. Sewa PS4 murah, terpercaya. Melayani BSD, Karawaci, Curug, Citra Raya, Balaraja, dan sekitarnya.",
  keywords: ["rental ps4 tangerang", "sewa ps4 tangerang", "sewa tv tangerang", "rental playstation home service", "sewa ps4 murah tangerang", "sewa ps4 bsd", "sewa ps4 karawaci", "rental ps4 citra raya", "rental ps4 balaraja"],
  openGraph: {
    title: "Pangeran Playstation | Rental PS4 & TV Tangerang",
    description: "Rental PS4 dan TV di Tangerang, langsung antar ke ruang tamu Anda. Solusi nge-game praktis!",
    url: 'https://www.pangeranplaystation.my.id',
    siteName: 'Pangeran Playstation',
    locale: 'id_ID',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Pangeran Playstation | Rental PS4 & TV Tangerang",
    description: "Rental PS4 dan TV di Tangerang, langsung antar ke ruang tamu Anda.",
  },
  alternates: {
    canonical: '/',
  },
};

export default function RootLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Pangeran Playstation",
    "image": "https://www.pangeranplaystation.my.id/images/ps4-setup1.png",
    "url": "https://www.pangeranplaystation.my.id",
    "description": "Layanan rental PS4 dan sewa TV home service di Tangerang. Melayani area BSD, Karawaci, Curug, Bitung, Citra Raya, Cikupa, Balaraja, dan Cisoka. Gratis ongkir hingga 7km dari Base Station.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Tangerang",
      "addressRegion": "Banten",
      "addressCountry": "ID"
    },
    "areaServed": [
      { "@type": "City", "name": "Tangerang" },
      { "@type": "City", "name": "BSD" },
      { "@type": "City", "name": "Karawaci" },
      { "@type": "City", "name": "Curug" },
      { "@type": "City", "name": "Citra Raya" },
      { "@type": "City", "name": "Balaraja" }
    ],
    "priceRange": "$$"
  };

  return (
    <html lang="id">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={` ${plusJakarta.variable}`}>
        <ReactQueryProvider>
          {children}
        </ReactQueryProvider>
      </body>
    </html>
  );
}
