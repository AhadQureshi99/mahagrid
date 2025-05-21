/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'mahagrid.net',         // 🟢 Add this
      'cafe24img.poxo.com',   // ✅ Already needed
    ],
  },
};

export default nextConfig;
