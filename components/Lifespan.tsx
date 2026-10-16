import React from 'react';
import { SectionHead, SpecRow } from '@/components/ui';

/* Skala gambar: 0–50 hari dipetakan ke 0–100%.
   Batas 50 memberi ruang agar label "Hari 45" dan zona "Ganti" tidak
   terpotong di tepi kanan gambar pada layar sempit. */
const SPAN = 50;
// Dibulatkan dua desimal agar tidak muncul sisa pembulatan biner di atribut style.
const pos = (day: number) => `${Math.round((day / SPAN) * 10000) / 100}%`;

const dayMarks = [0, 15, 30, 45];

const zones = [
  { from: 0, to: 30, label: 'Masa efektif terjamin', tone: 'brand' },
  { from: 30, to: 45, label: 'Perpanjangan — kondisi ideal', tone: 'slate' },
  { from: 45, to: SPAN, label: 'Ganti', tone: 'muted' },
];

const specs = [
  { param: 'Cakupan per sachet', value: '1–2 m³', note: 'Kemasan atau kontainer harus tertutup rapat agar penyerapan optimal.' },
  { param: 'Masa efektif', value: '30 hari', note: 'Terhitung sejak sachet dikeluarkan dari kemasan aslinya.' },
  { param: 'Kondisi ideal', value: '45 hari', note: 'Suhu ruang dengan kelembapan normal, tanpa paparan matahari langsung.' },
  { param: 'Simpan belum dibuka', value: '2 tahun', note: 'Dalam kemasan asli, di tempat sejuk dan kering.' },
  { param: 'Bahan aktif', value: 'KMnO₄', note: 'Kalium permanganat, terbungkus material food-grade dan tidak kontak langsung dengan pangan.' },
  { param: 'Arah reaksi', value: 'Searah', note: 'Oksidasi tidak dapat berbalik — gas yang terserap tidak terlepas kembali.' },
  { param: 'Hasil mulai terlihat', value: '24–48 jam', note: 'Perbedaan kesegaran tampak pada dua hari pertama penggunaan.' },
];

const legend = [
  { color: 'var(--color-kmno4)', title: 'Ungu pekat', desc: 'Sachet baru, daya serap penuh.' },
  { color: '#8a6270', title: 'Ungu kecokelatan', desc: 'Terpakai sebagian, masih bekerja.' },
  { color: 'var(--color-spent)', title: 'Cokelat', desc: 'Jenuh — saatnya diganti.' },
];

