"use client";

import { useState } from "react";
import {
  MdFilterList,
  MdCheckCircle,
  MdBuild,
  MdInventory2,
  MdSportsEsports,
  MdAddCircle,
  MdEdit,
  MdDelete,
} from "react-icons/md";
import { useQueryClient } from "@tanstack/react-query";
import { addPhysicalUnit, updateUnitStatus, deletePhysicalUnit, addCatalog } from "@/services/inventory";
import { useInventory } from "@/hooks/useInventory";
import PageHeader from "../components/PageHeader";
import StatCard from "../components/StatCard";
import Swal from "sweetalert2";

export default function InventoryPage() {
  const queryClient = useQueryClient();
  const { data: catalogs = [], isLoading } = useInventory();
  const [showAddModal, setShowAddModal] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [selectedInventory, setSelectedInventory] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newUnit, setNewUnit] = useState({
    catalogId: "",
    serialCode: "",
  });
  const [showAddCatalogForm, setShowAddCatalogForm] = useState(false);
  const [newCatalogName, setNewCatalogName] = useState("");

  const refreshInventory = () => queryClient.invalidateQueries({ queryKey: ['inventory'] });

  // Handle add new catalog
  const handleAddCatalog = async () => {
    if (!newCatalogName.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Warning",
        text: "Nama konsol tidak boleh kosong",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await addCatalog(newCatalogName);
      if (result.success) {
        Swal.fire({
          icon: "success",
          title: "Berhasil!",
          text: "Jenis konsol berhasil ditambahkan",
        });
        setNewCatalogName("");
        setShowAddCatalogForm(false);
        setNewUnit({ ...newUnit, catalogId: result.data.id });
        refreshInventory();
      } else {
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: result.message || "Gagal menambahkan konsol",
        });
      }
    } catch (error) {
      console.error("Error adding catalog:", error);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Terjadi kesalahan saat menambahkan konsol",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle add new physical unit
  const handleAddUnit = async () => {
    if (!newUnit.catalogId || !newUnit.serialCode.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Warning",
        text: "Silakan isi semua field terlebih dahulu",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await addPhysicalUnit(newUnit.catalogId, newUnit.serialCode);
      if (result.success) {
        Swal.fire({
          icon: "success",
          title: "Berhasil!",
          text: "Unit mesin berhasil ditambahkan",
        });
        setNewUnit({ catalogId: "", serialCode: "" });
        setShowAddModal(false);
        refreshInventory();
      } else {
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: result.message || "Gagal menambahkan unit",
        });
      }
    } catch (error) {
      console.error("Error adding unit:", error);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Terjadi kesalahan saat menambahkan unit",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle update unit status
  const handleUpdateStatus = async (newStatus) => {
    if (!selectedInventory) return;

    setIsSubmitting(true);
    try {
      const result = await updateUnitStatus(selectedInventory.id, newStatus);
      if (result.success) {
        Swal.fire({
          icon: "success",
          title: "Berhasil!",
          text: "Status mesin berhasil diubah",
        });
        setShowStatusModal(false);
        setSelectedInventory(null);
        refreshInventory();
      } else {
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: result.message || "Gagal mengubah status",
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
      setIsSubmitting(false);
    }
  };

  // Handle delete unit
  const handleDeleteUnit = async (inventoryId) => {
    const confirm = await Swal.fire({
      icon: "warning",
      title: "Hapus Unit?",
      text: "Apakah Anda yakin ingin menghapus unit ini?",
      showCancelButton: true,
      confirmButtonText: "Hapus",
      cancelButtonText: "Batal",
    });

    if (!confirm.isConfirmed) return;

    setIsSubmitting(true);
    try {
      const result = await deletePhysicalUnit(inventoryId);
      if (result.success) {
        Swal.fire({ icon: "success", title: "Berhasil!", text: "Unit mesin berhasil dihapus" });
        refreshInventory();
      } else {
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: result.message || "Gagal menghapus unit",
        });
      }
    } catch (error) {
      console.error("Error deleting unit:", error);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Terjadi kesalahan saat menghapus unit",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Transform catalog data to flat inventory items with catalog name
  const inventory = catalogs.flatMap((catalog) =>
    catalog.inventories?.map((inv) => ({
      catalogId: catalog.id,
      catalogName: catalog.name,
      id: inv.id,
      serialCode: inv.serialCode,
      status: inv.status,
    })) || []
  );

  // Calculate stats (works with flat inventory array)
  const totalUnits = inventory.length;
  const availableUnits = inventory.filter(
    (item) => item.status === "AVAILABLE"
  ).length;
  const maintenanceUnits = inventory.filter(
    (item) => item.status === "MAINTENANCE"
  ).length;

  return (
    <>
      {/* Page Header */}
      <PageHeader
        title="Inventory Management"
        subtitle="Track all gaming consoles and equipment inventory status."
        actionButton={{
          icon: <MdAddCircle className="w-5 h-5" />,
          label: "Add New Unit",
          onClick: () => setShowAddModal(true),
        }}
      />

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        <StatCard
          title="Total Units"
          value={totalUnits.toString()}
          icon={<MdSportsEsports className="w-6 h-6" />}
          subtitle={{
            text: "All inventory",
          }}
        />

        <StatCard
          title="Available Now"
          value={availableUnits.toString()}
          icon={<MdInventory2 className="w-6 h-6" />}
          subtitle={{
            icon: <MdCheckCircle className="text-primary" />,
            text: `${totalUnits > 0 ? Math.round((availableUnits / totalUnits) * 100) : 0}% available`,
          }}
        />

        <StatCard
          title="Under Maintenance"
          value={maintenanceUnits.toString()}
          icon={<MdBuild className="w-6 h-6" />}
          subtitle={{
            text: "Estimated 3 days",
          }}
        />
      </div>

      {/* Inventory Table */}
      <div className="bg-surface-container-lowest rounded-xl p-4 md:p-8 overflow-hidden">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 md:gap-6 mb-6">
          <h2 className="text-lg md:text-headline-lg font-bold text-on-surface">
            Equipment Status
          </h2>
          <div className="flex flex-col sm:flex-row gap-2 md:gap-3 w-full md:w-auto">
            <button className="px-3 md:px-4 py-2 rounded-lg bg-surface-container text-on-surface font-medium text-sm hover:bg-surface-container-high transition-colors flex items-center gap-2 w-full md:w-auto justify-center md:justify-start">
              <MdFilterList size={16} className="md:w-5 md:h-5" />
              <span className="hidden sm:inline">Filter</span>
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className="text-center py-8">
            <p className="text-on-surface-variant">Loading inventory...</p>
          </div>
        ) : inventory.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-on-surface-variant">
              No inventory data available
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto -mx-4 md:mx-0">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b-2 border-surface-container-low text-on-surface-variant font-semibold text-xs md:text-sm">
                  <th className="py-2 md:py-4 px-2 md:px-4 font-medium">Jenis Konsol</th>
                  <th className="py-2 md:py-4 px-2 md:px-4 font-medium hidden md:table-cell">Serial Code</th>
                  <th className="py-2 md:py-4 px-2 md:px-4 font-medium">Status</th>
                  <th className="py-2 md:py-4 px-2 md:px-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {inventory.map((item) => (
                  <tr
                    key={item.id}
                    className="group hover:bg-surface-container-low/50 transition-colors border-b border-surface-container-low/50"
                  >
                    <td className="py-2 md:py-4 px-2 md:px-4">
                      <div className="flex flex-col">
                        <span className="font-semibold text-xs md:text-sm text-on-surface">
                          {item.catalogName}
                        </span>
                        <span className="text-xs md:hidden text-on-surface-variant">
                          {item.serialCode}
                        </span>
                      </div>
                    </td>
                    <td className="py-2 md:py-4 px-2 md:px-4 text-on-surface-variant hidden md:table-cell text-xs md:text-sm">
                      {item.serialCode}
                    </td>
                    <td className="py-2 md:py-4 px-2 md:px-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${
                          item.status === "AVAILABLE"
                            ? "bg-primary-container/20 text-primary"
                            : item.status === "MAINTENANCE"
                              ? "bg-warning/20 text-warning"
                              : "bg-error/20 text-error"
                        }`}
                      >
                        {item.status === "AVAILABLE" && "✓ Tersedia"}
                        {item.status === "MAINTENANCE" && "🔧 Maintenance"}
                        {item.status === "BROKEN" && "✕ Rusak"}
                      </span>
                    </td>
                    <td className="py-2 md:py-4 px-2 md:px-4 text-right">
                      <div className="flex justify-end gap-1">
                        <button
                          onClick={() => {
                            setSelectedInventory(item);
                            setShowStatusModal(true);
                          }}
                          className="p-1.5 md:p-2 rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors"
                          title={`Update status - ${item.serialCode}`}
                          disabled={isSubmitting}
                        >
                          <MdEdit size={14} className="md:w-4 md:h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteUnit(item.id)}
                          className="p-1.5 md:p-2 rounded-lg text-on-surface-variant hover:text-error hover:bg-error/10 transition-colors"
                          title={`Delete - ${item.serialCode}`}
                          disabled={isSubmitting}
                        >
                          <MdDelete size={14} className="md:w-4 md:h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add Unit Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-3 md:p-4">
          <div className="bg-surface-container-lowest rounded-xl shadow-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 bg-surface-container-highest px-4 md:px-6 py-3 md:py-4 border-b border-surface-container-low flex justify-between items-center">
              <h2 className="text-headline-md font-bold text-on-surface">
                Tambah Unit Mesin
              </h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-on-surface-variant hover:text-on-surface"
                disabled={isSubmitting}
              >
                ✕
              </button>
            </div>

            {/* Content */}
            <div className="p-4 md:p-6 space-y-4">
              {showAddCatalogForm ? (
                <>
                  {/* Form Tambah Konsol Baru */}
                  <div>
                    <label className="block text-sm font-semibold text-on-surface mb-2">
                      Nama Konsol Baru *
                    </label>
                    <input
                      type="text"
                      value={newCatalogName}
                      onChange={(e) => setNewCatalogName(e.target.value)}
                      placeholder="e.g., PS5, Xbox Series X"
                      className="w-full px-4 py-2 border border-surface-container-high rounded-lg bg-surface-container text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:ring-2 focus:ring-primary"
                      disabled={isSubmitting}
                    />
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setShowAddCatalogForm(false);
                        setNewCatalogName("");
                      }}
                      className="flex-1 px-4 py-2 rounded-lg border border-surface-container-high text-on-surface hover:bg-surface-container transition-colors font-medium"
                      disabled={isSubmitting}
                    >
                      Kembali
                    </button>
                    <button
                      onClick={handleAddCatalog}
                      className="flex-1 px-4 py-2 rounded-lg bg-primary text-on-primary hover:bg-primary-container transition-colors font-medium disabled:opacity-50"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Menambahkan..." : "Tambah Konsol"}
                    </button>
                  </div>
                </>
              ) : (
                <>
                  {/* Select Console */}
                  <div>
                    <label className="block text-sm font-semibold text-on-surface mb-2">
                      Jenis Konsol *
                    </label>
                    <select
                      value={newUnit.catalogId}
                      onChange={(e) =>
                        setNewUnit({ ...newUnit, catalogId: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-surface-container-high rounded-lg bg-surface-container text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                      disabled={isSubmitting}
                    >
                      <option value="">Pilih Konsol...</option>
                      {catalogs.map((catalog) => (
                        <option key={catalog.id} value={catalog.id}>
                          {catalog.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Add New Catalog Button */}
                  <button
                    onClick={() => setShowAddCatalogForm(true)}
                    className="w-full px-4 py-2 rounded-lg border-2 border-dashed border-primary text-primary hover:bg-primary/10 transition-colors font-medium text-sm"
                    disabled={isSubmitting}
                  >
                    + Tambah Jenis Konsol Baru
                  </button>

                  {/* Serial Code */}
                  <div>
                    <label className="block text-sm font-semibold text-on-surface mb-2">
                      Serial Code / ID Mesin *
                    </label>
                    <input
                      type="text"
                      value={newUnit.serialCode}
                      onChange={(e) =>
                        setNewUnit({ ...newUnit, serialCode: e.target.value })
                      }
                      placeholder="e.g., PS5-001, XBOX-042"
                      className="w-full px-4 py-2 border border-surface-container-high rounded-lg bg-surface-container text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:ring-2 focus:ring-primary"
                      disabled={isSubmitting}
                    />
                  </div>

                  <p className="text-xs text-on-surface-variant">
                    Serial code harus unik untuk setiap mesin
                  </p>
                </>
              )}
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 bg-surface-container-highest px-4 md:px-6 py-3 md:py-4 border-t border-surface-container-low flex flex-col sm:flex-row gap-2 md:gap-3 justify-end">
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setShowAddCatalogForm(false);
                  setNewCatalogName("");
                }}
                className="px-3 md:px-4 py-2 rounded-lg border border-surface-container-high text-on-surface hover:bg-surface-container transition-colors font-medium text-sm md:text-base"
                disabled={isSubmitting}
              >
                Batal
              </button>
              {!showAddCatalogForm && (
                <button
                  onClick={handleAddUnit}
                  className="px-3 md:px-4 py-2 rounded-lg bg-primary text-on-primary hover:bg-primary-container transition-colors font-medium disabled:opacity-50 text-sm md:text-base"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Menambahkan..." : "Tambah Unit"}
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Update Status Modal */}
      {showStatusModal && selectedInventory && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-3 md:p-4">
          <div className="bg-surface-container-lowest rounded-xl shadow-lg max-w-md w-full">
            {/* Header */}
            <div className="bg-surface-container-highest px-4 md:px-6 py-3 md:py-4 border-b border-surface-container-low">
              <h2 className="text-headline-md font-bold text-on-surface">
                Ubah Status Mesin
              </h2>
              <p className="text-sm text-on-surface-variant mt-1">
                {selectedInventory.catalogName} - {selectedInventory.serialCode}
              </p>
            </div>

            {/* Content */}
            <div className="p-4 md:p-6 space-y-3">
              <p className="text-sm text-on-surface-variant mb-4">
                Status saat ini: <strong>{selectedInventory.status}</strong>
              </p>

              <div className="space-y-2">
                {["AVAILABLE", "MAINTENANCE", "BROKEN"].map((status) => (
                  <button
                    key={status}
                    onClick={() => handleUpdateStatus(status)}
                    className={`w-full px-4 py-3 rounded-lg border-2 font-medium transition-colors ${
                      selectedInventory.status === status
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-surface-container-high bg-surface-container text-on-surface hover:border-primary hover:bg-surface-container-high"
                    }`}
                    disabled={isSubmitting || selectedInventory.status === status}
                  >
                    {status === "AVAILABLE" && "✓ Tersedia"}
                    {status === "MAINTENANCE" && "🔧 Maintenance"}
                    {status === "BROKEN" && "✕ Rusak"}
                  </button>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="bg-surface-container-highest px-4 md:px-6 py-3 md:py-4 border-t border-surface-container-low flex justify-end">
              <button
                onClick={() => {
                  setShowStatusModal(false);
                  setSelectedInventory(null);
                }}
                className="px-3 md:px-4 py-2 rounded-lg border border-surface-container-high text-on-surface hover:bg-surface-container transition-colors font-medium text-sm md:text-base"
                disabled={isSubmitting}
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
