import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import KalkulatorDosis from '@/components/KalkulatorDosis';
import PageHead from '@/components/PageHead';
import { PRODUK, produkBySlug } from '@/lib/produk';
import { meta, SITE } from '@/lib/seo';

export function generateStaticParams() {
  return PRODUK.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = produkBySlug(slug);
  if (!p) return {};
  return meta({ title: `${p.nama} · Lembar Data ${p.kode}`, description: p.ringkas, path: `/produk/${p.slug}` });
}

export default async function LembarData({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = produkBySlug(slug);
  if (!p) notFound();
  const pasangan = produkBySlug(p.pasangan);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: p.nama,
    sku: p.kode,
    description: p.uraian,
    image: `${SITE}${p.image}`,
    brand: { '@type': 'Brand', name: 'PT Dickson Synergy' },
    additionalProperty: p.spek.map(([name, value]) => ({ '@type': 'PropertyValue', name, value })),
  };

  return (
    <div className="bg-white">
      <PageHead doc={p.kode} eyebrow={`Lembar data · ${p.fungsi}`} title={p.nama} intro={p.ringkas}>
        <nav aria-label="Remah roti" className="tech-label mt-8 flex flex-wrap gap-2 text-white/70">
          <Link href="/" className="hover:text-lime">Beranda</Link>
          <span aria-hidden="true">/</span>
          <Link href="/produk" className="hover:text-lime">Katalog</Link>
          <span aria-hidden="true">/</span>
          <span className="text-white">{p.kode}</span>
        </nav>
      </PageHead>

      <section className="relative bg-paper py-16 md:py-20">
        <div aria-hidden="true" className="bp-grid absolute inset-0" />
        <div className="relative z-10 mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:px-10">
          <div className="corner-frame relative h-fit border border-ink/15 bg-white p-3">
            <div className="relative aspect-square overflow-hidden bg-paper">
              <Image src={p.image} alt={p.nama} fill priority sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
            </div>
            <p className="tech-label mt-3 flex justify-between text-slate-600">
              <span>Gbr. 1 — {p.nama}</span>
              {p.eco && <span className="font-semibold text-brand">EcoTain®</span>}
            </p>
          </div>

          <div>
            <p className="leading-relaxed text-slate-700">{p.uraian}</p>

            <h2 className="tech-label mt-10 mb-3 font-semibold text-ink">Tabel 1 — Spesifikasi</h2>
            <dl className="border-t-2 border-ink/15 bg-white">
              {p.spek.map(([k, v]) => (
                <div key={k} className="grid gap-1 border-b border-ink/10 px-4 py-3 sm:grid-cols-[11rem_minmax(0,1fr)] sm:gap-6">
                  <dt className="tech-label pt-0.5 font-semibold text-slate-600">{k}</dt>
                  <dd className="tech text-sm font-semibold text-ink">{v}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-10 grid gap-8 sm:grid-cols-2">
              <div>
                <h2 className="tech-label mb-3 font-semibold text-ink">Tabel 2 — Cocok untuk</h2>
                <ul className="space-y-2 border-t-2 border-brand/40 pt-3 text-sm text-slate-700">
                  {p.cocok.map((c) => <li key={c} className="flex gap-2.5"><span aria-hidden="true" className="tech text-brand">+</span>{c}</li>)}
                </ul>
              </div>
              <div>
                <h2 className="tech-label mb-3 font-semibold text-ink">Tabel 3 — Bukan untuk</h2>
                <ul className="space-y-2 border-t-2 border-spent/40 pt-3 text-sm text-slate-700">
                  {p.tidakCocok.map((c) => <li key={c} className="flex gap-2.5"><span aria-hidden="true" className="tech text-spent">−</span>{c}</li>)}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2 lg:px-10">
          <div>
            <h2 className="text-2xl font-extrabold text-ink">Prosedur pemasangan</h2>
            <ol className="mt-6 space-y-0 border-l-2 border-ink/15">
              {p.pakai.map((s, i) => (
                <li key={s} className="relative py-3 pl-8 text-slate-700">
                  <span className="tech absolute top-3 -left-[0.9rem] grid h-7 w-7 place-items-center border border-ink/20 bg-white text-xs font-semibold text-ink">{i + 1}</span>
                  {s}
                </li>
              ))}
            </ol>
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-ink">Dokumen yang tersedia</h2>
            <ul className="mt-6 divide-y divide-ink/10 border-y border-ink/10">
              {p.dokumen.map((d, i) => (
                <li key={d} className="flex items-center justify-between gap-4 py-3.5">
                  <span className="text-slate-700">{d}</span>
                  <span className="tech-label shrink-0 text-slate-600">{p.kode}-D{i + 1}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-slate-600">Dilampirkan bersama pengiriman, atau dikirim lebih dulu untuk audit buyer.</p>
            {pasangan && (
              <Link href={`/produk/${pasangan.slug}`} className="mt-8 flex items-center justify-between gap-4 border border-ink/15 bg-paper p-5 transition-colors hover:border-brand">
                <span>
                  <span className="tech-label block text-slate-600">Sering dipakai bersama</span>
                  <span className="mt-1 block font-bold text-ink">{pasangan.kode} · {pasangan.nama}</span>
                </span>
                <span aria-hidden="true" className="text-brand">→</span>
              </Link>
            )}
          </div>
        </div>
      </section>

      {p.fungsi === 'Etilen' && (
        <section className="relative bg-paper py-16 md:py-20">
          <div aria-hidden="true" className="bp-grid absolute inset-0" />
          <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
            <h2 className="mb-8 text-2xl font-extrabold text-ink md:text-3xl">Hitung dosis untuk muatan Anda</h2>
            <KalkulatorDosis />
          </div>
        </section>
      )}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </div>
  );
}
