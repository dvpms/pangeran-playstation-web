"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  MdArrowBack,
  MdEdit,
  MdDelete,
  MdWhatsapp,
  MdLocationOn,
  MdPerson,
  MdSportsEsports,
  MdLocalShipping,
} from "react-icons/md";
import { FaSpinner } from "react-icons/fa";
import Swal from "sweetalert2";
import { getBookingById, updateBookingStatus, deleteBooking } from "@/services/booking";

// ─── Helpers ────────────────────────────────────────────────────────────────

const formatRupiah = (number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);

const formatDate = (dateStr) =>
  new Date(dateStr).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

const calculateDuration = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  return Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
};

const getStatusBadgeColor = (dbStatus) => {
  const statusConfig = {
    PENDING: "bg-secondary-container text-secondary-on-container",
    CONFIRMED: "bg-primary-container/20 text-primary",
    ACTIVE: "bg-primary-container/20 text-primary",
    COMPLETED: "bg-surface-container text-surface-on/60",
    CANCELLED: "bg-red-100 text-red-600",
  };
  return statusConfig[dbStatus] || statusConfig.PENDING;
};

const getStatusLabel = (dbStatus) => {
  const labelMap = {
    PENDING: "Verifikasi",
    CONFIRMED: "Siap Kirim",
    ACTIVE: "Rental Aktif",
    COMPLETED: "Selesai",
    CANCELLED: "Dibatalkan",
  };
  return labelMap[dbStatus] || dbStatus;
};

// ─── Sub-components ──────────────────────────────────────────────────────────

function SectionCard({ icon, title, children }) {
  return (
    <div className="bg-surface-container-lowest rounded-2xl p-6 border border-outline-variant/20">
      <h2 className="text-lg font-bold text-surface-on mb-4 flex items-center gap-2">
        {icon}
        {title}
      </h2>
      <div className="divide-y divide-outline-variant/10">{children}</div>
    </div>
  );
}

function InfoRow({ label, children }) {
  return (
    <div className="flex justify-between items-start py-2 border-b border-outline-variant/10 last:border-0">
      <span className="text-sm text-surface-on/60 font-medium">{label}</span>
      <span className="text-sm font-semibold text-surface-on text-right ml-4">{children}</span>
    </div>
  );
}

// ─── Status Options ──────────────────────────────────────────────────────────

const STATUS_OPTIONS = [
  { db: "PENDING", label: "Verifikasi" },
  { db: "CONFIRMED", label: "Siap Kirim" },
  { db: "ACTIVE", label: "Rental Aktif" },
  { db: "COMPLETED", label: "Selesai" },
  { db: "CANCELLED", label: "Dibatalkan" },
];

// ─── Main Page ───────────────────────────────────────────────────────────────

