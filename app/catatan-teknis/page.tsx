import Link from 'next/link';
import PageHead from '@/components/PageHead';
import { CATATAN } from '@/lib/catatan';

export const metadata = {
  title: 'Catatan Teknis',
  description:
    'Catatan teknis EthyleneAbsorber: menghitung dosis untuk kontainer 20 ft dan 40 ft, membaca indikator warna, dan memetakan komoditas penghasil serta peka etilen.',
  alternates: { canonical: 'https://absorber-dickson.pintuweb.id/catatan-teknis' },
};

export default function CatatanIndex() {
  return (
    <div className="bg-white">
      <PageHead
        doc="CT-00"
        eyebrow="Catatan teknis"
        title="Yang biasanya ditanyakan tim QC, dijawab dengan angka"
        intro="Setiap catatan diawali ringkasan temuan, lalu tabel dan contoh perhitungan. Cocok untuk dilampirkan ke laporan internal atau dibagikan ke buyer."
      />
      <section className="relative bg-paper py-16 md:py-24">
        <div aria-hidden="true" className="bp-grid absolute inset-0" />
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
          <ol className="grid gap-6 lg:grid-cols-3">
            {CATATAN.map((c) => (
              <li key={c.slug}>
                <article className="corner-frame group relative flex h-full flex-col border border-ink/15 bg-white p-7 transition-colors hover:border-brand">
                  <p className="flex items-center justify-between">
                    <span className="tech inline-flex h-[1.375rem] items-center border border-brand/40 px-1.5 text-[0.6875rem] font-semibold text-brand">{c.kode}</span>
                    <span className="tech-label text-slate-600">{c.menit} menit</span>
                  </p>
                  <h2 className="mt-6 text-xl leading-snug font-extrabold text-ink">
                    <Link href={`/catatan-teknis/${c.slug}`} className="after:absolute after:inset-0">{c.judul}</Link>
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">{c.ringkas}</p>
                  <ul className="mt-6 flex-1 space-y-2 border-t border-ink/10 pt-5">
                    {c.temuan.map((t) => (
                      <li key={t} className="flex gap-2.5 text-sm text-slate-700">
                        <span aria-hidden="true" className="tech text-brand">›</span>
                        {t}
                      </li>
                    ))}
                  </ul>
                  <p className="tech-label mt-6 font-semibold text-brand">Buka catatan →</p>
                </article>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </div>
  );
}
