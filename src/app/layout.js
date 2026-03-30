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
  title: "Pangeran Playstation | Home Service Rental",
  description:
    "Rental PS4 dan TV di Tangerang, langsung antar ke ruang tamu Anda.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className={` ${plusJakarta.variable}`}>
        <ReactQueryProvider>
          {children}
        </ReactQueryProvider>
      </body>
    </html>
  );
}
