import Image from 'next/image';
import Link from 'next/link';
import PageHead from '@/components/PageHead';
import KalkulatorDosis from '@/components/KalkulatorDosis';
import { PRODUK } from '@/lib/produk';
import { meta } from '@/lib/seo';

export const metadata = meta({
  title: 'Katalog & Lembar Data',
  description:
    'Lembar data EthyleneAbsorber Sachet, Container Dry® II, Desi Pak®, dan Silica Gel: spesifikasi, cara pakai, batas pemakaian, dan dokumen untuk buyer.',
  path: '/produk',
});

export default function ProdukIndex() {
  return (
    <div className="bg-white">
      <PageHead
        doc="K-00"
        eyebrow="Katalog"
        title="Empat lini proteksi, empat lembar data"
        intro="Etilen dan kelembapan merusak muatan dengan cara berbeda, sehingga ditangani produk yang berbeda. Setiap lembar data memuat spesifikasi, cara pakai, batas pemakaian, dan dokumen yang bisa dilampirkan untuk buyer."
      />

      <section className="relative bg-paper py-16 md:py-24">
        <div aria-hidden="true" className="bp-grid absolute inset-0" />
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
          {/* Ponsel: daftar ringkas, tanpa tabel yang harus digeser. */}
          <ul className="divide-y divide-ink/10 border border-ink/15 bg-white sm:hidden">
            {PRODUK.map((p) => (
              <li key={p.slug}>
                <Link href={`/produk/${p.slug}`} className="flex items-center gap-4 p-4 transition-colors hover:bg-mint">
                  <span className="relative h-14 w-14 shrink-0 overflow-hidden border border-ink/10 bg-paper">
                    <Image src={p.image} alt="" fill sizes="56px" className="object-cover" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="tech block text-xs font-semibold text-brand">{p.kode} · {p.fungsi}</span>
                    <span className="mt-1 block font-bold text-ink">{p.nama}</span>
                    <span className="mt-0.5 block text-sm text-slate-600">{p.spek[0][1]}</span>
                  </span>
                  <span aria-hidden="true" className="text-brand">→</span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden overflow-x-auto border border-ink/15 bg-white sm:block" tabIndex={0} role="region" aria-label="Daftar produk dan lembar datanya">
            <table className="w-full min-w-[46rem] text-left text-sm">
              <caption className="sr-only">Daftar produk dan lembar datanya</caption>
              <thead className="border-b-2 border-ink/15 bg-paper">
                <tr>
                  {['Kode', 'Produk', 'Menangani', 'Bentuk / aplikasi'].map((h) => (
                    <th key={h} scope="col" className="tech-label px-5 py-3.5 font-semibold text-slate-600">{h}</th>
                  ))}
                  <th scope="col" className="px-5 py-3.5"><span className="sr-only">Lembar data</span></th>
                </tr>
              </thead>
              <tbody>
                {PRODUK.map((p) => (
                  <tr key={p.slug} className="border-b border-ink/10 last:border-0">
                    <td className="tech px-5 py-4 font-semibold whitespace-nowrap text-brand">{p.kode}</td>
                    <th scope="row" className="px-5 py-4">
                      <span className="flex items-center gap-4">
                        <span className="relative h-14 w-14 shrink-0 overflow-hidden border border-ink/10 bg-paper">
                          <Image src={p.image} alt="" fill sizes="56px" className="object-cover" />
                        </span>
                        <span className="font-bold text-ink">{p.nama}</span>
                      </span>
                    </th>
                    <td className="px-5 py-4">
                      <span className={`tech-label inline-block border px-2 py-1 font-semibold ${p.fungsi === 'Etilen' ? 'border-kmno4/40 text-kmno4' : 'border-ink/25 text-ink'}`}>{p.fungsi}</span>
                    </td>
                    <td className="px-5 py-4 text-slate-600">{p.spek[0][1]} · {p.spek[1][1]}</td>
                    <td className="px-5 py-4 text-right">
                      <Link href={`/produk/${p.slug}`} className="font-bold whitespace-nowrap text-brand hover:underline">Lembar data →</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-16">
            <h2 className="text-2xl font-extrabold text-ink md:text-3xl">Berapa sachet untuk muatan Anda?</h2>
            <p className="mt-3 max-w-2xl leading-relaxed text-slate-600">
              Hitung perkiraan awal di sini. Dasarnya volume ruang tertutup, bukan berat muatan —{' '}
              <Link href="/catatan-teknis/dosis-kontainer-20-dan-40-ft" className="font-semibold text-brand hover:underline">penjelasannya di CT-01</Link>.
            </p>
            <div className="mt-8">
              <KalkulatorDosis />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
