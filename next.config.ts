import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Gambar statis, tanpa Image Optimization Vercel (kuota tim habis Okt 2026 → URL /_next/image dibalas 402).
  // Varian WebP ada di public/_img/ dan dipetakan image-loader.js lewat image-manifest.json.
  // Setiap menambah/mengganti gambar di public/, jalankan ulang: node scripts/static-images.mjs .
  images: {
    loader: "custom",
    loaderFile: "./image-loader.js",
    deviceSizes: [640, 828, 1080, 1280, 1920],
    imageSizes: [64, 128, 256, 384],
  },
  async headers() {
    return [
      { source: "/_img/:path*", headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }] },
    ];
  },
};

export default nextConfig;
