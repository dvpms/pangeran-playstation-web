"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Swal from "sweetalert2";
import { MdUpload, MdClose } from "react-icons/md";
import { updateCatalogWithImage } from "@/services/catalog";
import { uploadCatalogImage, deleteCloudinaryImage } from "@/services/cloudinary";

const INPUT_BASE =
  "w-full bg-surface-container px-4 py-3 rounded-xl text-surface-on placeholder:text-surface-on/40 focus:outline-none focus:ring-2 focus:ring-primary/50 border border-transparent focus:border-primary";
const INPUT_ERROR =
  "border-2 border-red-500 focus:border-red-500 focus:ring-red-500";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/webp"];

export default function EditCatalogModal({ catalog, onClose, onSuccess }) {
  const [name, setName] = useState(catalog.name ?? "");
  const [description, setDescription] = useState(catalog.description ?? "");
  const [nameError, setNameError] = useState("");

  // Image state: null = removed, string = existing/new URL, File = pending upload
  const [currentImageUrl, setCurrentImageUrl] = useState(catalog.imageUrl ?? null);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(catalog.imageUrl ?? null);
  const [imageError, setImageError] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef(null);

  function handleFileChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      setImageError("Format file harus JPEG, PNG, atau WebP");
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      setImageError("Ukuran file maksimal 5MB");
      return;
    }

    setImageError("");
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  }

  function handleRemoveImage() {
    setImageFile(null);
    setImagePreview(null);
    setCurrentImageUrl(null);
    setImageError("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

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
      let finalImageUrl = currentImageUrl;

      // If a new file is selected, upload it first
      if (imageFile) {
        // Delete old image from Cloudinary if it exists
        if (catalog.imageUrl) {
          await deleteCloudinaryImage(catalog.imageUrl);
        }

        const uploadForm = new FormData();
        uploadForm.append("image", imageFile);
        const uploadResult = await uploadCatalogImage(uploadForm);

        if (!uploadResult.success) {
          Swal.fire({ icon: "error", title: "Gagal upload gambar", text: uploadResult.message });
          return;
        }
        finalImageUrl = uploadResult.url;
      } else if (currentImageUrl === null && catalog.imageUrl) {
        // Image was explicitly removed — delete from Cloudinary
        await deleteCloudinaryImage(catalog.imageUrl);
      }

      const result = await updateCatalogWithImage(catalog.id, {
        name: name.trim(),
        description: description.trim() || null,
        imageUrl: finalImageUrl,
      });

      if (result.success) {
        onSuccess();
        onClose();
      } else {
        Swal.fire({ icon: "error", title: "Gagal menyimpan", text: result.message ?? "Terjadi kesalahan. Coba lagi." });
      }
    } catch (error) {
      console.error("EditCatalogModal submit error:", error);
      Swal.fire({ icon: "error", title: "Gagal menyimpan", text: "Terjadi kesalahan yang tidak terduga." });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-surface-container-lowest rounded-2xl p-6 w-full max-w-md shadow-ambient-blue max-h-[90vh] overflow-y-auto">
        <h2 className="text-lg font-bold text-surface-on mb-5">Edit Katalog</h2>

        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-semibold text-surface-on mb-1.5">
              Nama <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => { setName(e.target.value); if (nameError) setNameError(""); }}
              placeholder="Nama katalog"
              disabled={isSubmitting}
              className={`${INPUT_BASE} ${nameError ? INPUT_ERROR : ""}`}
            />
            {nameError && <p className="mt-1 text-xs text-red-500">{nameError}</p>}
          </div>

          {/* Description */}
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

          {/* Image */}
          <div>
            <label className="block text-sm font-semibold text-surface-on mb-1.5">
              Gambar
            </label>

            {imagePreview ? (
              <div className="relative w-full h-48 rounded-xl overflow-hidden border border-outline-variant/20 group">
                <Image src={imagePreview} alt="Preview" fill className="object-cover" sizes="448px" />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  disabled={isSubmitting}
                  className="absolute top-2 right-2 bg-black/60 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                  title="Hapus gambar"
                >
                  <MdClose className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isSubmitting}
                className="w-full h-32 rounded-xl border-2 border-dashed border-outline-variant/40 flex flex-col items-center justify-center gap-2 text-surface-on/50 hover:border-primary/50 hover:text-primary transition-all"
              >
                <MdUpload className="w-6 h-6" />
                <span className="text-sm">Klik untuk upload gambar</span>
                <span className="text-xs">JPEG, PNG, WebP — maks 5MB</span>
              </button>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleFileChange}
              className="hidden"
            />
            {imageError && <p className="mt-1 text-xs text-red-500">{imageError}</p>}
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
              className="flex-1 bg-secondary-container text-secondary-on-container py-2 px-4 rounded-xl font-bold text-sm hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isSubmitting ? "Menyimpan..." : "Simpan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
