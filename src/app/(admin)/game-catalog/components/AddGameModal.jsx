"use client";

import { useState } from "react";
import Swal from "sweetalert2";
import { MdCloudUpload, MdClose } from "react-icons/md";
import { createGame } from "@/services/gameCatalog";
import { uploadGameCatalogImage } from "@/services/cloudinary";

const INPUT_BASE =
  "w-full bg-surface-container px-4 py-3 rounded-xl text-surface-on placeholder:text-surface-on/40 focus:outline-none focus:ring-2 focus:ring-primary/50 border border-transparent focus:border-primary";
const INPUT_ERROR =
  "border-2 border-red-500 focus:border-red-500 focus:ring-red-500";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/webp"];

export default function AddGameModal({ onClose, onSuccess }) {
  const [title, setTitle] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleImageChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > MAX_FILE_SIZE) {
      setErrors((prev) => ({ ...prev, image: "Ukuran file maksimal 5MB" }));
      return;
    }

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

    if (!title.trim()) {
      newErrors.title = "Judul game tidak boleh kosong";
    }
    if (!imageFile) {
      newErrors.image = "Gambar cover wajib diupload";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("image", imageFile);

      const uploadResult = await uploadGameCatalogImage(formData);
      if (!uploadResult.success) {
        Swal.fire({
          icon: "error",
          title: "Gagal mengupload gambar",
          text: uploadResult.message ?? "Terjadi kesalahan saat upload.",
        });
        setIsSubmitting(false);
        return;
      }

      const result = await createGame({
        title: title.trim(),
        imageUrl: uploadResult.url,
      });

      if (result.success) {
        Swal.fire({
          icon: "success",
          title: "Game berhasil ditambahkan",
          timer: 1500,
          showConfirmButton: false,
        });
        onSuccess();
        onClose();
      } else {
        Swal.fire({
          icon: "error",
          title: "Gagal menambahkan game",
          text: result.message ?? "Terjadi kesalahan. Coba lagi.",
        });
      }
    } catch (error) {
      console.error("AddGameModal submit error:", error);
      Swal.fire({
        icon: "error",
        title: "Gagal menambahkan game",
        text: "Terjadi kesalahan yang tidak terduga.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-surface-container-lowest rounded-2xl p-6 w-full max-w-md shadow-ambient-blue my-8">
        <h2 className="text-lg font-bold text-surface-on mb-5">
          Tambah Game Baru
        </h2>

        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-surface-on mb-1.5">
              Judul Game <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (errors.title) setErrors((prev) => ({ ...prev, title: "" }));
              }}
              placeholder="Contoh: God of War Ragnarok"
              disabled={isSubmitting}
              className={`${INPUT_BASE} ${errors.title ? INPUT_ERROR : ""}`}
            />
            {errors.title && (
              <p className="mt-1 text-xs text-red-500">{errors.title}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-surface-on mb-1.5">
              Gambar Cover <span className="text-red-500">*</span>
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
              {isSubmitting ? "Menyimpan..." : "Tambah Game"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
