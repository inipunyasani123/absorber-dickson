import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, FileText } from 'lucide-react';

/* Angka kunci — sumbernya halaman FAQ, dijaga konsisten antar halaman. */
const keyFigures = [
  { value: '1–2 m³', label: 'Cakupan per sachet' },
  { value: '30 hari', label: 'Masa efektif (ideal 45)' },
  { value: '2–3×', label: 'Perpanjangan masa simpan' },
];

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-paper pt-28 pb-14 md:pt-40 md:pb-24">
      {/* Kertas milimeter */}
      <div aria-hidden="true" className="bp-grid absolute inset-0" />

      {/* Baji diagonal — motif potongan khas varian ini, kini sebagai bidang arsir */}
      <div
        aria-hidden="true"
        className="absolute inset-y-0 right-0 hidden w-[46%] bg-mint/70 lg:block"
        style={{ clipPath: 'polygon(18% 0, 100% 0, 100% 100%, 0 100%)' }}
      />
      <div
        aria-hidden="true"
        className="hatch absolute inset-y-0 right-0 hidden w-[46%] lg:block"
        style={{ clipPath: 'polygon(18% 0, 100% 0, 100% 100%, 0 100%)' }}
      />

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 px-6 md:gap-16 lg:grid-cols-[minmax(0,1.03fr)_minmax(0,0.97fr)] lg:gap-20 lg:px-10">
        {/* ---------------------------------------------------------------- */}
        {/* Kolom kiri — pernyataan posisi                                    */}
        {/* ---------------------------------------------------------------- */}
        <div>
          <p className="mb-7 flex flex-wrap items-center gap-3">
            <span className="tech-label bg-ink px-2.5 py-1.5 font-semibold text-white">
              PT Dickson Synergy
            </span>
            <span className="tech-label font-semibold text-slate-500">
              Solusi Proteksi Industri
            </span>
          </p>

          <h1 className="text-[2.5rem] leading-[1.06] font-extrabold text-ink sm:text-5xl lg:text-[3.4rem]">
            Masa simpan bukan harapan.
            <br />
            <span className="text-brand">Ia spesifikasi.</span>
          </h1>

          <p className="mt-7 max-w-xl leading-relaxed text-slate-600">
            Kami memasok ethylene absorber, silica gel, dan desiccant untuk rantai pasok yang tidak
            boleh gagal. Setiap klaim di halaman ini punya angka, standarnya, dan lembar datanya —
            silakan diuji sebelum dipercaya.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/kontak"
              className="inline-flex items-center justify-center gap-2 rounded-sm bg-brand px-7 py-4 text-sm font-bold text-white shadow-[0_10px_24px_-10px_rgba(25,135,84,0.7)] transition-colors duration-300 hover:bg-brand-deep"
            >
              Minta Sample Gratis
              <ArrowRight size={16} strokeWidth={2.5} />
            </Link>
            <Link
              href="/#cara-kerja"
              className="inline-flex items-center justify-center gap-2 rounded-sm border-2 border-ink/15 px-7 py-4 text-sm font-bold text-ink transition-colors duration-300 hover:border-ink/40 hover:bg-white"
            >
              <FileText size={16} strokeWidth={2.5} />
              Baca Cara Kerjanya
            </Link>
          </div>

          {/* Pita angka kunci — dibaca sebagai tabel ringkas, bukan hiasan.
              Di bawah sm dijajar baris demi baris; tiga kolom sempit membuat
              labelnya pecah tiga baris dan tingginya tidak rata. */}
          <dl className="mt-10 grid max-w-xl border-t-2 border-ink/12 sm:mt-12 sm:grid-cols-3">
            {keyFigures.map((f) => (
              <div
                key={f.label}
                className="flex items-baseline justify-between gap-4 border-b border-ink/10 py-4 sm:flex-col sm:items-start sm:gap-2 sm:border-r sm:border-b-0 sm:py-5 sm:pr-4 sm:last:border-r-0"
              >
                <dt className="tech-label order-2 text-right leading-[1.5] text-slate-500 sm:text-left">
                  {f.label}
                </dt>
                <dd className="tech order-1 text-xl font-semibold text-ink sm:text-2xl">
                  {f.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* Kolom kanan — gambar dalam bingkai lembar data                    */}
        {/* ---------------------------------------------------------------- */}
        {/* Di bawah lg bingkai dibatasi lebarnya dan dipusatkan — dibiarkan
            selebar layar, gambar setinggi 6:5 mendominasi layar tablet. */}
        <div className="relative mx-auto w-full max-w-md lg:mx-0 lg:max-w-none">
          {/* Garis ukur vertikal di sisi kiri gambar */}
          <div
            aria-hidden="true"
            className="absolute -left-6 top-8 bottom-14 hidden w-px bg-ink/15 xl:block"
          >
            <span className="absolute -left-1 top-0 h-px w-2.5 bg-ink/40" />
            <span className="absolute -left-1 bottom-0 h-px w-2.5 bg-ink/40" />
            <span className="tech-label absolute top-1/2 -left-1 origin-left -translate-y-1/2 -rotate-90 whitespace-nowrap text-slate-500">
              Gbr. 01
            </span>
          </div>

          <div className="corner-frame relative bg-white p-3 shadow-[0_24px_60px_-30px_rgba(0,60,92,0.42)] ring-1 ring-ink/10">
            {/* Kop gambar */}
            <div className="flex items-center justify-between px-2 pt-1 pb-3">
              <span className="tech-label font-semibold text-slate-500">
                Sachet dalam kemasan
              </span>
              <span className="tech-label text-slate-500">Tanpa skala</span>
            </div>

            <div className="relative aspect-[4/3] w-full overflow-hidden bg-paper-2 sm:aspect-[5/6]">
              <Image
                src="/images/teknis/hero-kemasan.webp"
                alt="Gambar teknis potongan kardus berisi mangga dengan sachet EthyleneAbsorber berdiri di dinding kemasan"
                fill
                priority
                sizes="(min-width: 1024px) 46vw, 100vw"
                className="object-cover"
              />
              {/* Anotasi penunjuk pada gambar */}
              <div className="absolute top-4 left-4 flex items-center gap-2 bg-ink/85 px-2.5 py-1.5 backdrop-blur-sm">
                <span className="h-1.5 w-1.5 bg-lime" />
                <span className="tech-label text-white">Penempatan di dalam kemasan</span>
              </div>
            </div>

            {/* Rel penggaris di kaki bingkai */}
            <div aria-hidden="true" className="tick-rail mt-3 h-2.5 text-ink" />
          </div>

          {/* Kartu indikator — menonjol keluar bingkai, penanda khas produk ini */}
          {/* Di bawah lg kartu ini berdiri sendiri di bawah bingkai. Saat
              ditumpangkan pada layar sempit ia menutupi gambar produk dan
              memotong rel penggaris di kaki bingkai. */}
          <div className="mt-4 w-full bg-white p-5 ring-1 ring-ink/10 lg:absolute lg:-bottom-8 lg:-left-8 lg:mt-0 lg:w-[16.5rem] lg:shadow-[0_18px_40px_-18px_rgba(0,60,92,0.45)]">
            <p className="tech-label mb-3 font-semibold text-slate-500">Indikator daya serap</p>
            <div className="mb-3 flex items-center gap-3">
              <span className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-kmno4">
                <span className="h-3 w-3 rounded-full bg-white/35" />
              </span>
              <div>
                <p className="text-sm font-bold text-ink">Ungu — masih aktif</p>
                <p className="tech-label mt-1 text-slate-500">Berubah cokelat saat jenuh</p>
              </div>
            </div>
            <div aria-hidden="true" className="indicator-rail h-1.5 w-full" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
