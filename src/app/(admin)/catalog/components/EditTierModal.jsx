"use client";

import { useState } from "react";
import Swal from "sweetalert2";
import { updatePricingTier } from "@/services/catalog";

const INPUT_BASE =
  "w-full bg-surface-container px-4 py-3 rounded-xl text-surface-on placeholder:text-surface-on/40 focus:outline-none focus:ring-2 focus:ring-primary/50 border border-transparent focus:border-primary";
const INPUT_ERROR =
  "border-2 border-red-500 focus:border-red-500 focus:ring-red-500";

export default function EditTierModal({ tier, onClose, onSuccess }) {
  const [label, setLabel] = useState(tier.label ?? "");
  const [price, setPrice] = useState(tier.price != null ? String(tier.price) : "");
  const [oldPrice, setOldPrice] = useState(
    tier.oldPrice != null ? String(tier.oldPrice) : ""
  );
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  function validate() {
    const newErrors = {};
    if (!label.trim()) {
      newErrors.label = "Label paket tidak boleh kosong";
    }
    const priceNum = Number(price);
    if (!price || isNaN(priceNum) || priceNum <= 0) {
      newErrors.price = "Harga harus berupa angka positif";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const result = await updatePricingTier(tier.id, {
        label: label.trim(),
        price: Number(price),
        oldPrice: oldPrice.trim() !== "" ? Number(oldPrice) : null,
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
      console.error("EditTierModal submit error:", error);
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
        <h2 className="text-lg font-bold text-surface-on mb-5">Edit Paket Harga</h2>

        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          {/* Label field */}
          <div>
            <label className="block text-sm font-semibold text-surface-on mb-1.5">
              Label <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={label}
              onChange={(e) => {
                setLabel(e.target.value);
                if (errors.label) setErrors((prev) => ({ ...prev, label: "" }));
              }}
              placeholder="Contoh: Paket Harian"
              disabled={isSubmitting}
              className={`${INPUT_BASE} ${errors.label ? INPUT_ERROR : ""}`}
            />
            {errors.label && (
              <p className="mt-1 text-xs text-red-500">{errors.label}</p>
            )}
          </div>

          {/* Duration — read-only */}
          <div>
            <label className="block text-sm font-semibold text-surface-on mb-1.5">
              Durasi
            </label>
            <div className="w-full bg-surface-container/50 px-4 py-3 rounded-xl text-surface-on/60 border border-outline-variant/30 text-sm">
              {tier.duration}
            </div>
            <p className="mt-1 text-xs text-surface-on/40">
              Durasi tidak dapat diubah setelah dibuat.
            </p>
          </div>

          {/* Price field */}
          <div>
            <label className="block text-sm font-semibold text-surface-on mb-1.5">
              Harga <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              value={price}
              onChange={(e) => {
                setPrice(e.target.value);
                if (errors.price) setErrors((prev) => ({ ...prev, price: "" }));
              }}
              placeholder="Contoh: 50000"
              min={1}
              disabled={isSubmitting}
              className={`${INPUT_BASE} ${errors.price ? INPUT_ERROR : ""}`}
            />
            {errors.price && (
              <p className="mt-1 text-xs text-red-500">{errors.price}</p>
            )}
          </div>

          {/* Old Price field */}
          <div>
            <label className="block text-sm font-semibold text-surface-on mb-1.5">
              Harga Coret{" "}
              <span className="text-surface-on/40 font-normal">(opsional)</span>
            </label>
            <input
              type="number"
              value={oldPrice}
              onChange={(e) => setOldPrice(e.target.value)}
              placeholder="Kosongkan untuk menghapus harga coret"
              min={1}
              disabled={isSubmitting}
              className={INPUT_BASE}
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
