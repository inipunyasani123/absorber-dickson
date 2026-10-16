import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Leaf, PackageCheck } from 'lucide-react';

const products = [
  {
    no: '01',
    slug: 'ethyleneabsorber-sachet',
    name: 'EthyleneAbsorber Sachet',
    // Foto sachet di antara buah; foto lama (orang melakban kardus) tidak memperlihatkan sachetnya.
    image: '/images/sachet-buah.webp',
    desc: 'Penyerap gas etilen berbasis kalium permanganat untuk komoditas segar di dalam kemasan, peti, dan kontainer.',
    specs: [
      ['Bentuk', 'Sachet'],
      ['Cakupan', '1–2 m³'],
      ['Masa efektif', '30 hari'],
    ],
    eco: false,
  },
  {
    no: '02',
    slug: 'container-dry-ii',
    name: 'Container Dry® II',
    image: '/images/container.webp',
    desc: 'Desiccant gantung berdaya serap tinggi yang menahan kelembapan di dalam kontainer selama pelayaran jarak jauh.',
    specs: [
      ['Bentuk', 'Gantung'],
      ['Aplikasi', 'Kontainer 20/40 ft'],
      ['Fungsi', 'Serap lembap'],
    ],
    eco: true,
  },
  {
    no: '03',
    slug: 'desi-pak',
    name: 'Desi Pak®',
    image: '/images/desi.webp',
    desc: 'Desiccant dalam kemasan kantong berbahan tanah liat, fleksibel untuk kemasan ritel maupun muatan palet.',
    specs: [
      ['Bentuk', 'Kantong'],
      ['Aplikasi', 'Kemasan & palet'],
      ['Fungsi', 'Serap lembap'],
    ],
    eco: true,
  },
  {
    no: '04',
    slug: 'silica-gel',
    name: 'Silica Gel',
    image: '/images/silika.webp',
    desc: 'Butiran silica gel mutu industri untuk proteksi kelembapan pada barang jadi, komponen, dan peralatan.',
    specs: [
      ['Bentuk', 'Butiran'],
      ['Aplikasi', 'Umum & industri'],
      ['Fungsi', 'Serap lembap'],
    ],
    eco: false,
  },
];

const Products = () => {
  return (
    <section id="produk" className="relative bg-white py-16 md:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mb-10 flex flex-col gap-6 md:mb-14 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="mb-5 flex items-center gap-3">
              <span className="tech inline-flex h-[1.375rem] items-center justify-center border border-brand/40 px-1.5 text-[0.6875rem] font-semibold text-brand">
                04
              </span>
              <span aria-hidden="true" className="h-px w-7 bg-brand/40" />
              <span className="tech-label font-semibold text-brand">Katalog</span>
            </p>
            <h2 className="text-3xl leading-[1.14] font-extrabold text-ink md:text-4xl lg:text-[2.6rem]">
              Empat lini proteksi, satu tanggung jawab
            </h2>
            <p className="mt-5 leading-relaxed text-slate-600">
              Etilen dan kelembapan merusak muatan dengan cara berbeda, sehingga ditangani produk
              berbeda pula. Kami memasok keduanya agar satu pemasok bertanggung jawab atas seluruh
              kondisi di dalam kemasan Anda.
            </p>
          </div>
        </div>

        {/* Kartu produk — masing-masing membawa ringkasan spesifikasinya sendiri.
            Di ponsel dijajar mendatar (geser) supaya empat lembar data tidak
            memanjangkan halaman hingga empat layar. */}
        <div className="no-scrollbar -mx-6 flex snap-x snap-mandatory scroll-px-6 gap-4 overflow-x-auto px-6 pb-1 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-6 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-4">
          {products.map((p) => (
            <article
              key={p.name}
              className="group relative flex w-[78%] shrink-0 snap-start flex-col border border-ink/12 bg-white transition-all duration-300 hover:border-brand/45 hover:shadow-[0_18px_44px_-24px_rgba(0,60,92,0.35)] sm:w-auto"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-paper-2">
                <Image
                  src={p.image}
                  alt={p.name}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 78vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
                <span className="tech absolute top-0 left-0 bg-ink px-2.5 py-1.5 text-[0.6875rem] font-semibold text-white">
                  {p.no}
                </span>
                {p.eco && (
                  <span className="tech-label absolute top-0 right-0 flex items-center gap-1.5 bg-brand px-2.5 py-1.5 text-white">
                    <Leaf size={11} strokeWidth={2.5} />
                    EcoTain®
                  </span>
                )}
              </div>

              <div aria-hidden="true" className="tick-rail h-1.5 text-ink" />

              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <h3 className="mb-2.5 text-base font-bold text-ink">
                  <Link href={`/produk/${p.slug}`} className="after:absolute after:inset-0">{p.name}</Link>
                </h3>
                <p className="mb-6 flex-1 text-sm leading-relaxed text-slate-600">{p.desc}</p>

                <dl className="border-t border-ink/10 pt-4">
                  {p.specs.map(([k, v]) => (
                    <div key={k} className="flex items-baseline justify-between gap-3 py-1.5">
                      <dt className="tech-label text-slate-500">{k}</dt>
                      <dd className="tech text-[0.8125rem] font-semibold text-ink">{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </article>
          ))}
        </div>

        {/* Panel sample + catatan keberlanjutan */}
        <div className="mt-10 grid gap-px overflow-hidden bg-ink/12 md:mt-16 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,0.6fr)]">
          <div className="flex flex-col justify-center bg-ink p-9 text-white md:p-12">
            <p className="tech-label mb-5 font-semibold text-lime">Uji sebelum membeli</p>
            <h3 className="mb-4 text-2xl leading-tight font-extrabold text-white md:text-[1.75rem]">
              Kami kirimkan sample untuk diuji di fasilitas Anda sendiri
            </h3>
            <p className="mb-8 max-w-xl leading-relaxed text-white/70">
              Sebutkan komoditas, volume ruang, dan rute distribusi Anda. Tim teknis menghitung
              kebutuhan dosis, lalu mengirim sample beserta lembar data agar hasilnya bisa Anda
              bandingkan sendiri dengan peti tanpa perlakuan.
            </p>
            <div>
              <Link
                href="/kontak"
                className="inline-flex items-center gap-2 rounded-sm bg-white px-7 py-3.5 text-sm font-bold text-ink transition-colors duration-300 hover:bg-lime"
              >
                <PackageCheck size={16} strokeWidth={2.5} />
                Ajukan Permintaan Sample
                <ArrowRight size={15} strokeWidth={2.5} />
              </Link>
            </div>
          </div>

          <div className="flex flex-col justify-center bg-paper p-9 md:p-10">
            <span className="mb-5 flex h-11 w-11 items-center justify-center bg-brand/12 text-brand">
              <Leaf size={20} strokeWidth={2} />
            </span>
            <h3 className="mb-3 text-lg font-bold text-ink">Sertifikat EcoTain®</h3>
            <p className="text-sm leading-relaxed text-slate-600">
              Lini Container Dry® II dan Desi Pak® memegang EcoTain®, penilaian keberlanjutan yang
              menuntut capaian di atas standar pasar pada keseluruhan siklus hidup produk.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Products;
