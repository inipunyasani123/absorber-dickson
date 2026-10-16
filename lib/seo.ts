import type { Metadata } from 'next'

/* Satu sumber untuk metadata halaman. Setiap halaman memberi judul, deskripsi,
   dan path-nya sendiri; Open Graph dan Twitter ikut disusun dari situ supaya
   pratinjau tautan tidak lagi mewarisi judul & alamat beranda. */
export const SITE = 'https://absorber-dickson.pintuweb.id'
export const SITE_NAME = 'EthyleneAbsorber · Dickson Synergy'
const SUFFIX = ' · Dickson Synergy'
const OG = { url: '/og.jpg', width: 1200, height: 630 }

/** Akhiran merek dipasang bila muat dalam 60 karakter; bila tidak, judul berdiri sendiri. */
export function judul(dasar: string) {
  return dasar.length + SUFFIX.length <= 60 ? dasar + SUFFIX : dasar
}

export function meta({
  title,
  description,
  path = '',
  type = 'website',
}: {
  title: string
  description: string
  path?: string
  type?: 'website' | 'article'
}): Metadata {
  const t = judul(title)
  const url = SITE + path
  return {
    title: { absolute: t },
    description,
    alternates: { canonical: url },
    openGraph: {
      type,
      locale: 'id_ID',
      url,
      siteName: SITE_NAME,
      title: t,
      description,
      images: [{ ...OG, alt: t }],
    },
    twitter: { card: 'summary_large_image', title: t, description, images: [OG.url] },
  }
}
