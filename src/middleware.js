// src/middleware.js
export { default as middleware } from "next-auth/middleware";


export const config = { matcher: ["/admin/dashboard/:path*"] };