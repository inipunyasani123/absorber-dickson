import "./globals.css"
import { Archivo, IBM_Plex_Mono } from "next/font/google"
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

/* Archivo memikul seluruh teks — grotesk industrial yang rapat dan tegas.
   IBM Plex Mono memikul lapisan data: kode standar, satuan, dan penomoran. */
const display = Archivo({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
})

const tech = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-tech",
  weight: ["400", "500", "600"],
  display: "swap",
})

const __jsonld = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://absorber-dickson.pintuweb.id/#organisasi",
      name: "PT Dickson Synergy",
      url: "https://absorber-dickson.pintuweb.id",
      description:
        "Penyedia solusi proteksi industri: ethylene absorber, silica gel, dan desiccant bersertifikat untuk rantai pasok komoditas segar.",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Jl. Teknologi No. 123",
        addressLocality: "Bandung",
        postalCode: "40234",
        addressCountry: "ID",
      },
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+62-812-3456-7890",
        contactType: "sales",
        areaServed: "ID",
        availableLanguage: ["id", "en"],
      },
    },
    {
      "@type": "Product",
      name: "EthyleneAbsorber",
      brand: { "@type": "Brand", name: "Dickson Synergy" },
      description:
        "Sachet penyerap gas etilen berbasis kalium permanganat. Satu sachet efektif untuk volume 1–2 m³ selama 30 hari (hingga 45 hari pada kondisi ideal).",
      category: "Freshness keeper / ethylene absorber",
      additionalProperty: [
        { "@type": "PropertyValue", name: "Registrasi BPOM RI", value: "NA18191100273" },
        { "@type": "PropertyValue", name: "Cakupan per sachet", value: "1–2 m³" },
        { "@type": "PropertyValue", name: "Masa efektif", value: "30 hari (ideal 45 hari)" },
      ],
    },
    {
      "@type": "CreativeWork",
      name: "EthyleneAbsorber — Konsep Korporat",
      description: "Landing page produk ethylene absorber, konsep desain \"Korporat\".",
      url: "https://absorber-dickson.pintuweb.id",
    },
  ],
}

export const metadata = {
  metadataBase: new URL("https://absorber-dickson.pintuweb.id"),
  title: {
    default: "EthyleneAbsorber — Konsep Korporat | Dickson Synergy",
    template: "%s — EthyleneAbsorber · Dickson Synergy",
  },
  description:
    "Landing page EthyleneAbsorber konsep \"Korporat\": mengedepankan kredibilitas PT Dickson Synergy sebagai penyedia solusi industri. Tersertifikasi BPOM RI NA18191100273, FDA 21 CFR 175.300, dan EU No 10/2011.",
  applicationName: "EthyleneAbsorber",
  keywords: ["ethylene absorber", "dickson synergy", "landing page korporat", "desain web", "silica gel", "desiccant"],
  authors: [{ name: "EthyleneAbsorber" }],
  creator: "EthyleneAbsorber",
  publisher: "EthyleneAbsorber",
  alternates: { canonical: "https://absorber-dickson.pintuweb.id" },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://absorber-dickson.pintuweb.id",
    siteName: "EthyleneAbsorber",
    title: "EthyleneAbsorber — Konsep Korporat | Dickson Synergy",
    description: "Landing page EthyleneAbsorber konsep \"Korporat\": mengedepankan kredibilitas PT Dickson Synergy sebagai penyedia solusi industri.",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "EthyleneAbsorber — Konsep Korporat | Dickson Synergy" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "EthyleneAbsorber — Konsep Korporat | Dickson Synergy",
    description: "Landing page EthyleneAbsorber konsep \"Korporat\": mengedepankan kredibilitas PT Dickson Synergy sebagai penyedia solusi industri.",
    images: ["/og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
}

export const viewport = {
  themeColor: "#003c5c",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className="scroll-smooth">
      <body
        className={`${display.variable} ${tech.variable} antialiased bg-white text-slate-700 selection:bg-lime selection:text-ink overflow-x-hidden max-w-[100vw]`}
      >
        <a
          href="#konten"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-sm focus:bg-ink focus:px-5 focus:py-3 focus:text-sm focus:font-bold focus:text-white"
        >
          Lompat ke konten utama
        </a>
        <Navbar />
        <main id="konten">{children}</main>
        <Footer />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(__jsonld) }} />
        <aside aria-label="Tentang situs demo ini" style={{ display: 'block', margin: 0, padding: '12px 16px', background: '#0f1b33', color: '#dfe6f3', font: '400 13px/1.5 system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif', textAlign: 'center' }}>
          Konsep desain untuk kontes, buatan PintuWeb — bukan situs resmi merek ini.{' '}
          <a href="https://www.pintuweb.id/kontak?demo=absorber-dickson" style={{ color: '#ffffff', fontWeight: 600, textDecoration: 'underline', textUnderlineOffset: '3px' }}>Buat yang seperti ini →</a>
        </aside>
      </body>
    </html>
  )
}
