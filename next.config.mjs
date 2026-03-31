/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  images: {
    domains: ["res.cloudinary.com"],
  },
  remotePatterns: [
    {
      protocol: "https",
      hostname: "res.cloudinary.com",
    },
  ],
};

export default nextConfig;
