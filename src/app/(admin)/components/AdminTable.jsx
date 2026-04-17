"use client";

import { useState, useTransition } from "react";
import { updateBookingStatus } from "@/services/booking";
import { useRouter } from "next/navigation";

export default function AdminTable({ initialData }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [filter, setFilter] = useState("ALL");

  // Fungsi untuk mengubah status dan me-refresh data dari server
  const handleStatusChange = async (bookingId, currentStatus) => {
    let nextStatus = "PENDING";
    if (currentStatus === "PENDING")
      nextStatus = "CONFIRMED"; // Konfirmasi Pembayaran
    else if (currentStatus === "CONFIRMED")
      nextStatus = "ACTIVE"; // Unit Dikirim (On Delivery)
    else if (currentStatus === "ACTIVE") nextStatus = "COMPLETED"; // Selesai / Kembali

    const result = await updateBookingStatus(bookingId, nextStatus);

    if (result.success) {
      // Refresh halaman secara halus agar data terbaru dari Prisma masuk
      startTransition(() => {
        router.refresh();
      });
    } else {
      alert("Gagal memperbarui status: " + result.error);
    }
  };

  // Filter logika
  const filteredData = initialData.filter((booking) => {
    if (filter === "ALL") return true;
    return booking.status === filter;
  });

  // Helper visual status
  const getStatusBadge = (status) => {
    const styles = {
      PENDING: "bg-secondary-container text-on-secondary-container",
      CONFIRMED: "bg-primary-container/20 text-primary",
      ACTIVE: "bg-primary-container text-on-primary-container",
      COMPLETED: "bg-surface-container-highest text-on-surface-variant",
      CANCELLED: "bg-error-container text-on-error-container",
    };

    const labels = {
      PENDING: "Pending",
      CONFIRMED: "Siap Kirim",
      ACTIVE: "On Delivery / Aktif",
      COMPLETED: "Completed",
      CANCELLED: "Dibatalkan",
    };

    return (
      <span
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${styles[status] || styles.PENDING}`}
      >
        <span
          className={`w-1.5 h-1.5 rounded-full ${status === "COMPLETED" ? "bg-on-surface-variant" : "bg-current"}`}
        ></span>
        {labels[status] || status}
      </span>
    );
  };

  return (
    <div className="bg-surface-container-lowest rounded-xl p-8 overflow-hidden shadow-sm border border-outline-variant/20">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-on-surface">
          Manajemen Pemesanan
        </h2>
        <div className="flex gap-3">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 rounded-lg bg-surface-container text-on-surface font-medium text-sm hover:bg-surface-container-high transition-colors outline-none cursor-pointer"
          >
            <option value="ALL">Semua Pesanan</option>
            <option value="PENDING">Menunggu Verifikasi</option>
            <option value="CONFIRMED">Siap Kirim</option>
            <option value="ACTIVE">Rental Aktif</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b-2 border-surface-container-low text-on-surface-variant font-semibold text-sm">
              <th className="py-4 px-4 font-medium">Pelanggan</th>
              <th className="py-4 px-4 font-medium">Unit</th>
              <th className="py-4 px-4 font-medium">Paket</th>
              <th className="py-4 px-4 font-medium">Area</th>
              <th className="py-4 px-4 font-medium">Status</th>
              <th className="py-4 px-4 font-medium text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {filteredData.length === 0 ? (
              <tr>
                <td
                  colSpan="6"
                  className="text-center py-8 text-on-surface-variant"
                >
                  Tidak ada data pesanan.
                </td>
              </tr>
            ) : (
              filteredData.map((booking) => (
                <tr
                  key={booking.id}
                  className="group hover:bg-surface-container-low/50 transition-colors border-b border-surface-container-low/50 opacity-100 data-[pending=true]:opacity-50"
                  data-pending={isPending}
                >
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary-container/20 text-primary flex items-center justify-center font-bold uppercase">
                        {booking.customerName?.charAt(0) || "-"}
                      </div>
                      <span className="font-semibold text-on-surface">
                        {booking.customerName}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-on-surface-variant font-medium">
                    {booking.tier?.catalog?.name || "Unit Dihapus"}
                  </td>
                  <td className="py-4 px-4 text-on-surface-variant">
                    {booking.tier?.label || "-"}
                  </td>
                  <td className="py-4 px-4 text-on-surface-variant">
                    {booking.deliveryArea}
                  </td>
                  <td className="py-4 px-4">
                    {getStatusBadge(booking.status)}
                  </td>
                  <td className="py-4 px-4 text-right">
                    {booking.status !== "COMPLETED" &&
                      booking.status !== "CANCELLED" && (
                        <button
                          disabled={isPending}
                          onClick={() =>
                            handleStatusChange(booking.id, booking.status)
                          }
                          className="text-primary hover:bg-primary-container hover:text-on-primary-container px-3 py-1.5 rounded-lg transition-colors font-bold text-xs"
                        >
                          {booking.status === "PENDING"
                            ? "Konfirmasi Bayar"
                            : booking.status === "CONFIRMED"
                              ? "Kirim Unit"
                              : booking.status === "ACTIVE"
                                ? "Tandai Selesai"
                                : ""}
                        </button>
                      )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
