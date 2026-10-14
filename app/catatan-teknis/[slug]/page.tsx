import Link from 'next/link';
import { notFound } from 'next/navigation';
import PageHead from '@/components/PageHead';
import { CATATAN, catatanBySlug, type Blok } from '@/lib/catatan';

const SITE = 'https://absorber-dickson.pintuweb.id';

export function generateStaticParams() {
  return CATATAN.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = catatanBySlug(slug);
  if (!c) return {};
  return {
    title: `${c.kode} · ${c.judul}`,
    description: c.ringkas,
    alternates: { canonical: `${SITE}/catatan-teknis/${c.slug}` },
    openGraph: { type: 'article' },
  };
}

function Isi({ b, n }: { b: Blok; n: number }) {
  if ('h' in b) return <h2 className="mt-12 text-2xl font-extrabold text-ink">{b.h}</h2>;
  if ('daftar' in b)
    return (
      <ul className="mt-5 space-y-2.5">
        {b.daftar.map((d) => (
          <li key={d} className="flex gap-3 leading-relaxed text-slate-700">
            <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 bg-brand" />
            {d}
          </li>
        ))}
      </ul>
    );
  if ('tabel' in b)
    return (
      <figure className="mt-8">
        <figcaption className="tech-label mb-2 font-semibold text-ink">Tabel {n}</figcaption>
        <div className="overflow-x-auto border border-ink/15 bg-white">
          <table className="w-full min-w-[34rem] text-left text-sm">
            <thead className="border-b-2 border-ink/15 bg-paper">
              <tr>{b.tabel.kepala.map((h) => <th key={h} scope="col" className="tech-label px-4 py-3 font-semibold text-slate-600">{h}</th>)}</tr>
            </thead>
            <tbody>
              {b.tabel.baris.map((r) => (
                <tr key={r[0]} className="border-b border-ink/10 last:border-0">
                  <th scope="row" className="px-4 py-3 font-semibold text-ink">{r[0]}</th>
                  {r.slice(1).map((c, i) => <td key={i} className="tech px-4 py-3 text-slate-700">{c}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </figure>
    );
  if ('rumus' in b)
    return (
      <div className="hatch mt-8 border border-ink/15 p-1">
        <div className="bg-white p-6">
          <p className="tech text-base font-semibold text-ink sm:text-lg">{b.rumus}</p>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">{b.ket}</p>
        </div>
      </div>
    );
  if ('catatan' in b)
    return (
      <aside className="mt-10 border-l-2 border-brand bg-mint px-6 py-5">
        <p className="tech-label mb-2 font-semibold text-brand-deep">Catatan</p>
        <p className="text-sm leading-relaxed text-slate-700">{b.catatan}</p>
      </aside>
    );
  return <p className="mt-5 leading-[1.85] text-slate-700">{b.p}</p>;
}

export default async function CatatanPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = catatanBySlug(slug);
  if (!c) notFound();
  const lain = CATATAN.filter((x) => x.slug !== c.slug);
  let nTabel = 0;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: c.judul,
    description: c.ringkas,
    author: { '@type': 'Organization', name: 'PT Dickson Synergy' },
    mainEntityOfPage: `${SITE}/catatan-teknis/${c.slug}`,
  };

  return (
    <article className="bg-white">
      <PageHead doc={c.kode} eyebrow="Catatan teknis" title={c.judul} intro={c.ringkas} meta={`${c.menit} menit baca`} />

      <div className="relative bg-paper py-16 md:py-20">
        <div aria-hidden="true" className="bp-grid absolute inset-0" />
        <div className="relative z-10 mx-auto max-w-3xl px-6">
          <section aria-labelledby="temuan" className="border border-ink/15 bg-white">
            <h2 id="temuan" className="tech-label border-b border-ink/15 bg-ink px-5 py-3 font-semibold text-lime">Ringkasan temuan</h2>
            <ol className="divide-y divide-ink/10">
              {c.temuan.map((t, i) => (
                <li key={t} className="flex gap-4 px-5 py-3.5 text-sm text-slate-700">
                  <span className="tech font-semibold text-brand">{String(i + 1).padStart(2, '0')}</span>
                  {t}
                </li>
              ))}
            </ol>
          </section>

          <div className="mt-6">
            {c.isi.map((b, k) => <Isi key={k} b={b} n={'tabel' in b ? ++nTabel : 0} />)}
          </div>

          <div className="mt-14 grid gap-4 sm:grid-cols-2">
            {lain.map((x) => (
              <Link key={x.slug} href={`/catatan-teknis/${x.slug}`} className="border border-ink/15 bg-white p-5 transition-colors hover:border-brand">
                <span className="tech-label block font-semibold text-brand">{x.kode}</span>
                <span className="mt-2 block font-bold text-ink">{x.judul}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </article>
  );
}
