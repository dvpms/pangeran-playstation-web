// src/app/api/auth/[...nextauth]/route.js
import _NextAuth from "next-auth";
import _Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

// Handle ESM/CJS interop — next-auth v4 ships CJS, project uses "type": "module"
const NextAuth = _NextAuth.default ?? _NextAuth;
const CredentialsProvider = _Credentials.default ?? _Credentials;

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "admin@pangeran.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // Cari user di database
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        // Validasi keberadaan user dan kecocokan password
        if (!user) return null;
        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password,
        );
        if (!isPasswordValid) return null;

        // Jika berhasil, kembalikan objek user
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt", // Menggunakan JWT karena kita pakai Credentials
    maxAge: 30 * 24 * 60 * 60, // Sesi berlaku 30 hari
  },
  callbacks: {
    // Menyisipkan data role ke dalam token dan sesi
    async jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },
    async session({ session, token }) {
      if (session?.user) session.user.role = token.role;
      return session;
    },
  },
  pages: {
    signIn: "/admin/login", // Halaman login khusus admin
},
  secret: process.env.NEXTAUTH_SECRET, // WAJIB ADA DI .env
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
