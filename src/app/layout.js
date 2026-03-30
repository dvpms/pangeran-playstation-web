import "./globals.css";
import ReactQueryProvider from "../providers/ReactQueryProvider";
import Navbar from "../components/ui/Navbar";
import Footer from "../components/ui/Footer";
import { Plus_Jakarta_Sans } from "next/font/google";

// Konfigurasi font
const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata = {
  title: "Pangeran Playstation | Home Service Rental",
  description:
    "Rental PS4 dan TV di Tangerang, langsung antar ke ruang tamu Anda.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className={` ${plusJakarta.variable} bg-surface-0 text-text-on-surface min-h-full flex flex-col`}>
        <ReactQueryProvider>
          <Navbar />
          {children}
          <Footer />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
