"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export async function getAllGames() {
  try {
    const games = await prisma.gameCatalog.findMany({
      orderBy: [{ order: "asc" }, { createdAt: "asc" }],
    });
    return JSON.parse(JSON.stringify(games));
  } catch (error) {
    console.error("Gagal mengambil data game catalog:", error);
    return [];
  }
}

export async function createGame(payload) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return { success: false, message: "Unauthorized" };

    if (!payload.title?.trim()) {
      return { success: false, message: "Judul game tidak boleh kosong" };
    }
    if (!payload.imageUrl) {
      return { success: false, message: "Gambar cover wajib diupload" };
    }

    await prisma.gameCatalog.create({
      data: { title: payload.title.trim(), imageUrl: payload.imageUrl },
    });

    return { success: true };
  } catch (error) {
    console.error("Gagal membuat game catalog:", error);
    return { success: false, message: "Terjadi kesalahan server" };
  }
}

export async function updateGame(id, payload) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return { success: false, message: "Unauthorized" };

    if (!payload.title?.trim()) {
      return { success: false, message: "Judul game tidak boleh kosong" };
    }

    const data = { title: payload.title.trim() };
    if (payload.imageUrl) data.imageUrl = payload.imageUrl;

    await prisma.gameCatalog.update({ where: { id }, data });

    return { success: true };
  } catch (error) {
    console.error("Gagal mengupdate game catalog:", error);
    return { success: false, message: "Terjadi kesalahan server" };
  }
}

export async function deleteGame(id) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return { success: false, message: "Unauthorized" };

    await prisma.gameCatalog.delete({ where: { id } });

    return { success: true };
  } catch (error) {
    console.error("Gagal menghapus game catalog:", error);
    return { success: false, message: "Terjadi kesalahan server" };
  }
}
