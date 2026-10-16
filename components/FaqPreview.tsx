import React from 'react';
import Link from 'next/link';
import { Eyebrow } from '@/components/ui';

const faqs = [
  {
    q: 'Apakah aman untuk produk pangan?',
    a: 'Ya. Tersertifikasi BPOM RI NA18191100273 serta memenuhi FDA 21 CFR 175.300, EU No 10/2011, dan JHOSPA Jepang. Bahan aktif tidak bersentuhan langsung dengan pangan karena terbungkus material food-grade.',
  },
  {
    q: 'Berapa lama masa efektifnya?',
    a: 'Standar 30 hari setelah dibuka, dan hingga 45 hari pada kondisi penyimpanan ideal. Sachet dilengkapi indikator warna yang berubah saat daya serapnya habis.',
  },
  {
    q: 'Berapa sachet untuk satu ruang?',
    a: 'Satu sachet efektif untuk volume 1–2 m³. Kemasan perlu tertutup rapat agar penyerapan berjalan optimal.',
  },
  {
    q: 'Apakah memengaruhi rasa buah?',
    a: 'Tidak. Uji organoleptik tidak menunjukkan perbedaan rasa, aroma, maupun tekstur — produk hanya menyerap gas di udara sekitar tanpa mengubah komposisi kimia buah.',
  },
];

const FaqPreview = () => {
  return (
    <section id="faq-ringkas" className="relative overflow-hidden bg-paper py-16 md:py-32">
      <div aria-hidden="true" className="bp-grid absolute inset-0" />

      <div className="relative z-10 mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20 lg:px-10">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Eyebrow no="06">Pertanyaan Umum</Eyebrow>
          <h2 className="mb-5 text-3xl leading-[1.14] font-extrabold text-ink md:text-4xl lg:text-[2.6rem]">
            Yang paling sering ditanyakan sebelum uji coba
          </h2>
          <p className="mb-8 leading-relaxed text-slate-600">
            Empat pertanyaan teratas dari calon klien. Selebihnya — termasuk penyimpanan, dosis
            curah, dan dokumen ekspor — tersedia di halaman FAQ.
          </p>
          <Link
            href="/faq"
            className="inline-flex items-center gap-2 rounded-sm bg-brand px-7 py-3.5 text-sm font-bold text-white transition-colors duration-300 hover:bg-brand-deep"
          >
            Lihat semua pertanyaan
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        <dl className="border-t-2 border-ink/12">
          {faqs.map((f, i) => (
            <div key={f.q} className="border-b border-ink/12 py-7">
              <dt className="mb-3 flex gap-4 text-base font-bold text-ink">
                <span className="tech mt-0.5 shrink-0 text-[0.6875rem] font-semibold text-brand">
                  Q{String(i + 1).padStart(2, '0')}
                </span>
                {f.q}
              </dt>
              <dd className="pl-[2.25rem] text-sm leading-relaxed text-slate-600">{f.a}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
};

export default FaqPreview;
