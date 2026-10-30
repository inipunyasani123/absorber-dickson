import React from 'react';
import Link from 'next/link';
import { SectionHead } from '@/components/ui';

const steps = [
  {
    no: '01',
    title: 'Etilen dilepas',
    desc: 'Komoditas segar terus melepas gas etilen sepanjang penyimpanan — makin hangat ruangannya, makin cepat laju pelepasannya.',
  },
  {
    no: '02',
    title: 'Gas terserap media',
    desc: 'Sachet ditempatkan di dalam kemasan atau kontainer. Media berpori menarik dan menahan molekul etilen dari udara sekitar.',
  },
  {
    no: '03',
    title: 'Oksidasi permanen',
    desc: 'Kalium permanganat mengoksidasi etilen menjadi karbon dioksida dan air. Reaksi ini searah — gas tidak akan terlepas kembali.',
  },
  {
    no: '04',
    title: 'Pematangan melambat',
    desc: 'Konsentrasi etilen ditekan di bawah ambang pemicu, sehingga masa simpan bertambah tanpa mengubah rasa maupun tekstur.',
  },
];

const HowItWorks = () => {
  return (
    <section id="cara-kerja" className="relative bg-white py-16 md:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHead
          no="02"
          eyebrow="Cara Kerja"
          title="Empat tahap, satu reaksi kimia yang tidak bisa berbalik"
          lead="Ethylene absorber bukan pengawet dan tidak bersentuhan dengan produk. Ia bekerja pada udara di sekelilingnya — menghapus pemicu pematangan, bukan menutupinya."
          className="mb-10 md:mb-16"
        />

        {/* Di ponsel tiap tahap menjadi baris (nomor di kiri, teks di kanan);
            rel penghubung baru muncul saat tahap dijajar mendatar. */}
        <ol className="grid gap-x-8 gap-y-6 sm:grid-cols-2 sm:gap-y-12 lg:grid-cols-4">
          {steps.map((step, i) => (
            <li key={step.no} className="relative grid grid-cols-[2.75rem_minmax(0,1fr)] gap-x-4 sm:block">
              <div className="row-span-2 sm:mb-6 sm:flex sm:items-center sm:gap-4">
                <span className="tech flex h-11 w-11 shrink-0 items-center justify-center border-2 border-ink text-sm font-semibold text-ink">
                  {step.no}
                </span>
                {/* Rel penghubung antar tahap — putus di langkah terakhir */}
                {i < steps.length - 1 ? (
                  <span
                    aria-hidden="true"
                    className="tick-rail hidden h-2 flex-1 text-brand opacity-45 sm:block"
                  />
                ) : (
                  <span aria-hidden="true" className="hidden h-px flex-1 bg-brand/25 sm:block" />
                )}
              </div>

              <h3 className="mb-1.5 pt-0.5 text-lg font-bold text-ink sm:mb-2.5 sm:pt-0">{step.title}</h3>
              <p className="text-sm leading-relaxed text-slate-600">{step.desc}</p>
            </li>
          ))}
        </ol>

        {/* Catatan teknis — gaya blok catatan kaki pada lembar data */}
        <div className="mt-10 flex flex-col gap-5 border-l-2 border-brand bg-paper px-6 py-6 sm:px-8 sm:py-7 md:mt-16 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-2xl">
            <p className="tech-label mb-2.5 font-semibold text-brand">Catatan teknis</p>
            <p className="text-sm leading-relaxed text-slate-700">
              Reaksi oksidasi bersifat satu arah, sehingga sachet tidak melepaskan kembali gas yang
              sudah diserap meski suhu berubah selama perjalanan.
            </p>
          </div>
          <Link
            href="/faq"
            className="shrink-0 text-sm font-bold text-brand underline-offset-4 hover:underline sentuh"
          >
            Baca pertanyaan teknis →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
