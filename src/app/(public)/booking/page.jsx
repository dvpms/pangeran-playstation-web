import { prisma } from "@/lib/prisma";

import BookingForm from "@/components/ui/BookingForm";

export const metadata = {
  title: "Booking Home Service | Pangeran Playstation",
};

export default async function BookingPage() {
  const catalogs = await prisma.catalog.findMany({
    orderBy: { basePrice: "desc" },
  });
  const catalogsPlain = catalogs.map((item) => ({
    ...item,
    basePrice: item.basePrice.toString(), // atau Number(item.basePrice)
  }));

  const consoles = catalogsPlain.filter((item) => item.type === "CONSOLE");
  const addons = catalogsPlain.filter((item) => item.type === "ADDON");

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

        {/* Melempar data database sebagai props ke Client Component */}
        <BookingForm initialConsoles={consoles} initialAddons={addons} />
      </div>
    </div>
  );
}
