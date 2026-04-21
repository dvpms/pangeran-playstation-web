"use client";

import {
  MdFilterList,
  MdMoreVert,
  MdWhatsapp,
  MdCheck,
  MdClose,
  MdEdit,
  MdDelete,
  MdRefresh,
} from "react-icons/md";
import { useState } from "react";
import { updateBookingStatus, deleteBooking } from "@/services/booking";
import Swal from "sweetalert2";

export default function BookingTable({ bookings: initialBookings = [] }) {
  const [bookings, setBookings] = useState(initialBookings);
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Map database status to UI status
  const mapStatus = (dbStatus) => {
    const statusMap = {
      PENDING: "pending",
      WAITING_PAYMENT: "pending",
      CONFIRMED: "on-delivery",
      ACTIVE: "active",
      COMPLETED: "completed",
      CANCELLED: "cancelled",
    };
    return statusMap[dbStatus] || "pending";
  };

  // Status options for dropdown
  const statusOptions = [
    { db: "PENDING", label: "Verifikasi", ui: "pending" },
    { db: "CONFIRMED", label: "Siap Kirim", ui: "on-delivery" },
    { db: "ACTIVE", label: "Rental Aktif", ui: "active" },
    { db: "COMPLETED", label: "Selesai", ui: "completed" },
    { db: "CANCELLED", label: "Dibatalkan", ui: "cancelled" },
  ];

  // Handle status update
  const handleStatusUpdate = async (bookingId, currentStatus, newStatus) => {
    setIsUpdating(true);
    try {
      const result = await updateBookingStatus(bookingId, newStatus);
      if (result.success) {
        // Update local state
        setBookings(
          bookings.map((b) =>
            b.id === bookingId ? { ...b, status: newStatus } : b,
          ),
        );
        setSelectedBookingId(null);
        setShowStatusModal(false);
      } else {
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "Gagal mengubah status: " + result.error,
        });
      }
    } catch (error) {
      console.error("Error updating status:", error);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Terjadi kesalahan saat mengubah status",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  // Handle delete booking
  const handleDeleteBooking = async (bookingId) => {
    if (!confirm("Apakah Anda yakin ingin menghapus booking ini?")) {
      return;
    }

    setIsUpdating(true);
    try {
      const result = await deleteBooking(bookingId);
      if (result.success) {
        // Remove from local state
        setBookings(bookings.filter((b) => b.id !== bookingId));
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "Booking berhasil dihapus.",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "Gagal menghapus booking: " + result.error,
        });
      }
    } catch (error) {
      console.error("Error deleting booking:", error);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Terjadi kesalahan saat menghapus booking",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  // Map database status to readable label
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

  // Calculate duration in days
  const calculateDuration = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    return days === 1 ? "1 Hari" : `${days} Hari`;
  };

  // Generate WhatsApp greeting message with booking details
  const generateGreetingMessage = ({
    customerName,
    tier,
    addonTv,
    duration,
    area,
  }) => {
    const template = `Halo ${customerName},

Terima kasih sudah melakukan booking di Pangeran Playstation

Berikut detail pesanan Anda:

- Nama: ${customerName}
- Konsol: ${tier || "N/A"}
- TV: ${addonTv ? "Ya" : "Tidak"}
- Durasi: ${duration}
- Area Pengiriman: ${area}`;
    return template;
  };

  // Transform real booking data to table format
  const transformedBookings = bookings.map((booking) => ({
    id: booking.id,
    customer: {
      name: booking.customerName,
      avatar: booking.customerName.charAt(0).toUpperCase(),
    },
    unit: booking.tier?.catalog?.name || "N/A",
    date: `${new Date(booking.startDate).toLocaleDateString("id-ID", { day: "2-digit", month: "long", year: "numeric" })}`,
    duration:
      booking.tier?.label ||
      calculateDuration(booking.startDate, booking.endDate) ||
      "N/A",
    area: booking.deliveryArea,
    tv: booking.addonTv,
    whatsappNumber: booking.whatsappNumber,
    status: mapStatus(booking.status),
    dbStatus: booking.status,
    statusLabel: getStatusLabel(booking.status),
  }));

  const getStatusBadgeColor = (status) => {
    const statusConfig = {
      pending: "bg-secondary-container text-on-secondary-container",
      "on-delivery": "bg-primary-container/20 text-primary",
      completed: "bg-surface-container-highest text-on-surface-variant",
      active: "bg-primary-container/20 text-primary",
      cancelled: "bg-error/20 text-error",
    };
    return statusConfig[status] || statusConfig.pending;
  };

  // Filter bookings based on status and search
  const filteredBookings = transformedBookings.filter((booking) => {
    // If there's a search query, prioritize search results (ignore status filter)
    if (searchQuery.trim() !== "") {
      const searchLower = searchQuery.toLowerCase();
      return (
        booking.customer.name.toLowerCase().includes(searchLower) ||
        booking.whatsappNumber.toLowerCase().includes(searchLower)
      );
    }

    // If no search, apply status filter
    const statusMatch =
      statusFilter === "all" || booking.status === statusFilter;
    return statusMatch;
  });

  const displayData = filteredBookings;

  return (
    <div>
      {/* Filter Section */}
      <div className="flex gap-4 items-center mb-6">
        <div className="flex-1 max-w-xs">
          <label className="block text-sm font-medium text-on-surface-variant mb-2">
            Filter by Status
          </label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-surface-container border border-surface-container-high focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="all">All Bookings</option>
            <option value="pending">Pending</option>
            <option value="on-delivery">On Delivery</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div className="flex-1 max-w-xs">
          <label className="block text-sm font-medium text-on-surface-variant mb-2">
            Search Customer
          </label>
          <input
            type="text"
            placeholder="Enter name or phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-surface-container border border-surface-container-high focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>

        {/* Results counter */}
        <div className="text-sm text-on-surface-variant pt-6">
          <span>{filteredBookings.length} results</span>
        </div>
      </div>

      {/* Table Section */}
      {filteredBookings.length === 0 ? (
        <div className="bg-surface-container-lowest rounded-xl p-8 text-center">
          <p className="text-on-surface-variant">No bookings found</p>
        </div>
      ) : (
        <div className="bg-surface-container-lowest rounded-xl p-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-headline-lg font-bold text-on-surface">
              Recent Bookings
            </h2>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b-2 border-surface-container-low text-on-surface-variant font-semibold text-sm">
                  <th className="py-4 px-4 font-medium">Customer</th>
                  <th className="py-4 px-4 font-medium">Unit</th>
                  <th className="py-4 px-4 font-medium">TV</th>
                  <th className="py-4 px-4 font-medium">Tanggal</th>
                  <th className="py-4 px-4 font-medium">Duration</th>
                  <th className="py-4 px-4 font-medium">Delivery Area</th>
                  <th className="py-4 px-4 font-medium">Whatsapp</th>
                  <th className="py-4 px-4 font-medium">Status</th>
                  <th className="py-4 px-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {displayData.map((booking) => {
                  // Get original booking data for message generation
                  const originalBooking = bookings.find(
                    (b) => b.id === booking.id,
                  );

                  return (
                    <tr
                      key={booking.id}
                      className="group hover:bg-surface-container-low/50 transition-colors border-b border-surface-container-low/50"
                    >
                      {/* Customer */}
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary-container/20 text-primary flex items-center justify-center font-bold">
                            {booking.customer.avatar}
                          </div>
                          <span className="font-semibold text-on-surface">
                            {booking.customer.name}
                          </span>
                        </div>
                      </td>

                      {/* Unit */}
                      <td className="py-4 px-4 text-on-surface-variant font-medium">
                        {booking.unit}
                      </td>

                      {/* TV */}
                      <td className="py-4 px-4 text-on-surface-variant font-medium">
                        {booking.tv ? "Ya" : "Tidak"}
                      </td>

                      {/* Date */}
                      <td className="py-4 px-4 text-on-surface-variant">
                        {booking.date}
                      </td>

                      {/* Duration */}
                      <td className="py-4 px-4 text-on-surface-variant">
                        {booking.duration}
                      </td>

                      {/* Area */}
                      <td className="py-4 px-4 text-on-surface-variant">
                        {booking.area}
                      </td>

                      {/* whatsapp */}
                      <td className="py-4 px-4">
                        <a
                          href={`https://wa.me/${booking.whatsappNumber}?text=${encodeURIComponent(
                            generateGreetingMessage({
                              customerName: booking.customer.name,
                              tier: booking.unit,
                              addonTv: booking.tv,
                              date: booking.date,
                              duration: booking.duration,
                              area: booking.area,
                            }),
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-green-500 hover:text-green-700 transition-colors"
                          title="Hubungi via WhatsApp dengan detail booking"
                        >
                          <MdWhatsapp size={20} />
                        </a>
                      </td>

                      {/* Status */}
                      <td className="py-4 px-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${getStatusBadgeColor(
                            booking.status,
                          )}`}
                        >
                          {booking.statusLabel}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-4 text-right">
                        <div className="flex justify-end items-center gap-2">
                          {/* Update Status Button */}
                          <button
                            onClick={() => {
                              setSelectedBookingId(booking.id);
                              setShowStatusModal(true);
                            }}
                            className="p-2 rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors"
                            title="Update Status"
                            disabled={isUpdating}
                          >
                            <MdEdit size={18} />
                          </button>

                          {/* Delete Button */}
                          <button
                            onClick={() => handleDeleteBooking(booking.id)}
                            className="p-2 rounded-lg text-on-surface-variant hover:text-error hover:bg-error/10 transition-colors"
                            title="Delete Booking"
                            disabled={isUpdating}
                          >
                            <MdDelete size={18} />
                          </button>
                        </div>

                        {/* Status Update Modal */}
                        {selectedBookingId === booking.id &&
                          showStatusModal && (
                            <div
                              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
                              onClick={() => setShowStatusModal(false)}
                            >
                              <div
                                className="bg-surface-container-lowest rounded-2xl p-6 w-96 shadow-lg"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <h3 className="text-headline-sm font-bold text-on-surface mb-4">
                                  Ubah Status Booking
                                </h3>
                                <p className="text-sm text-on-surface-variant mb-4">
                                  Pilih status baru untuk booking ini:
                                </p>

                                <div className="space-y-2 max-h-64 overflow-y-auto mb-6">
                                  {statusOptions
                                    .filter(
                                      (opt) => opt.db !== booking.dbStatus,
                                    )
                                    .map((option) => (
                                      <button
                                        key={option.db}
                                        onClick={() =>
                                          handleStatusUpdate(
                                            booking.id,
                                            booking.dbStatus,
                                            option.db,
                                          )
                                        }
                                        disabled={isUpdating}
                                        className="w-full text-left p-3 rounded-lg border border-surface-container-high hover:bg-surface-container hover:border-primary transition-colors text-on-surface disabled:opacity-50 disabled:cursor-not-allowed"
                                      >
                                        <div className="font-medium text-sm">
                                          {option.label}
                                        </div>
                                      </button>
                                    ))}
                                </div>

                                <button
                                  onClick={() => setShowStatusModal(false)}
                                  className="w-full px-4 py-2 rounded-lg border border-surface-container-high hover:bg-surface-container transition-colors text-on-surface font-medium"
                                >
                                  Batal
                                </button>
                              </div>
                            </div>
                          )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
