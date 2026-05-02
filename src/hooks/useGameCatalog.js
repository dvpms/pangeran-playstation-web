"use client";

import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

export function useGameCatalog() {
  return useQuery({
    queryKey: ["game-catalog"],
    queryFn: () => api.get("/game-catalog").then((r) => r.data),
  });
}
