import { NextResponse } from "next/server";
import { getAllGames } from "@/services/gameCatalog";

export async function GET() {
  try {
    const games = await getAllGames();
    return NextResponse.json(games);
  } catch (error) {
    console.error("GET /api/game-catalog error:", error);
    return NextResponse.json({ error: "Gagal mengambil data game" }, { status: 500 });
  }
}
