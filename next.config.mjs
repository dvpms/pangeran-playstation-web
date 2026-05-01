/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ["next-auth", "@auth/prisma-adapter", "bcrypt"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**"
      },
    ],
  },
};

export default nextConfig;