export default function BookingDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  const [booking, setBooking] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    async function fetchBooking() {
      try {
        const data = await getBookingById(id);
        if (!data) {
          setError("Booking tidak ditemukan.");
        } else {
          setBooking(data);
        }
      } catch (err) {
        console.error("Gagal memuat detail booking:", err);
        setError("Terjadi kesalahan saat memuat data booking.");
      } finally {
        setIsLoading(false);
      }
    }

    if (id) fetchBooking();
  }, [id]);

  // ── Handlers ────────────────────────────────────────────────────────────

  const handleStatusUpdate = async (newStatus) => {
    setIsUpdating(true);
    try {
      const result = await updateBookingStatus(booking.id, newStatus);
      if (result.success) {
        setBooking((prev) => ({ ...prev, status: newStatus }));
        setShowStatusModal(false);
      } else {
        Swal.fire({ icon: "error", title: "Gagal!", text: "Gagal mengubah status: " + result.error });
      }
    } catch (err) {
      console.error("Error updating status:", err);
      Swal.fire({ icon: "error", title: "Error!", text: "Terjadi kesalahan saat mengubah status." });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    const confirm = await Swal.fire({
      title: "Hapus Booking?",
      text: "Tindakan ini tidak dapat dibatalkan.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, Hapus",
      cancelButtonText: "Batal",
      confirmButtonColor: "#ef4444",
    });

    if (!confirm.isConfirmed) return;

    try {
      const result = await deleteBooking(booking.id);
      if (result.success) {
        router.push("/admin/bookings");
      } else {
        Swal.fire({ icon: "error", title: "Gagal!", text: "Gagal menghapus booking: " + result.error });
      }
    } catch (err) {
      console.error("Error deleting booking:", err);
      Swal.fire({ icon: "error", title: "Error!", text: "Terjadi kesalahan saat menghapus booking." });
    }
  };

  // ── Loading State ────────────────────────────────────────────────────────

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3 text-surface-on/60">
        <FaSpinner className="animate-spin text-primary" size={32} />
        <p className="text-sm font-medium">Memuat detail booking...</p>
      </div>
    );
  }

  // ── Error State ──────────────────────────────────────────────────────────

  if (error || !booking) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <p className="text-surface-on/60 text-sm">{error || "Booking tidak ditemukan."}</p>
        <button
          onClick={() => router.push("/admin/bookings")}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-white font-bold text-sm hover:bg-primary/90 transition-all"
        >
          <MdArrowBack size={18} />
          Kembali
        </button>
      </div>
    );
  }

  // ── Derived Values ───────────────────────────────────────────────────────

  const totalPrice = Number(booking.totalPrice);
  const deliveryFee = Number(booking.deliveryFee ?? 0);
  const rentalSubtotal = totalPrice - deliveryFee;
  const duration = calculateDuration(booking.startDate, booking.endDate);
  const waGreeting = encodeURIComponent(
    `Halo ${booking.customerName}, terima kasih sudah booking di Pangeran Playstation!`
  );
  const waLink = `https://wa.me/${booking.whatsappNumber}?text=${waGreeting}`;

  // ── Render ───────────────────────────────────────────────────────────────

  return (
    <div className="space-y-6">
      {/* ── Page Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push("/admin/bookings")}
            className="p-2 rounded-xl hover:bg-surface-container transition-colors text-surface-on/60 hover:text-surface-on"
            title="Kembali ke daftar booking"
          >
            <MdArrowBack size={22} />
          </button>
          <div>
            <h1 className="text-xl font-extrabold text-surface-on">
              {booking.customerName}
            </h1>
            <div className="flex items-center gap-2 mt-1">
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${getStatusBadgeColor(booking.status)}`}
              >
                {getStatusLabel(booking.status)}
              </span>
              <span className="text-xs text-surface-on/40">
                #{booking.id.slice(0, 8).toUpperCase()}
              </span>
            </div>
          </div>
        </div>

        {/* ── Action Buttons ── */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Ubah Status */}
          <button
            onClick={() => setShowStatusModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-white font-bold text-sm hover:bg-primary/90 transition-all"
          >
            <MdEdit size={16} />
            Ubah Status
          </button>

          {/* Hubungi via WhatsApp */}
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-green-500 text-white font-bold text-sm hover:bg-green-600 transition-all"
          >
            <MdWhatsapp size={16} />
            Hubungi
          </a>

          {/* Hapus */}
          <button
            onClick={handleDelete}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-500 text-white font-bold text-sm hover:bg-red-600 transition-all"
          >
            <MdDelete size={16} />
            Hapus
          </button>
        </div>
      </div>

      {/* ── Main Content Grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column — info sections */}
        <div className="lg:col-span-2 space-y-6">
          {/* Info Sewa */}
          <SectionCard icon={<MdSportsEsports size={20} className="text-primary" />} title="Info Sewa">
            <InfoRow label="Waktu Booking Masuk">
              {booking.createdAt
                ? new Date(booking.createdAt).toLocaleDateString("id-ID", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : "-"}
            </InfoRow>
            <InfoRow label="Unit">{booking.tier?.catalog?.name ?? "-"}</InfoRow>
            <InfoRow label="Tier">
              {booking.tier?.label ?? "-"}
              {booking.tier?.price != null && (
                <span className="text-surface-on/50 font-normal ml-1">
                  ({formatRupiah(Number(booking.tier.price))})
                </span>
              )}
            </InfoRow>
            <InfoRow label="TV Add-on">{booking.addonTv ? "Ya" : "Tidak"}</InfoRow>
            <InfoRow label="Tanggal Mulai">{formatDate(booking.startDate)}</InfoRow>
            <InfoRow label="Tanggal Selesai">{formatDate(booking.endDate)}</InfoRow>
            <InfoRow label="Durasi">{duration} Hari</InfoRow>
            <InfoRow label="Metode Pembayaran">
              {booking.paymentMethod === "CASH"
                ? "Cash (Bayar di Tempat)"
                : booking.paymentMethod === "TRANSFER"
                ? "Transfer Bank"
                : booking.paymentMethod ?? "-"}
            </InfoRow>
          </SectionCard>

          {/* Info Pelanggan */}
          <SectionCard icon={<MdPerson size={20} className="text-primary" />} title="Info Pelanggan">
            <InfoRow label="Nama">{booking.customerName}</InfoRow>
            <InfoRow label="WhatsApp">
              <a
                href={`https://wa.me/${booking.whatsappNumber.replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-green-600 hover:underline"
              >
                <MdWhatsapp size={14} />
                {booking.whatsappNumber}
              </a>
            </InfoRow>
            <InfoRow label="Jaminan">{booking.jaminan ?? "-"}</InfoRow>
            <InfoRow label="Media Sosial">
              {booking.socialMediaType && booking.socialMediaUsername
                ? `${booking.socialMediaType} @${booking.socialMediaUsername}`
                : "-"}
            </InfoRow>
            <InfoRow label="Dapat Info Dari">{booking.sourceInfo ?? "-"}</InfoRow>
          </SectionCard>

          {/* Info Pengiriman */}
          <SectionCard icon={<MdLocalShipping size={20} className="text-primary" />} title="Info Pengiriman">
            <InfoRow label="Area Layanan">{booking.deliveryArea ?? "-"}</InfoRow>
            <InfoRow label="Detail Alamat & Blok">
              <span className="whitespace-pre-wrap">{booking.address ?? "-"}</span>
            </InfoRow>

            {booking.locationLat ? (
              <>
                <InfoRow label="Nama Lokasi">{booking.locationName ?? "-"}</InfoRow>
                <InfoRow label="Koordinat">
                  {booking.locationLat.toFixed(5)}, {booking.locationLng.toFixed(5)}
                </InfoRow>
                <InfoRow label="Jarak">
                  {booking.distanceKm?.toFixed(1)} km dari base station terdekat
                </InfoRow>
                <div className="flex justify-between items-start py-2">
                  <span className="text-sm text-surface-on/60 font-medium">Lihat di Peta</span>
                  <div className="flex gap-2 ml-4">
                    <a
                      href={`https://www.openstreetmap.org/?mlat=${booking.locationLat}&mlon=${booking.locationLng}&zoom=16`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
                    >
                      <MdLocationOn size={13} />
                      OpenStreetMap
                    </a>
                    <a
                      href={`https://www.google.com/maps?q=${booking.locationLat},${booking.locationLng}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
                    >
                      <MdLocationOn size={13} />
                      Google Maps
                    </a>
                  </div>
                </div>
              </>
            ) : null}
          </SectionCard>
        </div>

        {/* Right column — price summary */}
        <div className="lg:col-span-1">
          <div className="bg-surface-container-lowest rounded-2xl p-6 border border-outline-variant/20 sticky top-6">
            <h2 className="text-lg font-bold text-surface-on mb-4">Ringkasan Harga</h2>

            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-surface-on/60 font-medium">Harga Sewa</span>
                <span className="font-semibold text-surface-on">{formatRupiah(rentalSubtotal)}</span>
              </div>

              <div className="flex justify-between items-center text-sm">
                <span className="text-surface-on/60 font-medium">Ongkos Kirim</span>
                <span className="font-semibold text-surface-on">
                  {booking.deliveryFee != null ? formatRupiah(deliveryFee) : "-"}
                </span>
              </div>

              <div className="border-t border-outline-variant/20 pt-3 flex justify-between items-center">
                <span className="text-sm font-bold text-surface-on">Grand Total</span>
                <span className="text-xl font-extrabold text-primary">{formatRupiah(totalPrice)}</span>
              </div>
            </div>

            <p className="mt-4 text-xs text-surface-on/40 leading-relaxed">
              Nilai ongkir dan total sesuai data tersimpan saat booking dibuat
            </p>
          </div>
        </div>
      </div>

      {/* ── Status Modal ── */}
      {showStatusModal && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowStatusModal(false)}
        >
          <div
            className="bg-surface-container-lowest rounded-2xl p-6 w-full max-w-sm shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-bold text-surface-on mb-2">Ubah Status Booking</h3>
            <p className="text-sm text-surface-on/60 mb-4">
              Pilih status baru untuk booking ini:
            </p>

            <div className="space-y-2 max-h-64 overflow-y-auto mb-6">
              {STATUS_OPTIONS.filter((opt) => opt.db !== booking.status).map((option) => (
                <button
                  key={option.db}
                  onClick={() => handleStatusUpdate(option.db)}
                  disabled={isUpdating}
                  className="w-full text-left p-3 rounded-lg border border-outline-variant/20 hover:bg-surface-container hover:border-primary transition-colors text-surface-on text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="font-medium">{option.label}</span>
                </button>
              ))}
            </div>

            <button
              onClick={() => setShowStatusModal(false)}
              disabled={isUpdating}
              className="w-full px-4 py-2.5 rounded-lg border border-outline-variant/20 hover:bg-surface-container transition-colors text-surface-on font-medium text-sm disabled:opacity-50"
            >
              Batal
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
