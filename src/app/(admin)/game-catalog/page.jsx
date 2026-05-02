"use client";

import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { MdAddCircle } from "react-icons/md";

import { useGameCatalog } from "@/hooks/useGameCatalog";
import { deleteGame } from "@/services/gameCatalog";
import { deleteCloudinaryImage } from "@/services/cloudinary";
import PageHeader from "@/app/(admin)/components/PageHeader";
import GameCatalogCard from "./components/GameCatalogCard";
import AddGameModal from "./components/AddGameModal";
import EditGameModal from "./components/EditGameModal";

export default function GameCatalogPage() {
  const queryClient = useQueryClient();
  const { data: games = [], isLoading } = useGameCatalog();

  const [showAddModal, setShowAddModal] = useState(false);
  const [editGame, setEditGame] = useState(null);

  function handleSuccess() {
    queryClient.invalidateQueries({ queryKey: ["game-catalog"] });
  }

  async function handleDelete(game) {
    const confirm = await Swal.fire({
      title: "Hapus game ini?",
      html: `Game <strong>${game.title}</strong> beserta gambarnya akan dihapus permanen.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, hapus",
      cancelButtonText: "Batal",
      confirmButtonColor: "#d33",
    });

    if (!confirm.isConfirmed) return;

    const result = await deleteGame(game.id);
    if (!result.success) {
      Swal.fire({ icon: "error", title: "Gagal menghapus", text: result.message });
      return;
    }

    if (game.imageUrl) {
      await deleteCloudinaryImage(game.imageUrl);
    }

    Swal.fire({ icon: "success", title: "Game berhasil dihapus", timer: 1500, showConfirmButton: false });
    handleSuccess();
  }

  return (
    <>
      <PageHeader
        title="Game Catalog"
        subtitle="Kelola daftar game yang ditampilkan di landing page."
      />

      <div className="mt-6 flex justify-end">
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-secondary-container text-secondary-on-container py-3 px-5 rounded-xl font-bold text-sm hover:scale-[1.02] active:scale-95 transition-all shadow-lg"
        >
          <MdAddCircle className="w-5 h-5" />
          Tambah Game
        </button>
      </div>

      <div className="mt-4">
        {isLoading ? (
          <div className="bg-surface-container-lowest rounded-xl p-8 text-center">
            <p className="text-surface-on/50">Memuat data game...</p>
          </div>
        ) : games.length === 0 ? (
          <div className="bg-surface-container-lowest rounded-xl p-8 text-center">
            <p className="text-surface-on/50">Belum ada game dalam katalog.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {games.map((game) => (
              <GameCatalogCard
                key={game.id}
                game={game}
                onEdit={setEditGame}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>

      {showAddModal && (
        <AddGameModal
          onClose={() => setShowAddModal(false)}
          onSuccess={() => { handleSuccess(); setShowAddModal(false); }}
        />
      )}

      {editGame && (
        <EditGameModal
          game={editGame}
          onClose={() => setEditGame(null)}
          onSuccess={() => { handleSuccess(); setEditGame(null); }}
        />
      )}
    </>
  );
}
