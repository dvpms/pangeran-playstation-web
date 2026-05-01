"use client";

import { useState } from "react";
import Swal from "sweetalert2";
import { createPricingTier } from "@/services/catalog";

const INPUT_BASE =
  "w-full bg-surface-container px-4 py-3 rounded-xl text-surface-on placeholder:text-surface-on/40 focus:outline-none focus:ring-2 focus:ring-primary/50 border border-transparent focus:border-primary";
const INPUT_ERROR =
  "border-2 border-red-500 focus:border-red-500 focus:ring-red-500";

const INITIAL_FORM = { label: "", duration: "", price: "", oldPrice: "" };

export default function AddTierModal({ catalogId, onClose, onSuccess }) {
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  function setField(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  }

  function validate() {
    const newErrors = {};
    if (!form.label.trim()) {
      newErrors.label = "Label paket tidak boleh kosong";
    }
    if (!form.duration.trim()) {
      newErrors.duration = "Durasi tidak boleh kosong";
    }
    const priceNum = Number(form.price);
    if (!form.price || isNaN(priceNum) || priceNum <= 0) {
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
      const result = await createPricingTier(catalogId, {
        label: form.label.trim(),
        duration: form.duration.trim(),
        price: Number(form.price),
        oldPrice: form.oldPrice.trim() !== "" ? Number(form.oldPrice) : null,
      });

      if (result.success) {
        onSuccess();
        onClose();
      } else {
        Swal.fire({
          icon: "error",
          title: "Gagal menambahkan paket",
          text: result.message ?? "Terjadi kesalahan. Coba lagi.",
        });
      }
    } catch (error) {
      console.error("AddTierModal submit error:", error);
      Swal.fire({
        icon: "error",
        title: "Gagal menambahkan paket",
        text: "Terjadi kesalahan yang tidak terduga.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-surface-container-lowest rounded-2xl p-6 w-full max-w-md shadow-ambient-blue">
        <h2 className="text-lg font-bold text-surface-on mb-5">Tambah Paket Harga</h2>

        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          {/* Label field */}
          <div>
            <label className="block text-sm font-semibold text-surface-on mb-1.5">
              Label <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={form.label}
              onChange={(e) => setField("label", e.target.value)}
              placeholder="Contoh: Paket Harian"
              disabled={isSubmitting}
              className={`${INPUT_BASE} ${errors.label ? INPUT_ERROR : ""}`}
            />
            {errors.label && (
              <p className="mt-1 text-xs text-red-500">{errors.label}</p>
            )}
          </div>

          {/* Duration field */}
          <div>
            <label className="block text-sm font-semibold text-surface-on mb-1.5">
              Durasi <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={form.duration}
              onChange={(e) => setField("duration", e.target.value)}
              placeholder="Contoh: 1 Hari, 3 Hari"
              disabled={isSubmitting}
              className={`${INPUT_BASE} ${errors.duration ? INPUT_ERROR : ""}`}
            />
            {errors.duration && (
              <p className="mt-1 text-xs text-red-500">{errors.duration}</p>
            )}
          </div>

          {/* Price field */}
          <div>
            <label className="block text-sm font-semibold text-surface-on mb-1.5">
              Harga <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              value={form.price}
              onChange={(e) => setField("price", e.target.value)}
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
              value={form.oldPrice}
              onChange={(e) => setField("oldPrice", e.target.value)}
              placeholder="Kosongkan jika tidak ada harga coret"
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
              {isSubmitting ? "Menambahkan..." : "Tambah"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
