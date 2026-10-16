import React from 'react';
import { TrendingDown, Thermometer, Timer } from 'lucide-react';
import { Eyebrow } from '@/components/ui';

/* Tiga temuan, semuanya dari mekanisme yang dijelaskan di brief — tanpa
   statistik susut nasional yang tidak bersumber. */
const losses = [
  {
    value: 'Tertutup',
    label: 'Etilen menumpuk',
    desc: 'Di udara terbuka etilen terurai. Di kontainer, gudang, atau kemasan tertutup ia tertahan dan terus bertambah selama perjalanan.',
    icon: <TrendingDown size={20} strokeWidth={2} />,
  },
  {
    value: 'Berantai',
    label: 'Satu peti memicu peti lain',
    desc: 'Peti yang matang lebih dulu melepas lebih banyak etilen, yang ikut mematangkan peti di sekitarnya.',
    icon: <Timer size={20} strokeWidth={2} />,
  },
  {
    value: '3–4 minggu',
    label: 'Durasi pengapalan',
    desc: 'Waktu tempuh ekspor jalur laut — periode paling kritis bagi komoditas segar.',
    icon: <Thermometer size={20} strokeWidth={2} />,
  },
];

const Problem = () => {
  return (
    <section id="masalah" className="relative overflow-hidden bg-ink text-white">
      {/* Kertas milimeter versi gelap + arsiran potongan */}
      <div aria-hidden="true" className="bp-grid-dark absolute inset-0" />
      <div
        aria-hidden="true"
        className="hatch hatch-lime absolute inset-y-0 right-0 w-1/3"
        style={{ clipPath: 'polygon(38% 0, 100% 0, 100% 100%, 0 100%)' }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-16 md:py-32 lg:px-10">
        <div className="grid items-start gap-10 md:gap-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-20">
          {/* Pernyataan masalah */}
          <div>
            <Eyebrow no="01" tone="dark">
              Latar Masalah
            </Eyebrow>
            <h2 className="mb-7 text-3xl leading-[1.12] font-extrabold md:text-4xl lg:text-[2.6rem]">
              Buah tidak membusuk karena waktu.
              <br />
              <span className="text-lime">Ia membusuk karena etilen.</span>
            </h2>
            <div className="max-w-xl space-y-5 leading-relaxed text-white/72">
              <p>
                Setiap buah dan sayur melepas <strong className="font-semibold text-white">etilen</strong> —
                hormon gas alami yang memicu pematangan. Di ruang terbuka gas ini terurai. Di dalam
                kontainer, gudang, atau kemasan tertutup, ia menumpuk dan berbalik menyerang produk
                yang mengeluarkannya.
              </p>
              <p>
                Akibatnya berantai: satu peti yang matang lebih cepat memicu peti di sebelahnya.
                Pengapalan yang berangkat prima bisa tiba dalam kondisi lewat matang — dan nilainya
                jatuh sebelum sempat ditawar.
              </p>
            </div>
          </div>

          {/* Angka kerugian, dibaca sebagai lembar temuan */}
          <div className="border-t border-white/15">
            {losses.map((item, i) => (
              <div
                key={item.label}
                className="group relative flex gap-6 border-b border-white/15 py-7 transition-colors duration-300 hover:bg-white/[0.04]"
              >
                <span
                  aria-hidden="true"
                  className="absolute top-0 left-0 h-full w-[2px] scale-y-0 bg-lime transition-transform duration-300 group-hover:scale-y-100"
                />
                <div className="flex shrink-0 flex-col items-center gap-3 pl-1">
                  <span className="tech text-[0.6875rem] font-semibold text-lime">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-lime/80">{item.icon}</span>
                </div>
                <div>
                  <div className="mb-2 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span className="tech text-2xl font-semibold tracking-tight text-white md:text-[1.75rem]">
                      {item.value}
                    </span>
                    <span className="tech-label font-semibold text-lime">{item.label}</span>
                  </div>
                  <p className="text-sm leading-relaxed text-white/62">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Problem;
