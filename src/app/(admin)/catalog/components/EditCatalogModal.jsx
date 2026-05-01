"use client";

import { useState } from "react";
import Swal from "sweetalert2";
import { updateCatalog } from "@/services/catalog";

const INPUT_BASE =
  "w-full bg-surface-container px-4 py-3 rounded-xl text-surface-on placeholder:text-surface-on/40 focus:outline-none focus:ring-2 focus:ring-primary/50 border border-transparent focus:border-primary";
const INPUT_ERROR =
  "border-2 border-red-500 focus:border-red-500 focus:ring-red-500";

export default function EditCatalogModal({ catalog, onClose, onSuccess }) {
  const [name, setName] = useState(catalog.name ?? "");
  const [description, setDescription] = useState(catalog.description ?? "");
  const [nameError, setNameError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function validate() {
    if (!name.trim()) {
      setNameError("Nama katalog tidak boleh kosong");
      return false;
    }
    setNameError("");
    return true;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const result = await updateCatalog(catalog.id, {
        name: name.trim(),
        description: description.trim() || null,
      });

      if (result.success) {
        onSuccess();
        onClose();
      } else {
        Swal.fire({
          icon: "error",
          title: "Gagal menyimpan",
          text: result.message ?? "Terjadi kesalahan. Coba lagi.",
        });
      }
    } catch (error) {
      console.error("EditCatalogModal submit error:", error);
      Swal.fire({
        icon: "error",
        title: "Gagal menyimpan",
        text: "Terjadi kesalahan yang tidak terduga.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-surface-container-lowest rounded-2xl p-6 w-full max-w-md shadow-ambient-blue">
        <h2 className="text-lg font-bold text-surface-on mb-5">Edit Katalog</h2>

        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          {/* Name field */}
          <div>
            <label className="block text-sm font-semibold text-surface-on mb-1.5">
              Nama <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (nameError) setNameError("");
              }}
              placeholder="Nama katalog"
              disabled={isSubmitting}
              className={`${INPUT_BASE} ${nameError ? INPUT_ERROR : ""}`}
            />
            {nameError && (
              <p className="mt-1 text-xs text-red-500">{nameError}</p>
            )}
          </div>

          {/* Description field */}
          <div>
            <label className="block text-sm font-semibold text-surface-on mb-1.5">
              Deskripsi
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Deskripsi singkat (opsional)"
              rows={3}
              disabled={isSubmitting}
              className={`${INPUT_BASE} resize-none`}
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-1">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="flex-1 py-2 px-4 rounded-xl border border-outline-variant/50 text-surface-on font-semibold text-sm hover:bg-surface-container transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-secondary-container text-secondary-on-container py-2 px-4 rounded-xl font-bold text-sm hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Menyimpan..." : "Simpan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
