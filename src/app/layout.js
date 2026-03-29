import "./globals.css";
import ReactQueryProvider from '../providers/ReactQueryProvider'
import Navbar from '../components/ui/Navbar'
import Footer from '../components/ui/Footer'

export const metadata = {
  title: "Portal Web Pangeran Playstation",
  description: "Landing & admin dashboard for PlayStation rental",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;600;800&display=swap" rel="stylesheet" />
      </head>
      <body className="font-sans bg-surface-0 text-text-on-surface min-h-full flex flex-col">
        <ReactQueryProvider>
          <Navbar />
          {children}
          <Footer />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
