import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";

export default function PublicLayout({ children }) {
  return (
    <div className="bg-surface-0 text-text-on-surface min-h-full flex flex-col">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