const Lifespan = () => {
  return (
    <section id="masa-pakai" className="relative overflow-hidden bg-paper py-16 md:py-32">
      <div aria-hidden="true" className="bp-grid absolute inset-0" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHead
          no="03"
          eyebrow="Masa Pakai"
          title={
            <>
              Umur pakai yang bisa dibaca
              <br className="hidden sm:block" /> langsung dari warnanya
            </>
          }
          lead="Sachet tidak berhenti bekerja diam-diam. Kalium permanganat di dalamnya berubah warna seiring gas yang dioksidasi — dari ungu pekat saat baru menjadi cokelat ketika daya serapnya habis. Tidak perlu alat ukur untuk tahu kapan harus diganti."
          className="mb-10 md:mb-14"
        />

        {/* ------------------------------------------------------------------ */}
        {/* Gambar 02 — rel indikator terhadap waktu                            */}
        {/* ------------------------------------------------------------------ */}
        <figure className="corner-frame bg-white p-6 shadow-[0_20px_60px_-34px_rgba(0,60,92,0.45)] ring-1 ring-ink/10 sm:p-9">
          <figcaption className="mb-8 flex flex-wrap items-baseline justify-between gap-3">
            <span className="tech-label font-semibold text-slate-500">
              Gbr. 02 — Warna indikator terhadap hari pemakaian
            </span>
            <span className="tech-label text-slate-500">Satuan: hari</span>
          </figcaption>

          {/* ---------------------------------------------------------------- */}
          {/* Varian tegak — layar sempit. Sumbu waktu mengalir ke bawah        */}
          {/* supaya seluruh rentang 0–45 hari terbaca tanpa geser ke samping.  */}
          {/* ---------------------------------------------------------------- */}
          <div className="md:hidden">
            {/* Lebar kolom hari ditetapkan, bukan `auto`: isinya diposisikan
                absolut sehingga tidak ikut menentukan lebar trek grid. */}
            <div className="relative grid h-[27rem] grid-cols-[4.75rem_2.25rem_minmax(0,1fr)] gap-x-3">
              {/* Skala hari */}
              <div className="relative">
                {dayMarks.map((d) => (
                  <span
                    key={d}
                    className="absolute right-0 flex -translate-y-1/2 items-center gap-2"
                    style={{ top: pos(d) }}
                  >
                    <span className="tech-label whitespace-nowrap text-slate-500">Hari {d}</span>
                    <span aria-hidden="true" className="h-px w-2 bg-ink/35" />
                  </span>
                ))}
              </div>

              {/* Rel gradien reaksi */}
              <div className="relative">
                <div aria-hidden="true" className="indicator-rail-v h-full w-full" />
                {dayMarks.slice(1).map((d) => (
                  <span
                    key={d}
                    aria-hidden="true"
                    className="absolute inset-x-0 h-px bg-white/55"
                    style={{ top: pos(d) }}
                  />
                ))}
                {/* Batas akhir masa efektif */}
                <span
                  aria-hidden="true"
                  className="absolute -inset-x-1 h-0.5 bg-ink"
                  style={{ top: pos(30) }}
                />
                {/* Rentang pengapalan, ditandai langsung di atas rel */}
                <span
                  aria-hidden="true"
                  className="absolute -inset-x-0.5 border-y-2 border-white bg-white/25"
                  style={{ top: pos(21), height: `calc(${pos(28)} - ${pos(21)})` }}
                />
              </div>

              {/* Zona pemakaian + anotasi pengapalan */}
              <div className="relative">
                {zones.map((z) => (
                  <div
                    key={z.label}
                    className="absolute inset-x-0 pl-3"
                    style={{ top: pos(z.from), height: `calc(${pos(z.to)} - ${pos(z.from)})` }}
                  >
                    <span
                      aria-hidden="true"
                      className={`absolute top-0 left-0 h-full w-[2px] ${
                        z.tone === 'brand'
                          ? 'bg-brand'
                          : z.tone === 'slate'
                            ? 'bg-ink/30'
                            : 'bg-ink/12'
                      }`}
                    />
                    <span
                      className={`tech-label block leading-[1.45] ${
                        z.tone === 'brand' ? 'text-brand' : 'text-slate-500'
                      }`}
                    >
                      {z.label}
                    </span>
                  </div>
                ))}

                <span
                  className="tech-label absolute right-0 left-3 leading-[1.45] text-ink"
                  style={{ top: `calc(${pos(21)} + 0.35rem)` }}
                >
                  ↖ Pengapalan laut 3–4 minggu
                </span>
              </div>
            </div>
          </div>

          {/* Varian mendatar — mulai md, saat lebarnya sudah mencukupi */}
          <div className="hidden md:block">
            <div className="min-w-[34rem]">
              {/* Anotasi durasi pengapalan laut */}
              <div className="relative mb-3 h-11">
                <div
                  className="absolute top-0"
                  style={{ left: pos(21), width: `calc(${pos(28)} - ${pos(21)})` }}
                >
                  <span className="tech-label block whitespace-nowrap text-ink">
                    Pengapalan laut 3–4 minggu
                  </span>
                  <span className="mt-2 flex items-center">
                    <span className="h-2.5 w-px bg-ink/45" />
                    <span className="h-px flex-1 bg-ink/45" />
                    <span className="h-2.5 w-px bg-ink/45" />
                  </span>
                </div>
              </div>

              {/* Rel gradien reaksi */}
              <div className="relative">
                <div aria-hidden="true" className="indicator-rail h-16 w-full" />

                {/* Garis penanda hari di atas rel */}
                {dayMarks.slice(1).map((d) => (
                  <span
                    key={d}
                    aria-hidden="true"
                    className="absolute top-0 h-16 w-px bg-white/55"
                    style={{ left: pos(d) }}
                  />
                ))}

                {/* Batas akhir masa efektif ditegaskan */}
                <span
                  aria-hidden="true"
                  className="absolute -top-1 h-18 w-0.5 bg-ink"
                  style={{ left: pos(30) }}
                />
              </div>

              {/* Skala hari */}
              <div className="relative mt-2 h-9">
                {dayMarks.map((d, i) => {
                  // Label terakhir dirapatkan ke kiri tanda agar tidak melewati tepi gambar.
                  const last = i === dayMarks.length - 1;
                  return (
                    <span
                      key={d}
                      className={`absolute top-0 flex flex-col ${last ? 'items-end' : 'items-start'}`}
                      style={last ? { right: `calc(100% - ${pos(d)})` } : { left: pos(d) }}
                    >
                      <span aria-hidden="true" className="h-2 w-px bg-ink/35" />
                      <span className="tech-label mt-1.5 whitespace-nowrap text-slate-500">
                        Hari {d}
                      </span>
                    </span>
                  );
                })}
              </div>

              {/* Zona pemakaian */}
              <div className="mt-3 flex">
                {zones.map((z) => (
                  <div
                    key={z.label}
                    className="pr-2"
                    style={{ width: `calc(${pos(z.to)} - ${pos(z.from)})` }}
                  >
                    <span
                      aria-hidden="true"
                      className={`block h-1 ${
                        z.tone === 'brand'
                          ? 'bg-brand'
                          : z.tone === 'slate'
                            ? 'bg-ink/30'
                            : 'bg-ink/12'
                      }`}
                    />
                    <span
                      className={`tech-label mt-2 block leading-[1.5] ${
                        z.tone === 'brand' ? 'text-brand' : 'text-slate-500'
                      }`}
                    >
                      {z.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <p className="mt-8 border-t border-ink/10 pt-6 text-sm leading-relaxed text-slate-600">
            <strong className="font-bold text-ink">Cara membaca gambar ini.</strong> Perjalanan ekspor
            jalur laut selama 3–4 minggu selesai sebelum sachet mencapai batas 30 hari. Artinya satu
            sachet menutup seluruh pelayaran tanpa penggantian di tengah jalan — dan masih menyisakan
            margin bila kapal tertahan di pelabuhan.
          </p>
        </figure>

        {/* ------------------------------------------------------------------ */}
        {/* Tabel spesifikasi + legenda warna                                   */}
        {/* ------------------------------------------------------------------ */}
        <div className="mt-14 grid gap-10 lg:grid-cols-[minmax(0,1.45fr)_minmax(0,0.55fr)] lg:gap-14">
          <div>
            <h3 className="tech-label mb-5 border-b-2 border-ink/12 pb-4 font-semibold text-ink">
              Tabel 01 — Spesifikasi ringkas
            </h3>
            <dl>
              {specs.map((s) => (
                <SpecRow key={s.param} param={s.param} value={s.value} note={s.note} />
              ))}
            </dl>
          </div>

          <div className="bg-ink p-7 text-white">
            <h3 className="tech-label mb-6 font-semibold text-lime">Membaca indikator</h3>
            <ul className="space-y-6">
              {legend.map((l) => (
                <li key={l.title} className="flex gap-4">
                  <span
                    aria-hidden="true"
                    className="mt-0.5 h-7 w-7 shrink-0 rounded-full ring-2 ring-white/20"
                    style={{ background: l.color }}
                  />
                  <div>
                    <p className="text-sm font-bold">{l.title}</p>
                    <p className="mt-1 text-[0.8125rem] leading-relaxed text-white/65">{l.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
            <p className="mt-7 border-t border-white/15 pt-5 text-[0.8125rem] leading-relaxed text-white/60">
              Indikator terbaca tanpa membuka kemasan produk, sehingga pemeriksaan rutin tidak
              mengganggu rantai dingin.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Lifespan;
