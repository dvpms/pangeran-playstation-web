// src/middleware.js
export { default as middleware } from "next-auth/middleware";

// Tentukan rute mana saja yang wajib login
export const config = {
  // Kita mengunci semua rute di dalam /admin/dashboard,
  // tapi membiarkan /admin/login tetap terbuka agar orang bisa masuk.
  matcher: ["/admin/dashboard/:path*"],
};
