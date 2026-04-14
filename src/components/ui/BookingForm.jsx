// src/components/BookingForm.jsx
"use client";

import { useState } from "react";
import { BiCalendar } from "react-icons/bi";
import { FaTv } from "react-icons/fa";
import { GiConsoleController } from "react-icons/gi";
import { IoMdTime } from "react-icons/io";

export default function BookingForm({ initialConsoles, initialAddons }) {
  // 1. Inisialisasi State
  const [selectedConsole, setSelectedConsole] = useState(null);
  const [selectedAddon, setSelectedAddon] = useState(null);
  const [duration, setDuration] = useState(1); // Default sewa 1 hari
  const [startDate, setStartDate] = useState(null);

  // Fungsi Helper: Format Rupiah
  const formatRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number);
  };

  // Fungsi Helper: Generate 7 hari ke depan untuk UI Kalender sementara
  const today = new Date();
  const availableDates = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    return d;
  });

  // 2. Mesin Kalkulasi (Otomatis berjalan setiap kali state berubah)
  const consoleTotal = selectedConsole
    ? Number(selectedConsole.basePrice) * duration
    : 0;
  const addonTotal = selectedAddon
    ? Number(selectedAddon.basePrice) * duration
    : 0;
  const grandTotal = consoleTotal + addonTotal;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative">
      {/* Kolom Kiri: Form Input */}
      <div className="lg:col-span-8 flex flex-col gap-10">
        {/* Section 1: Pilih Unit (Tidak berubah) */}
        <section>
          <h3 className="flex items-center gap-2 text-xl font-bold text-surface-on mb-4">
            <span className="material-symbols-outlined text-primary">
              <GiConsoleController className="w-10 h-10" />
            </span>
            Pilih Unit (PS4)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {initialConsoles.map((cons) => (
              <div
                key={cons.id}
                onClick={() => setSelectedConsole(cons)}
                className={`p-6 rounded-2xl cursor-pointer transition-all border-2 ${
                  selectedConsole?.id === cons.id
                    ? "border-primary bg-primary-fixed/10 shadow-ambient-blue"
                    : "border-outline-variant/20 bg-surface-container-lowest hover:border-primary/50"
                }`}
              >
                <div className="w-full h-32 bg-surface-container-low rounded-xl mb-4 flex items-center justify-center">
                  <span className="text-surface-on/40 text-sm font-bold">
                    Gambar Unit
                  </span>
                </div>
                <h4 className="font-bold text-surface-on text-lg">
                  {cons.name}
                </h4>
                <p className="font-extrabold text-primary text-xl mt-2">
                  {formatRupiah(cons.basePrice)}{" "}
                  <span className="text-sm font-normal text-surface-on/60">
                    /Hari
                  </span>
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 2: Pilih Add-on (Tidak berubah) */}
        <section>
          <h3 className="flex items-center gap-2 text-xl font-bold text-surface-on mb-4">
            <span className="material-symbols-outlined text-primary">
              <FaTv className="w-10 h-10"/>
            </span>
            Pilih Add-on
          </h3>
          <div className="grid grid-cols-1 gap-4">
            {initialAddons.map((addon) => (
              <div
                key={addon.id}
                onClick={() =>
                  setSelectedAddon(
                    selectedAddon?.id === addon.id ? null : addon,
                  )
                }
                className={`p-4 md:p-6 rounded-2xl cursor-pointer transition-all border-2 flex items-center justify-between gap-4 ${
                  selectedAddon?.id === addon.id
                    ? "border-secondary bg-secondary-container/10 shadow-ambient-blue"
                    : "border-outline-variant/20 bg-surface-container-lowest hover:border-secondary/50"
                }`}
              >
                <div>
                  <h4 className="font-bold text-surface-on text-lg">
                    {addon.name}
                  </h4>
                  <p className="font-extrabold text-secondary">
                    + {formatRupiah(addon.basePrice)}{" "}
                    <span className="text-sm font-normal text-surface-on/60">
                      /Hari
                    </span>
                  </p>
                </div>
                <button
                  className={`px-4 py-2 rounded-xl text-sm font-bold ${selectedAddon?.id === addon.id ? "bg-secondary text-white" : "bg-surface-container text-surface-on"}`}
                >
                  {selectedAddon?.id === addon.id ? "Terpilih" : "Tambah"}
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3 & 4: Tanggal dan Durasi (BARU) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Pilih Tanggal Mulai (UI Sementara, belum terhubung backend) */}
          <section>
            <h3 className="flex items-center gap-2 text-xl font-bold text-surface-on mb-4">
              <span className="material-symbols-outlined text-primary">
                <BiCalendar className="w-10 h-10" />
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

          {/* Pilih Durasi Sewa */}
          <section>
            <h3 className="flex items-center gap-2 text-xl font-bold text-surface-on mb-4">
              <span className="material-symbols-outlined text-primary">
                <IoMdTime className="w-10 h-10" />
              </span>
              Durasi Sewa
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {[1, 2, 3, 7].map((days) => (
                <button
                  key={days}
                  type="button"
                  onClick={() => setDuration(days)}
                  className={`py-3 px-4 rounded-xl font-bold text-sm transition-all border ${
                    duration === days
                      ? "bg-primary-fixed text-primary border-primary shadow-ambient-blue"
                      : "bg-surface-container-lowest border-outline-variant/20 text-surface-on hover:bg-surface-container-low"
                  }`}
                >
                  {days} Hari
                </button>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* Kolom Kanan: Ringkasan Pesanan (Sidebar) */}
      <div className="lg:col-span-4">
        {/* Sticky container agar ikut turun saat discroll */}
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
            {/* Rincian Console */}
            <div className="flex justify-between items-start">
              <div>
                <p className="font-bold text-surface-on">
                  {selectedConsole
                    ? `${selectedConsole.name} (${duration} Hari)`
                    : "Pilih Unit PS4"}
                </p>
                <p className="text-xs text-surface-on/60 mt-1">
                  Jaminan Unit Higienis
                </p>
              </div>
              <p className="font-bold text-surface-on">
                {selectedConsole ? formatRupiah(consoleTotal) : "-"}
              </p>
            </div>

            {/* Rincian Addon */}
            <div className="flex justify-between items-center text-sm">
              <p
                className={
                  selectedAddon
                    ? "text-surface-on font-semibold"
                    : "text-surface-on/40 italic"
                }
              >
                {selectedAddon
                  ? `${selectedAddon.name} (${duration} Hari)`
                  : "Smart TV Add-on"}
              </p>
              <p
                className={
                  selectedAddon
                    ? "font-bold text-surface-on"
                    : "text-surface-on/40"
                }
              >
                {selectedAddon
                  ? `+ ${formatRupiah(addonTotal)}`
                  : "Belum dipilih"}
              </p>
            </div>

            {/* Rincian Ongkir (Statis sementara) */}
            <div className="flex justify-between items-center text-sm mt-2">
              <p className="text-surface-on font-semibold">
                Delivery Fee (± 3 KM)
              </p>
              <span className="bg-primary-fixed text-primary px-2 py-0.5 rounded-md font-bold text-xs">
                FREE
              </span>
            </div>
          </div>

          <div className="flex justify-between items-center mb-8">
            <p className="text-surface-on/80 font-bold">Total Harga</p>
            <p className="text-3xl font-extrabold text-secondary">
              {formatRupiah(grandTotal)}
            </p>
          </div>

          <button
            disabled={!selectedConsole || !startDate}
            className="w-full bg-secondary-container text-secondary-on-container py-4 rounded-xl font-extrabold text-lg shadow-lg hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            Kirim Permintaan Booking
          </button>

          {(!selectedConsole || !startDate) && (
            <p className="text-center text-xs text-surface-on/60 mt-4">
              Silakan pilih unit PS4 dan Tanggal Mulai terlebih dahulu.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
