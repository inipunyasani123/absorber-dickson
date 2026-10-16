import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const navigasi = [
  { label: 'Beranda', href: '/' },
  { label: 'Latar Masalah', href: '/#masalah' },
  { label: 'Cara Kerja', href: '/#cara-kerja' },
  { label: 'Masa Pakai', href: '/#masa-pakai' },
  { label: 'Katalog & Lembar Data', href: '/produk' },
  { label: 'Catatan Teknis', href: '/catatan-teknis' },
  { label: 'Penerapan', href: '/#penerapan' },
  { label: 'Pertanyaan Umum', href: '/faq' },
  { label: 'Hubungi Kami', href: '/kontak' },
]

const standar = [
  ['BPOM RI', 'NA18191100273'],
  ['FDA', '21 CFR 175.300'],
  ['Uni Eropa', 'EU No 10/2011'],
  ['JHOSPA', 'Jepang'],
  ['Keberlanjutan', 'EcoTain®'],
]

export default function Footer() {
  const tahun = new Date().getFullYear()

  return (
    <footer className="relative overflow-hidden bg-ink-deep text-white/70">
      <div aria-hidden="true" className="bp-grid-dark absolute inset-0" />
      <div aria-hidden="true" className="tick-rail absolute inset-x-0 top-0 h-2.5 text-lime" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-16 pb-10 md:pt-20 lg:px-10">
        <div className="grid gap-10 md:grid-cols-2 md:gap-12 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)_minmax(0,0.9fr)_minmax(0,1.1fr)]">
          {/* Kop perusahaan */}
          <div>
            <div className="mb-6 flex items-center gap-3">
              <span
                className="flex h-10 w-10 shrink-0 items-center justify-center bg-white/10"
                style={{ clipPath: 'polygon(0 0, 100% 0, 100% 72%, 78% 100%, 0 100%)' }}
                aria-hidden="true"
              >
                <svg width="22" height="14" viewBox="0 0 22 14" fill="none">
                  <circle cx="4" cy="7" r="2.6" fill="#8CCF42" />
                  <circle cx="18" cy="7" r="2.6" fill="#8CCF42" />
                  <path
                    d="M5.6 5.2h10.8M5.6 8.8h10.8"
                    stroke="#ffffff"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              <span className="leading-none">
                <span className="block text-[1.0625rem] font-extrabold tracking-tight text-white">
                  Ethylene<span className="font-normal text-lime">Absorber</span>
                </span>
                <span className="tech-label mt-1 block text-[0.5625rem] text-white/60">
                  PT Dickson Synergy
                </span>
              </span>
            </div>

            <p className="mb-7 max-w-xs text-sm leading-relaxed text-white/60">
              Pemasok ethylene absorber, silica gel, dan desiccant untuk industri pangan segar,
              manufaktur, dan ekspor di Indonesia.
            </p>

            <p className="tech-label leading-[1.7] text-white/60">
              Reg. BPOM RI
              <span className="mt-1 block text-lime">NA18191100273</span>
            </p>
          </div>

          {/* Navigasi */}
          <nav aria-label="Navigasi footer">
            <h2 className="tech-label mb-5 border-b border-white/15 pb-3 font-semibold text-white">
              Navigasi
            </h2>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-3 sm:block sm:space-y-3">
              {navigasi.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm transition-colors hover:text-lime"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Register standar */}
          <div>
            <h2 className="tech-label mb-5 border-b border-white/15 pb-3 font-semibold text-white">
              Standar
            </h2>
            <dl className="grid grid-cols-2 gap-x-6 gap-y-3.5 sm:block sm:space-y-3.5">
              {standar.map(([k, v]) => (
                <div key={k}>
                  <dt className="text-sm text-white/70">{k}</dt>
                  <dd className="tech mt-0.5 text-[0.75rem] text-white/60">{v}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Permintaan — satu pintu masuk, tanpa nomor yang belum dipastikan klien */}
          <div>
            <h2 className="tech-label mb-5 border-b border-white/15 pb-3 font-semibold text-white">
              Permintaan
            </h2>
            <p className="max-w-xs text-sm leading-relaxed text-white/65">
              Sample, perhitungan dosis, dan lembar data diminta lewat satu formulir. Sertakan
              komoditas, volume ruang (m³), dan rute distribusi.
            </p>
            <Link
              href="/kontak"
              className="mt-6 inline-flex items-center gap-2 border border-lime/50 px-4 py-3 text-sm font-bold text-lime transition-colors hover:bg-lime hover:text-ink"
            >
              Isi formulir permintaan
              <ArrowRight size={15} strokeWidth={2.5} />
            </Link>
            <p className="tech-label mt-6 leading-[1.7] text-white/60">Form EA-01 · Dok. EA-KORP-01</p>
          </div>
        </div>

        {/* Kaki dokumen — halaman menandatangani dirinya seperti lembar data */}
        <div className="mt-16 flex flex-col gap-4 border-t border-white/12 pt-7 md:flex-row md:items-center md:justify-between">
          <p className="tech-label text-white/60">
            © {tahun} PT Dickson Synergy · Dok. EA-KORP-01 · Rev. {tahun}.01
          </p>
          <div className="flex gap-7">
            <Link href="/privacy" className="text-sm transition-colors hover:text-lime">
              Kebijakan Privasi
            </Link>
            <Link href="/terms" className="text-sm transition-colors hover:text-lime">
              Syarat Layanan
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
