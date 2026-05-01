"use client";

import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { MdAddCircle } from "react-icons/md";

import { useCatalogConfig } from "@/hooks/useCatalogConfig";
import { deletePricingTier, deleteCatalog } from "@/services/catalog";
import { deleteCloudinaryImage } from "@/services/cloudinary";
import PageHeader from "@/app/(admin)/components/PageHeader";
import CatalogCard from "./components/CatalogCard";
import EditCatalogModal from "./components/EditCatalogModal";
import EditTierModal from "./components/EditTierModal";
import AddTierModal from "./components/AddTierModal";
import AddCatalogModal from "./components/AddCatalogModal";

export default function CatalogConfigPage() {
  const queryClient = useQueryClient();
  const { data: catalogs = [], isLoading } = useCatalogConfig();

  const [editCatalog, setEditCatalog] = useState(null);
  const [editTier, setEditTier] = useState(null);
  const [addTierCatalogId, setAddTierCatalogId] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  function handleSuccess() {
    queryClient.invalidateQueries({ queryKey: ["catalog-config"] });
  }

  async function handleDeleteCatalog(catalog) {
    const confirm = await Swal.fire({
      title: "Hapus katalog ini?",
      html: `Katalog <strong>${catalog.name}</strong> beserta semua paket harga dan gambarnya akan dihapus permanen.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, hapus",
      cancelButtonText: "Batal",
      confirmButtonColor: "#d33",
    });

    if (!confirm.isConfirmed) return;

    const result = await deleteCatalog(catalog.id);
    if (!result.success) {
      Swal.fire({ icon: "error", title: "Gagal menghapus", text: result.message });
      return;
    }

    // Delete image from Cloudinary after DB record is removed
    if (catalog.imageUrl) {
      await deleteCloudinaryImage(catalog.imageUrl);
    }

    Swal.fire({ icon: "success", title: "Katalog berhasil dihapus", timer: 1500, showConfirmButton: false });
    handleSuccess();
  }

  async function handleDeleteTier(tier) {
    const confirm = await Swal.fire({
      title: "Hapus paket ini?",
      text: `Paket "${tier.label}" akan dihapus permanen.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, hapus",
      cancelButtonText: "Batal",
      confirmButtonColor: "#d33",
    });

    if (!confirm.isConfirmed) return;

    const result = await deletePricingTier(tier.id);
    if (result.success) {
      Swal.fire({ icon: "success", title: "Paket berhasil dihapus", timer: 1500, showConfirmButton: false });
      handleSuccess();
    } else {
      Swal.fire({ icon: "error", title: "Gagal menghapus", text: result.message });
    }
  }

  return (
    <>
      <PageHeader
        title="Catalog & Harga"
        subtitle="Kelola nama, deskripsi, dan paket harga untuk setiap unit rental."
      />

      {/* Add Catalog Button */}
      <div className="mt-6 flex justify-end">
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-secondary-container text-secondary-on-container py-3 px-5 rounded-xl font-bold text-sm hover:scale-[1.02] active:scale-95 transition-all shadow-lg"
        >
          <MdAddCircle className="w-5 h-5" />
          Tambah Katalog
        </button>
      </div>

      <div className="mt-4">
        {isLoading ? (
          <div className="bg-surface-container-lowest rounded-xl p-8 text-center">
            <p className="text-surface-on/50">Memuat data katalog...</p>
          </div>
        ) : catalogs.length === 0 ? (
          <div className="bg-surface-container-lowest rounded-xl p-8 text-center">
            <p className="text-surface-on/50">Belum ada katalog tersedia.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {catalogs.map((catalog) => (
              <CatalogCard
                key={catalog.id}
                catalog={catalog}
                onEditCatalog={setEditCatalog}
                onDeleteCatalog={handleDeleteCatalog}
                onEditTier={setEditTier}
                onAddTier={setAddTierCatalogId}
                onDeleteTier={handleDeleteTier}
              />
            ))}
          </div>
        )}
      </div>

      {showAddModal && (
        <AddCatalogModal
          onClose={() => setShowAddModal(false)}
          onSuccess={() => { handleSuccess(); setShowAddModal(false); }}
        />
      )}

      {editCatalog && (
        <EditCatalogModal
          catalog={editCatalog}
          onClose={() => setEditCatalog(null)}
          onSuccess={() => { handleSuccess(); setEditCatalog(null); }}
        />
      )}

      {editTier && (
        <EditTierModal
          tier={editTier}
          onClose={() => setEditTier(null)}
          onSuccess={() => { handleSuccess(); setEditTier(null); }}
        />
      )}

      {addTierCatalogId && (
        <AddTierModal
          catalogId={addTierCatalogId}
          onClose={() => setAddTierCatalogId(null)}
          onSuccess={() => { handleSuccess(); setAddTierCatalogId(null); }}
        />
      )}
    </>
  );
}
