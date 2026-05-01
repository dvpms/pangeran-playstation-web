"use client";

import { useState } from "react";
import Swal from "sweetalert2";
import { MdCloudUpload, MdClose } from "react-icons/md";
import { createCatalog } from "@/services/catalog";
import { uploadCatalogImage } from "@/services/cloudinary";

const INPUT_BASE =
  "w-full bg-surface-container px-4 py-3 rounded-xl text-surface-on placeholder:text-surface-on/40 focus:outline-none focus:ring-2 focus:ring-primary/50 border border-transparent focus:border-primary";
const INPUT_ERROR =
  "border-2 border-red-500 focus:border-red-500 focus:ring-red-500";

const INITIAL_FORM = {
  name: "",
  type: "",
  description: "",
  tierLabel: "",
  tierDuration: "",
  tierPrice: "",
  tierOldPrice: "",
};

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/webp"];

export default function AddCatalogModal({ onClose, onSuccess }) {
  const [form, setForm] = useState(INITIAL_FORM);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  function setField(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  }

  function handleImageChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      setErrors((prev) => ({ ...prev, image: "Ukuran file maksimal 5MB" }));
      return;
    }

    // Validate MIME type
    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      setErrors((prev) => ({
        ...prev,
        image: "Format file harus JPEG, PNG, atau WebP",
      }));
      return;
    }

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
    setErrors((prev) => ({ ...prev, image: "" }));
  }

  function removeImage() {
    if (imagePreview) URL.revokeObjectURL(imagePreview);
    setImageFile(null);
    setImagePreview(null);
    setErrors((prev) => ({ ...prev, image: "" }));
  }

  function validate() {
    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Nama katalog tidak boleh kosong";
    }
    if (!form.type) {
      newErrors.type = "Tipe katalog harus dipilih";
    }
    if (!form.tierLabel.trim()) {
      newErrors.tierLabel = "Label paket tidak boleh kosong";
    }
    if (!form.tierDuration.trim()) {
      newErrors.tierDuration = "Durasi tidak boleh kosong";
    }

    const priceNum = Number(form.tierPrice);
    if (!form.tierPrice || isNaN(priceNum) || priceNum <= 0) {
      newErrors.tierPrice = "Harga harus berupa angka positif";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      let imageUrl = null;

      // Upload image if selected
      if (imageFile) {
        const formData = new FormData();
        formData.append("image", imageFile);

        const uploadResult = await uploadCatalogImage(formData);
        if (!uploadResult.success) {
          Swal.fire({
            icon: "error",
            title: "Gagal mengupload gambar",
            text: uploadResult.message ?? "Terjadi kesalahan saat upload.",
          });
          setIsSubmitting(false);
          return;
        }
        imageUrl = uploadResult.url;
      }

      // Create catalog with first tier
      const result = await createCatalog({
        name: form.name.trim(),
        type: form.type,
        description: form.description.trim() || null,
        imageUrl,
        tier: {
          label: form.tierLabel.trim(),
          duration: form.tierDuration.trim(),
          price: Number(form.tierPrice),
          oldPrice:
            form.tierOldPrice.trim() !== "" ? Number(form.tierOldPrice) : null,
        },
      });

      if (result.success) {
        Swal.fire({
          icon: "success",
          title: "Katalog berhasil ditambahkan",
          timer: 1500,
          showConfirmButton: false,
        });
        onSuccess();
        onClose();
      } else {
        Swal.fire({
          icon: "error",
          title: "Gagal menambahkan katalog",
          text: result.message ?? "Terjadi kesalahan. Coba lagi.",
        });
      }
    } catch (error) {
      console.error("AddCatalogModal submit error:", error);
      Swal.fire({
        icon: "error",
        title: "Gagal menambahkan katalog",
        text: "Terjadi kesalahan yang tidak terduga.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-surface-container-lowest rounded-2xl p-6 w-full max-w-2xl shadow-ambient-blue my-8">
        <h2 className="text-lg font-bold text-surface-on mb-5">
          Tambah Katalog Baru
        </h2>

        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          {/* Name field */}
          <div>
            <label className="block text-sm font-semibold text-surface-on mb-1.5">
              Nama Katalog <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setField("name", e.target.value)}
              placeholder="Contoh: PS5 Pro"
              disabled={isSubmitting}
              className={`${INPUT_BASE} ${errors.name ? INPUT_ERROR : ""}`}
            />
            {errors.name && (
              <p className="mt-1 text-xs text-red-500">{errors.name}</p>
            )}
          </div>

          {/* Type field */}
          <div>
            <label className="block text-sm font-semibold text-surface-on mb-1.5">
              Tipe <span className="text-red-500">*</span>
            </label>
            <select
              value={form.type}
              onChange={(e) => setField("type", e.target.value)}
              disabled={isSubmitting}
              className={`${INPUT_BASE} ${errors.type ? INPUT_ERROR : ""}`}
            >
              <option value="">Pilih tipe katalog</option>
              <option value="CONSOLE">CONSOLE</option>
              <option value="ADDON">ADDON</option>
            </select>
            {errors.type && (
              <p className="mt-1 text-xs text-red-500">{errors.type}</p>
            )}
          </div>

          {/* Description field */}
          <div>
            <label className="block text-sm font-semibold text-surface-on mb-1.5">
              Deskripsi{" "}
              <span className="text-surface-on/40 font-normal">(opsional)</span>
            </label>
            <textarea
              value={form.description}
              onChange={(e) => setField("description", e.target.value)}
              placeholder="Deskripsi singkat"
              rows={2}
              disabled={isSubmitting}
              className={`${INPUT_BASE} resize-none`}
            />
          </div>

          {/* Image upload */}
          <div>
            <label className="block text-sm font-semibold text-surface-on mb-1.5">
              Gambar Katalog{" "}
              <span className="text-surface-on/40 font-normal">(opsional)</span>
            </label>

            {!imagePreview ? (
              <label
                className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-xl cursor-pointer transition-colors ${
                  errors.image
                    ? "border-red-500 bg-red-50"
                    : "border-outline-variant/40 hover:border-primary/50 bg-surface-container/30"
                } ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                <MdCloudUpload className="w-8 h-8 text-surface-on/40 mb-2" />
                <p className="text-sm text-surface-on/60">
                  Klik untuk upload gambar
                </p>
                <p className="text-xs text-surface-on/40 mt-1">
                  JPEG, PNG, WebP (maks 5MB)
                </p>
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleImageChange}
                  disabled={isSubmitting}
                  className="hidden"
                />
              </label>
            ) : (
              <div className="relative w-full h-48 rounded-xl overflow-hidden border-2 border-primary/30">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  disabled={isSubmitting}
                  className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors disabled:opacity-50"
                >
                  <MdClose className="w-4 h-4" />
                </button>
              </div>
            )}

            {errors.image && (
              <p className="mt-1 text-xs text-red-500">{errors.image}</p>
            )}
          </div>

          {/* Divider */}
          <div className="border-t border-outline-variant/20 pt-4">
            <h3 className="text-sm font-bold text-surface-on mb-3">
              Paket Harga Pertama
            </h3>
          </div>

          {/* Tier fields in grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Tier Label */}
            <div>
              <label className="block text-sm font-semibold text-surface-on mb-1.5">
                Label Paket <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={form.tierLabel}
                onChange={(e) => setField("tierLabel", e.target.value)}
                placeholder="Contoh: Paket Harian"
                disabled={isSubmitting}
                className={`${INPUT_BASE} ${
                  errors.tierLabel ? INPUT_ERROR : ""
                }`}
              />
              {errors.tierLabel && (
                <p className="mt-1 text-xs text-red-500">{errors.tierLabel}</p>
              )}
            </div>

            {/* Tier Duration */}
            <div>
              <label className="block text-sm font-semibold text-surface-on mb-1.5">
                Durasi <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={form.tierDuration}
                onChange={(e) => setField("tierDuration", e.target.value)}
                placeholder="Contoh: 1 Hari"
                disabled={isSubmitting}
                className={`${INPUT_BASE} ${
                  errors.tierDuration ? INPUT_ERROR : ""
                }`}
              />
              {errors.tierDuration && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.tierDuration}
                </p>
              )}
            </div>

            {/* Tier Price */}
            <div>
              <label className="block text-sm font-semibold text-surface-on mb-1.5">
                Harga <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                value={form.tierPrice}
                onChange={(e) => setField("tierPrice", e.target.value)}
                placeholder="Contoh: 50000"
                min={1}
                disabled={isSubmitting}
                className={`${INPUT_BASE} ${
                  errors.tierPrice ? INPUT_ERROR : ""
                }`}
              />
              {errors.tierPrice && (
                <p className="mt-1 text-xs text-red-500">{errors.tierPrice}</p>
              )}
            </div>

            {/* Tier Old Price */}
            <div>
              <label className="block text-sm font-semibold text-surface-on mb-1.5">
                Harga Coret{" "}
                <span className="text-surface-on/40 font-normal">
                  (opsional)
                </span>
              </label>
              <input
                type="number"
                value={form.tierOldPrice}
                onChange={(e) => setField("tierOldPrice", e.target.value)}
                placeholder="Kosongkan jika tidak ada"
                min={1}
                disabled={isSubmitting}
                className={INPUT_BASE}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="flex-1 py-3 px-4 rounded-xl border border-outline-variant/50 text-surface-on font-semibold text-sm hover:bg-surface-container transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-secondary-container text-secondary-on-container py-3 px-4 rounded-xl font-bold text-sm hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isSubmitting ? "Menyimpan..." : "Tambah Katalog"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
