import Container from "@/components/ui/Container";
import { MdChecklist, MdOutlineSupportAgent, MdDeliveryDining } from "react-icons/md";

// src/components/HowTo.jsx

export default function HowTo() {
  // Mengekstrak data langkah-langkah untuk menjaga DOM tetap bersih
  const steps = [
    {
      id: 1,
      icon: <MdChecklist />,
      title: "Pilih Unit & Area",
      desc: "Tentukan durasi dan jadwal serta lokasi pengantaran Anda.",
      iconColor: "text-primary",
    },
    {
      id: 2,
      icon: <MdOutlineSupportAgent />,
      title: "Konfirmasi Admin",
      desc: "Admin kami akan menghubungi Anda untuk meminta identitas, lokasi, dan pembayaran.",
      iconColor: "text-secondary",
    },
    {
      id: 3,
      icon: <MdDeliveryDining />,
      title: "Kurir Antar",
      desc: "Unit diantar oleh tim kami ke lokasi Anda.",
      iconColor: "text-primary",
    },
  ];

  return (
    <section
      className="md:16 md:py-24 bg-surface relative"
    >
      <Container>
        <div className="max-w-7xl mx-auto px-8">
          {/* Header Section */}
          <div className="text-center max-w-2xl mx-auto mb-5 md:mb-20">
            <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight text-surface-on mb-4">
              Cara Sewa Mudah
            </h2>
            <p className="text-surface-on/80 text-sm md:text-lg">
              Tanpa ribet, cukup selesaikan pemesanan melalui website kami.
            </p>
          </div>

          {/* Steps Grid */}
          <div className="relative max-w-5xl mx-auto">
            <div className="hidden md:block absolute top-10 left-[15%] w-[70%] h-0.5 border-t-2 border-dashed border-primary/20 z-0"></div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-12">
              {steps.map((step) => (
                <div
                  key={step.id}
                  className="relative z-10 text-center flex flex-col items-center"
                >
                  {/* Icon Container */}
                  <div className="w-20 h-20 rounded-[1.5rem] bg-surface-container-lowest shadow-ambient-blue flex items-center justify-center mb-6">
                    <span
                      className={`material-symbols-outlined text-4xl ${step.iconColor}`}
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      {step.icon}
                    </span>
                  </div>

                  {/* Teks Deskripsi */}
                  <h4 className="font-bold text-surface-on text-lg mb-2">
                    {step.title}
                  </h4>
                  <p className="text-sm text-surface-on/80 px-4">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
