// src/components/BookingForm.jsx
"use client";

import { useState } from "react";
import { BiCalendar } from "react-icons/bi";
import { FaTv } from "react-icons/fa";
import { GiConsoleController } from "react-icons/gi";
import { IoMdTime } from "react-icons/io";
import Select from "react-select";

export default function BookingForm({ initialConsoles, initialAddons }) {
  const defaultConsole = initialConsoles.length > 0 ? initialConsoles[0] : null;
  const tvAddon = initialAddons.length > 0 ? initialAddons[0] : null;

  // State Interaktif: Produk
  const [selectedUnit, setSelectedUnit] = useState(defaultConsole);
  const [selectedAddon, setSelectedAddon] = useState(false);
  const [selectedTier, setSelectedTier] = useState(null);
  const [startDate, setStartDate] = useState(null);

  // State Interaktif: Data Pelanggan (BARU)
  const [name, setName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [area, setArea] = useState(null);
  // const [address, setAddress] = useState("");

  const formatRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number);
  };

  const today = new Date();
  const availableDates = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    return d;
  });

  const coverageAreas = [
    "BSD",
    "Karawaci",
    "Curug",
    "Bitung",
    "Citra",
    "Cikupa",
    "Balaraja",
    "Cisoka",
  ];
  const areaOptions = coverageAreas.map((a) => ({ value: a, label: a }));

  // State untuk react-select
  const tvPrice =
    tvAddon && tvAddon.tiers.length > 0 ? Number(tvAddon.tiers[0].price) : 0;
  const unitTotal = selectedTier ? Number(selectedTier.price) : 0;
  const addonTotal = selectedAddon ? tvPrice : 0;
  const grandTotal = unitTotal + addonTotal;

  // Validasi Form Keseluruhan
  const isFormValid =
    selectedTier && startDate && name && whatsapp && area && address;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative">
      {/* Kolom Kiri: Form Input */}
      <div className="lg:col-span-8 flex flex-col gap-10">
        {/* Section 1: Pilih Unit */}
        <section>
          <h3 className="flex items-center gap-2 text-xl font-bold text-surface-on mb-4">
            <span className="material-symbols-outlined text-primary">
              videogame_asset
            </span>
            Pilih Unit
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {initialConsoles.map((cons) => (
              <div
                key={cons.id}
                onClick={() => {
                  setSelectedUnit(cons);
                  setSelectedTier(null);
                }}
                className={`p-6 rounded-2xl cursor-pointer transition-all border-2 relative overflow-hidden ${
                  selectedUnit?.id === cons.id
                    ? "border-primary bg-primary-fixed/10 shadow-ambient-blue"
                    : "border-outline-variant/20 bg-surface-container-lowest hover:border-primary/50"
                }`}
              >
                {selectedUnit?.id === cons.id && (
                  <div className="absolute top-0 right-0 bg-primary text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider">
                    Dipilih
                  </div>
                )}
                <div className="w-full h-32 bg-surface-container-lowest rounded-xl mb-4 flex items-center justify-center">
                  <span className="text-surface-on/40 text-sm font-bold">
                    Gambar {cons.name}
                  </span>
                </div>
                <h4 className="font-bold text-surface-on text-lg">
                  {cons.name}
                </h4>
                <p className="text-sm text-surface-on/60 mt-1">
                  {cons.description}
                </p>
              </div>
            ))}

            <div className="p-6 rounded-2xl border-2 border-outline-variant/20 bg-surface-container-low opacity-60 relative cursor-not-allowed">
              <div className="absolute top-0 right-0 bg-surface-on/20 text-surface-on text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider">
                Segera Hadir
              </div>
              <div className="w-full h-32 bg-surface-container-lowest rounded-xl mb-4 flex items-center justify-center">
                <span className="text-surface-on/40 text-sm font-bold">
                  PS4 Pro
                </span>
              </div>
              <h4 className="font-bold text-surface-on text-lg">PS4 Pro 4K</h4>
              <p className="text-sm text-surface-on/60 mt-1">
                Performa maksimal resolusi 4K tajam.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2: Pilih Paket Durasi */}
        <section>
          <h3 className="flex items-center gap-2 text-xl font-bold text-surface-on mb-4">
            <span className="material-symbols-outlined text-primary">sell</span>
            Pilih Paket Sewa
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {selectedUnit?.tiers.map((tier) => (
              <div
                key={tier.id}
                onClick={() => setSelectedTier(tier)}
                className={`p-4 rounded-xl cursor-pointer transition-all border-2 text-center flex flex-col justify-center items-center ${
                  selectedTier?.id === tier.id
                    ? "border-primary bg-primary-fixed text-primary shadow-ambient-blue"
                    : "border-outline-variant/20 bg-surface-container-lowest text-surface-on hover:border-primary/50"
                }`}
              >
                <h5 className="font-extrabold mb-1">{tier.label}</h5>
                <p className="text-sm font-bold">
                  {formatRupiah(Number(tier.price))}
                </p>
                {tier.oldPrice && (
                  <p className="text-[10px] text-surface-on/40 line-through mt-0.5">
                    {formatRupiah(Number(tier.oldPrice))}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Section 3: Add-on */}
        {tvAddon && (
          <section>
            <h3 className="flex items-center gap-2 text-xl font-bold text-surface-on mb-4">
              <span className="material-symbols-outlined text-primary">tv</span>
              Pilih Add-on
            </h3>
            <div
              onClick={() => setSelectedAddon(!selectedAddon)}
              className={`p-4 md:p-6 rounded-2xl cursor-pointer transition-all border-2 flex items-center justify-between gap-4 ${
                selectedAddon
                  ? "border-secondary bg-secondary-container/10 shadow-ambient-blue"
                  : "border-outline-variant/20 bg-surface-container-lowest hover:border-secondary/50"
              }`}
            >
              <div>
                <h4 className="font-bold text-surface-on text-lg">
                  {tvAddon.name}
                </h4>
                <p className="font-extrabold text-secondary">
                  + {formatRupiah(tvPrice)}{" "}
                  <span className="text-sm font-normal text-surface-on/60">
                    /Sewa
                  </span>
                </p>
              </div>
              <button
                className={`px-4 py-2 rounded-xl text-sm font-bold transition-colors ${selectedAddon ? "bg-secondary text-white" : "bg-surface-container text-surface-on hover:bg-surface-container-low"}`}
              >
                {selectedAddon ? "Ditambahkan" : "Tambah"}
              </button>
            </div>
          </section>
        )}

        {/* Section 4: Kalender */}
        <section>
          <h3 className="flex items-center gap-2 text-xl font-bold text-surface-on mb-4">
            <span className="material-symbols-outlined text-primary">
              calendar_month
            </span>
            Pilih Tanggal Mulai
          </h3>
          <div className="flex gap-2 overflow-x-auto pb-4 no-scrollbar">
            {availableDates.map((date, i) => (
              <div
                key={i}
                onClick={() => setStartDate(date)}
                className={`min-w-[4rem] p-3 rounded-xl flex flex-col items-center justify-center cursor-pointer transition-colors border ${
                  startDate?.getDate() === date.getDate()
                    ? "bg-primary text-white border-primary shadow-lg"
                    : "bg-surface-container-lowest border-outline-variant/20 text-surface-on hover:border-primary/50"
                }`}
              >
                <span className="text-xs uppercase font-bold opacity-80">
                  {date.toLocaleDateString("id-ID", { weekday: "short" })}
                </span>
                <span className="text-2xl font-extrabold">
                  {date.getDate()}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Section 5: Detail Pengiriman & Kontak (BARU) */}
        <section>
          <h3 className="flex items-center gap-2 text-xl font-bold text-surface-on mb-4">
            <span className="material-symbols-outlined text-primary">
              local_shipping
            </span>
            Detail Pengiriman
          </h3>
          <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/20 flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-surface-on">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Contoh: Budi Santoso"
                  className="w-full bg-surface-container px-4 py-3 rounded-xl text-surface-on placeholder:text-surface-on/40 focus:outline-none focus:ring-2 focus:ring-primary/50 border border-transparent focus:border-primary"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-surface-on">
                  Nomor WhatsApp
                </label>
                
                <input
                  type="number"
                  value={whatsapp}
                  min="0"
                  onChange={(e) => setWhatsapp(e.target.value)}
                  placeholder="Contoh: 081234567890"
                  className="w-full bg-surface-container px-4 py-3 rounded-xl text-surface-on placeholder:text-surface-on/40 focus:outline-none focus:ring-2 focus:ring-primary/50 border border-primary/20 focus:border-primary"
                />
              </div> 
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-surface-on">
                Area Layanan
              </label>
              <Select
                options={areaOptions}
                value={area}
                onChange={(opt) => setArea(opt)}
                placeholder="Pilih Area Layanan Anda..."
                className="react-select-container"
                classNamePrefix="react-select"
                isSearchable
              />
            </div>

            {/* <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-surface-on">
                Detail Alamat Lengkap
              </label>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                rows="3"
                placeholder="Masukkan Nama Jalan, No Rumah, RT/RW, dan Patokan (Contoh: Samping Masjid Al-Ikhlas)"
                className="w-full bg-surface-container px-4 py-3 rounded-xl text-surface-on placeholder:text-surface-on/40 focus:outline-none focus:ring-2 focus:ring-primary/50 border border-transparent focus:border-primary resize-none"
              ></textarea>
            </div> */}
          </div>
        </section>
      </div>

      {/* Kolom Kanan: Ringkasan Pesanan (Sidebar) */}
      <div className="lg:col-span-4">
        <div className="bg-surface-container-lowest border border-outline-variant/20 rounded-[2rem] p-6 md:p-8 sticky top-24 shadow-ambient-blue">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-surface-on">
              Ringkasan Pesanan
            </h3>
            <span className="material-symbols-outlined text-surface-on/40">
              receipt_long
            </span>
          </div>

          <div className="flex flex-col gap-4 border-b border-outline-variant/20 pb-6 mb-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-bold text-surface-on">
                  {selectedUnit?.name || "Pilih Unit"}
                </p>
                <p className="text-xs text-primary font-bold mt-1">
                  {selectedTier
                    ? `Paket ${selectedTier.label}`
                    : "Pilih Paket Durasi"}
                </p>
              </div>
              <p className="font-bold text-surface-on">
                {selectedTier ? formatRupiah(Number(selectedTier.price)) : "-"}
              </p>
            </div>

            <div className="flex justify-between items-center text-sm">
              <p
                className={
                  selectedAddon
                    ? "text-surface-on font-semibold"
                    : "text-surface-on/40 italic"
                }
              >
                {selectedAddon && tvAddon ? tvAddon.name : "TV Add-on"}
              </p>
              <p
                className={
                  selectedAddon
                    ? "font-bold text-surface-on"
                    : "text-surface-on/40"
                }
              >
                {selectedAddon ? `+ ${formatRupiah(tvPrice)}` : "Belum dipilih"}
              </p>
            </div>
          </div>

          <div className="flex justify-between items-center mb-8">
            <p className="text-surface-on/80 font-bold">Total Harga</p>
            <p className="text-3xl font-extrabold text-secondary">
              {formatRupiah(grandTotal)}
            </p>
          </div>

          <button
            disabled={!isFormValid}
            className="w-full bg-secondary-container text-secondary-on-container py-4 rounded-xl font-extrabold text-lg shadow-lg hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            Kirim Permintaan Booking
          </button>

          {!isFormValid && (
            <p className="text-center text-xs text-surface-on/60 mt-4">
              Lengkapi pilihan paket, tanggal, dan form data diri untuk
              melanjutkan.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
