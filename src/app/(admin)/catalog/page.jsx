"use client";

import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";

import { useCatalogConfig } from "@/hooks/useCatalogConfig";
import { deletePricingTier } from "@/services/catalog";
import PageHeader from "@/app/(admin)/components/PageHeader";
import CatalogCard from "./components/CatalogCard";
import EditCatalogModal from "./components/EditCatalogModal";
import EditTierModal from "./components/EditTierModal";
import AddTierModal from "./components/AddTierModal";

export default function CatalogConfigPage() {
  const queryClient = useQueryClient();
  const { data: catalogs = [], isLoading } = useCatalogConfig();

  const [editCatalog, setEditCatalog] = useState(null);
  const [editTier, setEditTier] = useState(null);
  const [addTierCatalogId, setAddTierCatalogId] = useState(null);

  function handleSuccess() {
    queryClient.invalidateQueries({ queryKey: ["catalog-config"] });
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

      <div className="mt-6">
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
                onEditTier={setEditTier}
                onAddTier={setAddTierCatalogId}
                onDeleteTier={handleDeleteTier}
              />
            ))}
          </div>
        )}
      </div>

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
