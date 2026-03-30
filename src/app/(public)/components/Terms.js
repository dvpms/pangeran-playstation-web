import Container from "@/components/ui/Container";
import { BsCheck2Circle } from "react-icons/bs";
import { MdWarning, MdBadge, MdOutlinePedalBike } from "react-icons/md";

export default function Terms() {
  const termsData = [
    {
      id: "pengiriman",
      title: "Aturan Pengiriman & Tarif",
      icon: <MdOutlinePedalBike />,
      theme: {
        container: "bg-primary-container/10 text-primary",
        decorator: "bg-primary-fixed opacity-20",
        bullet: "text-primary",
      },
      bulletIcon: <BsCheck2Circle />,
      rules: [
        <span key="1">
          <strong className="font-bold text-surface-on">
            Gratis Ongkos Kirim
          </strong>{" "}
          berlaku untuk jarak pengiriman hingga{" "}
          <strong className="font-bold text-surface-on">7 kilometer</strong>{" "}
          pertama dari lokasi Pangeran Playstation.
        </span>,
        <span key="2">
          Untuk jarak yang melebihi 7km, akan dikenakan tarif tambahan{" "}
          <strong className="font-bold text-surface-on">per kilometer</strong>{" "}
          selebihnya.
        </span>,
        <span key="3">
          Pengiriman dilakukan pada jam operasional toko (09:00 - 22:00 WIB).
          Pesanan di luar jam tersebut akan diproses pada hari berikutnya.
        </span>,
      ],
    },
    {
      id: "jaminan",
      title: "Kewajiban Jaminan Peminjaman",
      icon: <MdBadge />,
      theme: {
        container: "bg-secondary-container/20 text-secondary",
        decorator: "bg-secondary-container opacity-20",
        bullet: "text-secondary",
      },
      bulletIcon: <BsCheck2Circle />,
      rules: [
        <span key="1">
          Penyewa <strong className="font-bold text-surface-on">wajib</strong>{" "}
          menyerahkan{" "}
          <strong className="font-bold text-surface-on">
            KTP (Kartu Tanda Penduduk) atau SIM Asli
          </strong>{" "}
          yang masih berlaku sebagai jaminan selama masa sewa.
        </span>,
        <span key="2">
          Identitas penyewa harus sesuai dengan penerima unit di lokasi
          pengiriman. Kami berhak membatalkan pesanan jika identitas tidak
          cocok.
        </span>,
        <span key="3">
          Data pribadi yang diserahkan dijamin kerahasiaannya dan hanya
          digunakan untuk keperluan administrasi Pangeran Playstation.
        </span>,
      ],
    },
    {
      id: "kerusakan",
      title: "Aturan Kerusakan, Kehilangan & Denda",
      icon: <MdWarning />,
      theme: {
        // Menggunakan warna standar merah (red-500/600) Tailwind karena warna 'error' tidak ada di DESIGN.md
        container: "bg-red-500/10 text-red-600",
        decorator: "bg-red-500 opacity-10",
        bullet: "text-red-600",
      },
      bulletIcon: <BsCheck2Circle />,
      rules: [
        <span key="1">
          Penyewa{" "}
          <strong className="font-bold text-surface-on">
            bertanggung jawab penuh
          </strong>{" "}
          atas segala bentuk kerusakan, cacat fisik, atau kehilangan unit
          konsol, stik, kabel, dan kelengkapan lainnya.
        </span>,
        <span key="2">
          Denda akan dikenakan sesuai dengan tingkat kerusakan atau harga
          penggantian suku cadang asli di pasaran saat ini.
        </span>,
        <span key="3">
          Keterlambatan pengembalian unit melebihi toleransi waktu (1 jam) akan
          dikenakan denda keterlambatan sebesar biaya sewa harian.
        </span>,
      ],
    },
  ];

  return (
    <section className="py-24 bg-surface" id="sk">
      <Container>
        <div className="max-w-4xl mx-auto flex flex-col gap-12">
          {/* Header Section */}
          <div className="flex flex-col gap-6 relative">
            <h2 className=" text-2xl md:text-5xl font-extrabold tracking-tight text-surface-on relative inline-block">
              Syarat & Ketentuan Layanan
              <div className="absolute -bottom-2 left-0 w-24 h-1.5 bg-secondary-container rounded-full"></div>
            </h2>
            <p className="text-sm md:text-lg text-surface-on/80 leading-relaxed max-w-2xl">
              Harap baca dengan saksama seluruh syarat dan ketentuan berikut
              sebelum Anda melanjutkan proses pemesanan.
            </p>
          </div>

          {/* Aturan Cards Container */}
          <div className="bg-surface-container-low rounded-4xl p-2 md:p-8 flex flex-col gap-8">
            {termsData.map((term) => (
              <div
                key={term.id}
                className="bg-surface-container-lowest rounded-xl p-2 md:p-8 shadow-ambient-blue relative overflow-hidden group"
              >
                {/* Dekorasi Latar Belakang Asimetris */}
                <div
                  className={`absolute top-0 right-0 w-32 h-32 rounded-bl-full -mr-10 -mt-10 transition-transform group-hover:scale-110 ${term.theme.decorator}`}
                ></div>

                <div className="flex flex-col gap-4 items-start relative z-10">
                  {/* Ikon Kategori */}
                  <div
                    className={`flex space-x-3 `}
                  >
                    <div
                      className={`flex  w-12 h-12 material-symbols-outlined text-3xl items-center justify-center rounded-2xl shrink-0  ${term.theme.container}`}
                      
                    >
                      {term.icon}
                    </div>
                    <h3 className="text-lg md:text-2xl font-bold text-surface-on">
                      {term.title}
                    </h3>
                  </div>

                  {/* Daftar Aturan */}
                  <div className="flex flex-col gap-2">
                    <ul className="flex flex-col gap-2 text-surface-on/80 leading-relaxed">
                      {term.rules.map((rule, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <span
                            className={`material-symbols-outlined text-xl shrink-0 mt-0.5 ${term.theme.bullet}`}
                          >
                            {term.bulletIcon}
                          </span>

                          <span className="p-2">{rule}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
