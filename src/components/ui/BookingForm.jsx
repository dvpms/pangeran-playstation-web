// src/components/BookingForm.jsx
"use client";

import { useState, useEffect } from "react";
import { BiCalendar } from "react-icons/bi";
import { FaReceipt, FaSpinner, FaTv } from "react-icons/fa";
import { GiConsoleController } from "react-icons/gi";
import { IoMdTime } from "react-icons/io";
import Select from "react-select";
import { FaMapMarkerAlt } from "react-icons/fa";

import { getUnavailableDates, submitBooking } from "@/services/booking";
import Image from "next/image";
import Swal from "sweetalert2";

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

  const [unavailableDates, setUnavailableDates] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingDates, setIsLoadingDates] = useState(false);

  // Efek Samping: Cek database setiap kali unit dipilih/diganti
  useEffect(() => {
    async function fetchDates() {
      if (!selectedUnit) return;

      setStartDate(null); // Reset pilihan tanggal jika unit diganti
      setIsLoadingDates(true);

      try {
        const bookedDates = await getUnavailableDates(selectedUnit.id);
        setUnavailableDates(bookedDates);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoadingDates(false);
      }
    }

    fetchDates();
  }, [selectedUnit]);

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
  const isFormValid = selectedTier && startDate && name && whatsapp && area;

  // Eksekutor Form
  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      // Hitung endDate sederhana (Untuk sementara kita tambah 1 hari dari startDate sebagai baseline)
      // Di sistem yang lebih kompleks, ini dihitung berdasarkan kode durasi tier (12h, 1d, 2d)
      const end = new Date(startDate);
      if (selectedTier.duration === "2d") end.setDate(end.getDate() + 1);
      if (selectedTier.duration === "3d") end.setDate(end.getDate() + 2);

      const payload = {
        catalogId: selectedUnit.id,
        unitName: selectedUnit.name,
        tierId: selectedTier.id,
        tierLabel: selectedTier.label,
        startDate: startDate.toISOString(),
        endDate: end.toISOString(),
        customerName: name,
        whatsappNumber: whatsapp,
        deliveryArea: area.value,
        // fullAddress: address,
        totalPrice: grandTotal,
        addonTv: selectedAddon,
      };

      const result = await submitBooking(payload);

      if (result.success) {
        // reset form
        setSelectedUnit(defaultConsole);
        setSelectedTier(null);
        setSelectedAddon(false);
        setStartDate(null);
        setName("");
        setWhatsapp("");
        setArea(null);
        // setAddress("");

        console.log("Booking berhasil dibuat:", result.booking);
        Swal.fire({
          icon: 'success',
          title: 'Sukses!',
          text: 'Booking berhasil dibuat! Silakan cek WhatsApp untuk konfirmasi lebih lanjut.',
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: result.message || 'Terjadi kesalahan saat membuat booking.',
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Terjadi kesalahan jaringan.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative">
      {/* Kolom Kiri: Form Input */}
      <div className="lg:col-span-8 flex flex-col gap-10">
        {/* Section 1: Pilih Unit */}
        <section>
          <h3 className="flex items-center gap-2 text-xl font-bold text-surface-on mb-4">
            <span className="material-symbols-outlined text-primary">
              <GiConsoleController className="w-10 h-10" />
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
                <div className="w-full h-48 bg-surface-container-lowest rounded-xl mb-4 flex items-center justify-center">
                  <Image
                    src={"/images/ps4-slim1.png"}
                    alt={cons.name}
                    loading="lazy"
                    width={128}
                    height={128}
                  />
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
              <h4 className="font-bold text-surface-on text-lg">PS4 Pro</h4>
              <p className="text-sm text-surface-on/60 mt-1">
                Performa maksimal resolusi 4K tajam.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2: Pilih Paket Durasi */}
        <section>
          <h3 className="flex items-center gap-2 text-xl font-bold text-surface-on mb-4">
            <IoMdTime className="text-primary w-10 h-10" />
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
              <FaTv className="text-primary w-10 h-10" />
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
          <div className="flex items-center justify-between mb-4">
            <h3 className="flex items-center gap-2 text-xl font-bold text-surface-on">
              <BiCalendar className="text-primary w-10 h-10" /> Pilih Tanggal
              Mulai
            </h3>
            {isLoadingDates && (
              <span className="text-xs text-primary animate-pulse font-bold">
                Mengecek ketersediaan...
              </span>
            )}
          </div>

          <div className="flex gap-2 overflow-x-auto pb-4 no-scrollbar">
            {availableDates.map((date, i) => {
              const dateStr = date.toLocaleDateString("en-CA");
              const isFull =
                unavailableDates.includes("ALL") ||
                unavailableDates.includes(dateStr);
              const isSelected = startDate?.getDate() === date.getDate();

              return (
                <button
                  key={i}
                  type="button"
                  disabled={isFull || isLoadingDates}
                  onClick={() => setStartDate(date)}
                  className={`min-w-[4.5rem] p-3 rounded-xl flex flex-col items-center justify-center transition-all border ${
                    isFull
                      ? "bg-surface-container-lowest border-outline-variant/10 opacity-30 cursor-not-allowed"
                      : isSelected
                        ? "bg-primary text-white border-primary shadow-lg shadow-primary/30 transform scale-105"
                        : "bg-surface-container-lowest border-outline-variant/20 text-surface-on hover:border-primary/50 cursor-pointer"
                  }`}
                >
                  <span
                    className={`text-xs uppercase font-bold opacity-80 ${isFull ? "line-through" : ""}`}
                  >
                    {date.toLocaleDateString("id-ID", { weekday: "short" })}
                  </span>
                  <span
                    className={`text-2xl font-extrabold ${isFull ? "text-surface-on/30" : ""}`}
                  >
                    {date.getDate()}
                  </span>
                  {isFull && (
                    <span className="text-[9px] text-error font-bold mt-1">
                      Penuh
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </section>

        {/* Section 5: Detail Pengiriman & Kontak (BARU) */}
        <section>
          <h3 className="flex items-center gap-2 text-xl font-bold text-surface-on mb-4">
            <span className="material-symbols-outlined text-primary">
              <FaMapMarkerAlt className="w-10 h-10 text-primary" />
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
                  normalize="false"
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
                instanceId="area-select"
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
        <div className="bg-surface-container-lowest border border-outline-variant/20 rounded-4xl p-6 md:p-8 sticky top-24 shadow-ambient-blue">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-surface-on">
              Ringkasan Pesanan
            </h3>
            <span className="material-symbols-outlined text-surface-on/40">
              <FaReceipt className="w-8 h-8 text-primary" />
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
            onClick={handleSubmit}
            disabled={!isFormValid || isSubmitting}
            className="w-full bg-secondary-container text-secondary-on-container py-4 rounded-xl font-extrabold text-lg shadow-lg hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex justify-center items-center gap-2"
          >
            {isSubmitting ? (
              <>
               <FaSpinner className="animate-spin text-primary" />
                Memproses...
              </>
            ) : (
              "Kirim Permintaan Booking"
            )}
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
