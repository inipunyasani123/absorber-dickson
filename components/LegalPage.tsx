import Link from 'next/link';
import React from 'react';
import PageHead from '@/components/PageHead';
import type { Bagian } from '@/lib/legal';

/* Halaman legal memakai tata rupa lembar data yang sama seperti halaman lain,
   supaya identitas tidak terputus saat pengunjung menelusuri tautan footer.
   Isi diambil dari lib/legal.ts (khusus bisnis B2B ini, bukan templat umum). */
export default function LegalPage({
  doc,
  title,
  updated,
  intro,
  sections,
}: {
  doc: string;
  title: string;
  updated: string;
  intro: string;
  sections: Bagian[];
}) {
  return (
    <div className="bg-white">
      <PageHead doc={doc} eyebrow="Dokumen legal" title={title} meta={`Terakhir diperbarui: ${updated}`} intro={intro} />

      <div className="relative overflow-hidden bg-paper py-16 md:py-24">
        <div aria-hidden="true" className="bp-grid absolute inset-0" />
        <div className="relative z-10 mx-auto max-w-3xl px-6">
          <div className="border-t-2 border-ink/12 bg-white">
            {sections.map((s, i) => (
              <section key={s.h} className="border-b border-ink/12 px-6 py-7 sm:px-8">
                <h2 className="mb-3 flex gap-4 text-base font-bold text-ink sm:text-lg">
                  <span className="tech mt-1 shrink-0 text-[0.6875rem] font-semibold text-brand">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {s.h}
                </h2>
                <div className="space-y-3 pl-[2.25rem] text-sm leading-relaxed text-slate-600">
                  {s.p && <p>{s.p}</p>}
                  {s.daftar && (
                    <ul className="space-y-2">
                      {s.daftar.map((d) => (
                        <li key={d} className="flex gap-3">
                          <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 bg-brand" />
                          {d}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </section>
            ))}
          </div>

          <p className="tech-label mt-6 leading-relaxed text-slate-600">
            Draf untuk purwarupa desain — perlu ditinjau bagian legal PT Dickson Synergy sebelum dipakai.
          </p>

          <div className="mt-10 flex flex-col gap-5 border-l-2 border-brand bg-white px-7 py-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm leading-relaxed text-slate-700">Ada pertanyaan mengenai dokumen ini?</p>
            <Link href="/kontak" className="shrink-0 text-sm font-bold text-brand underline-offset-4 hover:underline sentuh">
              Hubungi kami →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
