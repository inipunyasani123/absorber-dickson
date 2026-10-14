import type { MetadataRoute } from "next";
import { PRODUK } from "@/lib/produk";
import { CATATAN } from "@/lib/catatan";

const BASE = "https://absorber-dickson.pintuweb.id";

const routes: { path: string; priority: number; changeFrequency: "monthly" | "yearly" }[] = [
  { path: "", priority: 1, changeFrequency: "monthly" },
  { path: "/produk", priority: 0.9, changeFrequency: "monthly" },
  ...PRODUK.map((p) => ({ path: `/produk/${p.slug}`, priority: 0.8, changeFrequency: "monthly" as const })),
  { path: "/catatan-teknis", priority: 0.7, changeFrequency: "monthly" },
  ...CATATAN.map((c) => ({ path: `/catatan-teknis/${c.slug}`, priority: 0.6, changeFrequency: "yearly" as const })),
  { path: "/faq", priority: 0.8, changeFrequency: "monthly" },
  { path: "/kontak", priority: 0.8, changeFrequency: "monthly" },
  { path: "/privacy", priority: 0.3, changeFrequency: "yearly" },
  { path: "/terms", priority: 0.3, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return routes.map((r) => ({
    url: `${BASE}${r.path}`,
    lastModified,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
