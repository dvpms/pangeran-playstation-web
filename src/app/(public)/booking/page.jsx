// src/app/(public)/booking/page.jsx
import { prisma } from "@/lib/prisma";
import BookingForm from "@/components/ui/BookingForm";

export const metadata = {
  title: "Booking Home Service | Pangeran Playstation",
};

export default async function BookingPage() {
  // Ambil data konsol beserta paket harganya

  function serializeDecimal(obj) {
  return JSON.parse(JSON.stringify(obj, (key, value) =>
    typeof value === 'object' && value !== null && value.constructor.name === 'Decimal'
      ? value.toString()
      : value
  ));
}

  const consoles = await prisma.catalog.findMany({
    where: { type: "CONSOLE" },
    include: {
      tiers: {
        orderBy: { price: "asc" }, // Urutkan dari paket termurah (12 Jam)
      },
    },
  });

  // Ambil data addon (TV) beserta harganya
  const addons = await prisma.catalog.findMany({
    where: { type: "ADDON" },
    include: {
      tiers: true,
    },
  });

  const consolesPlain = serializeDecimal(consoles);
  const addonsPlain = serializeDecimal(addons);

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

        {/* Lempar data nyata dari VPS ke Client Component */}
        <BookingForm initialConsoles={consolesPlain} initialAddons={addonsPlain} />
      </div>
    </div>
  );
}
