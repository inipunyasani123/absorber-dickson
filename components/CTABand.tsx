import React from 'react';
import Link from 'next/link';
import { ShieldCheck, FileText, PackageCheck, ArrowRight } from 'lucide-react';

const assurances = [
  { icon: <PackageCheck size={17} strokeWidth={2} />, text: 'Sample gratis untuk uji coba internal' },
  { icon: <FileText size={17} strokeWidth={2} />, text: 'Lembar data teknis & sertifikat lengkap' },
  { icon: <ShieldCheck size={17} strokeWidth={2} />, text: 'Pendampingan dosis sesuai komoditas' },
];

const CTABand = () => {
  return (
    <section id="cta" className="relative overflow-hidden bg-brand text-white">
      {/* Arsiran potongan — motif diagonal yang menutup dokumen */}
      <div aria-hidden="true" className="hatch hatch-white absolute inset-0" />
      <div aria-hidden="true" className="tick-rail absolute inset-x-0 top-0 h-2.5 text-white" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-16 md:py-32 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-center lg:gap-16">
          <div>
            <p className="tech-label mb-6 font-semibold text-white/70">Langkah berikutnya</p>
            <h2 className="mb-5 text-3xl leading-[1.14] font-extrabold md:text-4xl lg:text-[2.6rem]">
              Uji dulu pada satu peti.
              <br />
              Putuskan setelah melihat hasilnya.
            </h2>
            <p className="mb-9 max-w-xl leading-relaxed text-white/85">
              Kirimkan komoditas, volume ruang, dan rute distribusi Anda. Tim kami menghitung
              kebutuhan dosis dan menyiapkan sample untuk pengujian di fasilitas Anda sendiri.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href="/kontak"
                className="inline-flex items-center justify-center gap-2 rounded-sm bg-white px-8 py-4 text-sm font-bold text-brand shadow-lg transition-colors duration-300 hover:bg-paper"
              >
                Minta Sample Gratis
                <ArrowRight size={16} strokeWidth={2.5} />
              </Link>
              <Link
                href="/#produk"
                className="inline-flex items-center justify-center rounded-sm border-2 border-white/60 px-8 py-4 text-sm font-bold text-white transition-colors duration-300 hover:bg-white/12"
              >
                Lihat Katalog Produk
              </Link>
            </div>
          </div>

          <ul className="border-t border-white/25">
            {assurances.map((a, i) => (
              <li
                key={a.text}
                className="flex items-center gap-4 border-b border-white/25 py-5"
              >
                <span className="tech w-6 shrink-0 text-[0.6875rem] font-semibold text-white/60">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="flex h-9 w-9 shrink-0 items-center justify-center bg-white/15">
                  {a.icon}
                </span>
                <span className="text-sm leading-snug font-medium text-white/92">{a.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default CTABand;
