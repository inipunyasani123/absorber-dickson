import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { SectionHead } from '@/components/ui';

const sectors = [
  {
    code: 'A',
    title: 'Ekspor Hortikultura',
    image: '/images/buahsegar1.webp',
    desc: 'Manggis, pisang, dan mangga dalam pengapalan laut jarak jauh yang menuntut masa simpan panjang.',
    tags: ['Kontainer 20/40 ft', 'Reefer'],
  },
  {
    code: 'B',
    title: 'Gudang & Cold Storage',
    image: '/images/container.webp',
    desc: 'Ruang penyimpanan tertutup tempat etilen paling mudah menumpuk dan memicu efek berantai.',
    tags: ['Curah', 'Palet'],
  },
  {
    code: 'C',
    title: 'Ritel Modern',
    image: '/images/buahsegar2.webp',
    desc: 'Rak pajang dan area display yang membutuhkan tampilan buah tetap prima hingga penutupan toko.',
    tags: ['Display', 'Back store'],
  },
  {
    code: 'D',
    title: 'Minuman & Olahan Segar',
    image: '/images/minuman1.webp',
    desc: 'Produk turunan berbahan buah yang mutunya ikut turun bila bahan bakunya lewat matang.',
    tags: ['Bahan baku', 'Distribusi'],
  },
];

const Applications = () => {
  return (
    <section id="penerapan" className="relative overflow-hidden bg-paper py-16 md:py-32">
      <div aria-hidden="true" className="bp-grid absolute inset-0" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHead
          no="05"
          eyebrow="Penerapan"
          title="Dipakai di titik paling rawan sepanjang rantai dingin"
          action={
            <Link
              href="/kontak"
              className="text-sm font-bold text-brand underline-offset-4 hover:underline"
            >
              Diskusikan kebutuhan sektor Anda →
            </Link>
          }
          className="mb-10 md:mb-14"
        />

        {/* Di ponsel tiap sektor menjadi baris ringkas (gambar kecil + teks);
            mulai sm kembali menjadi kartu bergambar. */}
        <div className="grid gap-3 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
          {sectors.map((s) => (
            <article
              key={s.title}
              className="group flex border border-ink/12 bg-white transition-all duration-300 hover:border-brand/45 hover:shadow-[0_18px_44px_-24px_rgba(0,60,92,0.35)] sm:flex-col"
            >
              <div className="relative w-28 shrink-0 overflow-hidden sm:h-44 sm:w-full">
                <Image
                  src={s.image}
                  alt={s.title}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 112px"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-ink/60 via-ink/5 to-transparent"
                />
                <span className="tech absolute top-0 left-0 bg-ink px-2.5 py-1.5 text-[0.6875rem] font-semibold text-lime">
                  {s.code}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-4 sm:p-6">
                <h3 className="mb-1.5 text-base font-bold text-ink sm:mb-2.5">{s.title}</h3>
                <p className="flex-1 text-sm leading-relaxed text-slate-600 sm:mb-5">{s.desc}</p>
                <div className="hidden flex-wrap gap-1.5 border-t border-ink/10 pt-4 sm:flex">
                  {s.tags.map((t) => (
                    <span
                      key={t}
                      className="tech-label border border-brand/25 bg-mint px-2 py-1 text-brand"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Applications;
