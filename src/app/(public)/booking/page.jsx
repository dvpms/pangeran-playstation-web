import { prisma } from "@/lib/prisma";
import { convertDecimals } from "@/lib/convertDecimal";
import BookingForm from "@/components/ui/BookingForm";

export const metadata = {
  title: "Booking Home Service | Pangeran Playstation",
};

export default async function BookingPage() {
  const consoles = await prisma.catalog.findMany({
    where: { type: "CONSOLE" },
    include: {
      tiers: { orderBy: { price: "asc" } },
    },
  });

  const addons = await prisma.catalog.findMany({
    where: { type: "ADDON" },
    include: { tiers: true },
  });

  return (
    <div className="min-h-screen bg-surface pt-12 pb-24">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold text-surface-on tracking-tight mb-4">
            Home Service Booking
          </h1>
          <p className="text-surface-on/80 text-lg max-w-2xl">
            Nikmati pengalaman gaming premium langsung di rumah Anda. Silakan
            lengkapi detail penyewaan di bawah ini.
          </p>
        </div>

        <BookingForm
          initialConsoles={convertDecimals(consoles)}
          initialAddons={convertDecimals(addons)}
        />
      </div>
    </div>
  );
}
