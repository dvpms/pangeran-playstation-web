"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/webp"];

export async function uploadCatalogImage(formData) {
  try {
    // Auth check
    const session = await getServerSession(authOptions);
    if (!session) {
      return { success: false, message: "Unauthorized" };
    }

    // Extract file from FormData
    const file = formData.get("image");
    if (!file || !(file instanceof File)) {
      return { success: false, message: "File tidak ditemukan" };
    }

    // Validate MIME type
    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      return {
        success: false,
        message: "Format file harus JPEG, PNG, atau WebP",
      };
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return { success: false, message: "Ukuran file maksimal 5MB" };
    }

    // Upload via Cloudinary Upload API
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    // Build signed upload params
    const timestamp = Math.floor(Date.now() / 1000);
    const folder = "catalog";

    // Generate SHA-1 signature — params must be sorted alphabetically before signing
    const crypto = await import("crypto");
    const paramsToSign = { folder, timestamp };
    const signatureString =
      Object.keys(paramsToSign)
        .sort()
        .map((k) => `${k}=${paramsToSign[k]}`)
        .join("&") + apiSecret;
    const signature = crypto
      .createHash("sha1")
      .update(signatureString)
      .digest("hex");

    // Build multipart form for Cloudinary
    const uploadForm = new FormData();
    uploadForm.append("file", file);
    uploadForm.append("api_key", apiKey);
    uploadForm.append("timestamp", timestamp);
    uploadForm.append("signature", signature);
    uploadForm.append("folder", folder);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      { method: "POST", body: uploadForm }
    );

    if (!response.ok) {
      const err = await response.json();
      console.error("Cloudinary upload error:", err);
      return { success: false, message: "Gagal mengupload gambar ke Cloudinary" };
    }

    const data = await response.json();
    return { success: true, url: data.secure_url };
  } catch (error) {
    console.error("Gagal mengupload gambar ke Cloudinary:", error);
    return { success: false, message: "Gagal mengupload gambar" };
  }
}

export async function deleteCloudinaryImage(imageUrl) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return { success: false, message: "Unauthorized" };

    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    // Extract public_id from URL: everything after /upload/ without file extension
    // e.g. https://res.cloudinary.com/<cloud>/image/upload/catalog/abc123.jpg → catalog/abc123
    const match = imageUrl.match(/\/upload\/(?:v\d+\/)?(.+)\.[^.]+$/);
    if (!match) return { success: false, message: "URL gambar tidak valid" };
    const publicId = match[1];

    const timestamp = Math.floor(Date.now() / 1000);
    const crypto = await import("crypto");
    const paramsToSign = { public_id: publicId, timestamp };
    const signatureString =
      Object.keys(paramsToSign)
        .sort()
        .map((k) => `${k}=${paramsToSign[k]}`)
        .join("&") + apiSecret;
    const signature = crypto
      .createHash("sha1")
      .update(signatureString)
      .digest("hex");

    const destroyForm = new FormData();
    destroyForm.append("public_id", publicId);
    destroyForm.append("api_key", apiKey);
    destroyForm.append("timestamp", timestamp);
    destroyForm.append("signature", signature);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`,
      { method: "POST", body: destroyForm }
    );

    if (!response.ok) {
      const err = await response.json();
      console.error("Cloudinary delete error:", err);
      return { success: false, message: "Gagal menghapus gambar dari Cloudinary" };
    }

    return { success: true };
  } catch (error) {
    console.error("Gagal menghapus gambar dari Cloudinary:", error);
    return { success: false, message: "Gagal menghapus gambar" };
  }
}

export async function uploadGameCatalogImage(formData) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return { success: false, message: "Unauthorized" };
    }

    const file = formData.get("image");
    if (!file || !(file instanceof File)) {
      return { success: false, message: "File tidak ditemukan" };
    }

    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      return { success: false, message: "Format file harus JPEG, PNG, atau WebP" };
    }

    if (file.size > MAX_FILE_SIZE) {
      return { success: false, message: "Ukuran file maksimal 5MB" };
    }

    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    const timestamp = Math.floor(Date.now() / 1000);
    const folder = "game catalog";

    const crypto = await import("crypto");
    const paramsToSign = { folder, timestamp };
    const signatureString =
      Object.keys(paramsToSign)
        .sort()
        .map((k) => `${k}=${paramsToSign[k]}`)
        .join("&") + apiSecret;
    const signature = crypto
      .createHash("sha1")
      .update(signatureString)
      .digest("hex");

    const uploadForm = new FormData();
    uploadForm.append("file", file);
    uploadForm.append("api_key", apiKey);
    uploadForm.append("timestamp", timestamp);
    uploadForm.append("signature", signature);
    uploadForm.append("folder", folder);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      { method: "POST", body: uploadForm }
    );

    if (!response.ok) {
      const err = await response.json();
      console.error("Cloudinary upload error (game catalog):", err);
      return { success: false, message: "Gagal mengupload gambar ke Cloudinary" };
    }

    const data = await response.json();
    return { success: true, url: data.secure_url };
  } catch (error) {
    console.error("Gagal mengupload gambar game catalog:", error);
    return { success: false, message: "Gagal mengupload gambar" };
  }
}
