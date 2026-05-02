"use client";

import Image from "next/image";
import { MdEdit, MdDelete } from "react-icons/md";

export default function GameCatalogCard({ game, onEdit, onDelete }) {
  const { title, imageUrl } = game;

  return (
    <div className="bg-surface-container-lowest rounded-2xl p-4 shadow-ambient-blue border border-outline-variant/20 flex items-center gap-4">
      <div className="relative w-20 h-20 rounded-xl overflow-hidden border border-outline-variant/20 shrink-0">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover"
          sizes="80px"
        />
      </div>

      <p className="flex-1 font-semibold text-surface-on truncate">{title}</p>

      <div className="flex gap-2 shrink-0">
        <button
          onClick={() => onEdit(game)}
          className="flex items-center gap-1.5 bg-secondary-container text-secondary-on-container py-2 px-3 rounded-xl font-bold text-sm hover:scale-[1.02] active:scale-95 transition-all"
        >
          <MdEdit className="w-4 h-4" />
          Edit
        </button>
        <button
          onClick={() => onDelete(game)}
          className="flex items-center gap-1.5 bg-red-50 text-red-600 py-2 px-3 rounded-xl font-bold text-sm hover:bg-red-100 hover:scale-[1.02] active:scale-95 transition-all"
        >
          <MdDelete className="w-4 h-4" />
          Hapus
        </button>
      </div>
    </div>
  );
}
