'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Search, Plus, FileText, ArrowRight } from 'lucide-react'

type Kategori = 'produk' | 'penggunaan' | 'pengiriman' | 'keamanan'

const FAQ_DATA: {
  id: number
  kategori: Kategori
  question: string
  answer: string
  meta?: { label: string; value: string }[]
}[] = [
  {
    id: 1,
    kategori: 'produk',
    question: 'Apa itu ethylene absorber?',
    answer:
      'Ethylene absorber adalah sachet penyerap gas etilen — hormon gas yang dilepas buah dan sayur dan yang memicu pematangan. Dengan menahan gas tersebut, masa kesegaran produk segar dapat diperpanjang 2–3 kali lipat dibanding tanpa perlakuan.',
    meta: [
      { label: 'Bahan aktif', value: 'Kalium permanganat' },
      { label: 'Arah reaksi', value: 'Searah (oksidasi)' },
    ],
  },
  {
    id: 2,
    kategori: 'penggunaan',
    question: 'Bagaimana cara penggunaannya?',
    answer:
      'Tempatkan sachet di dalam kemasan, peti, atau kontainer berisi komoditas yang ingin dijaga. Satu sachet efektif untuk ruang bervolume 1–2 m³. Pastikan kemasan tertutup rapat agar penyerapan berjalan optimal. Produk mulai bekerja segera setelah dikeluarkan dari kemasan aslinya.',
    meta: [{ label: 'Cakupan', value: '1–2 m³ per sachet' }],
  },
  {
    id: 3,
    kategori: 'produk',
    question: 'Berapa lama masa efektifnya?',
    answer:
      'Masa efektif standar adalah 30 hari setelah dibuka. Pada kondisi penyimpanan ideal — suhu ruang dengan kelembapan normal — produk dapat bertahan hingga 45 hari. Sachet dilengkapi indikator warna yang berubah dari ungu menjadi cokelat ketika daya serapnya habis, sehingga penggantian tidak perlu ditebak.',
    meta: [
      { label: 'Standar', value: '30 hari' },
      { label: 'Kondisi ideal', value: '45 hari' },
    ],
  },
  {
    id: 4,
    kategori: 'keamanan',
    question: 'Apakah aman untuk produk pangan?',
    answer:
      'Aman. Produk terdaftar di BPOM RI dengan nomor NA18191100273 dan memenuhi standar keamanan pangan internasional: FDA 21 CFR 175.300, EU No 10/2011, serta JHOSPA Jepang. Bahan aktif tidak bersentuhan langsung dengan pangan karena terbungkus material food-grade.',
    meta: [
      { label: 'BPOM RI', value: 'NA18191100273' },
      { label: 'FDA', value: '21 CFR 175.300' },
      { label: 'Uni Eropa', value: 'EU No 10/2011' },
      { label: 'JHOSPA', value: 'Jepang' },
    ],
  },
  {
    id: 5,
    kategori: 'keamanan',
    question: 'Apakah memengaruhi rasa buah?',
    answer:
      'Tidak. Produk hanya menyerap gas etilen dari udara di sekitarnya tanpa mengubah komposisi kimia buah. Uji organoleptik tidak menunjukkan perbedaan rasa, aroma, maupun tekstur antara komoditas yang diberi perlakuan dan yang tidak.',
  },
  {
    id: 6,
    kategori: 'pengiriman',
    question: 'Dapatkah digunakan untuk pengiriman ekspor?',
    answer:
      'Ya, dan justru di situlah manfaatnya paling terasa. Pengapalan jalur laut umumnya menempuh 3–4 minggu — selesai sebelum sachet mencapai batas 30 hari. Artinya satu sachet menutup seluruh pelayaran tanpa penggantian di tengah jalan, dan masih menyisakan margin bila kapal tertahan di pelabuhan.',
    meta: [{ label: 'Durasi pelayaran', value: '3–4 minggu' }],
  },
  {
    id: 7,
    kategori: 'penggunaan',
    question: 'Berapa lama sampai hasilnya terlihat?',
    answer:
      'Perbedaan mulai tampak pada 24–48 jam pertama pemakaian. Komoditas yang biasanya menunjukkan tanda pembusukan pada hari ketiga umumnya masih layak hingga hari ketujuh atau lebih, bergantung jenis komoditas dan kondisi penyimpanan.',
    meta: [{ label: 'Terlihat dalam', value: '24–48 jam' }],
  },
  {
    id: 8,
    kategori: 'penggunaan',
    question: 'Bagaimana menyimpan sachet yang belum dipakai?',
    answer:
      'Simpan dalam kemasan aslinya di tempat sejuk dan kering, jauh dari sinar matahari langsung. Sachet yang belum dibuka memiliki masa simpan 2 tahun. Setelah dibuka, gunakan segera — sachet yang sudah terpapar udara tidak dapat disimpan kembali karena reaksinya sudah berjalan.',
    meta: [{ label: 'Simpan belum dibuka', value: '2 tahun' }],
  },
  {
    id: 9,
    kategori: 'penggunaan',
    question: 'Bagaimana menghitung dosis untuk muatan curah?',
    answer:
      'Dasarnya tetap volume ruang, bukan berat muatan: satu sachet per 1–2 m³ ruang tertutup. Untuk kontainer 20 ft (±33 m³) dan 40 ft (±67 m³), perhitungan disesuaikan dengan kepadatan susunan peti dan jenis komoditas, karena laju pelepasan etilen berbeda antar komoditas. Tim teknis kami menyiapkan perhitungan dosis tertulis sebelum pengiriman pertama.',
    meta: [
      { label: 'Kontainer 20 ft', value: '±33 m³' },
      { label: 'Kontainer 40 ft', value: '±67 m³' },
    ],
  },
  {
    id: 10,
    kategori: 'pengiriman',
    question: 'Dokumen apa yang disertakan untuk keperluan ekspor?',
    answer:
      'Setiap pengiriman dapat dilengkapi lembar data teknis, salinan registrasi BPOM, serta pernyataan kesesuaian terhadap FDA 21 CFR 175.300 dan EU No 10/2011. Dokumen ini yang biasanya diminta saat audit buyer, sehingga kami menyiapkannya sejak awal alih-alih menunggu permintaan.',
  },
  {
    id: 11,
    kategori: 'produk',
    question: 'Apakah bisa dipakai bersama desiccant?',
    answer:
      'Bisa, dan sering kali memang perlu. Etilen dan kelembapan adalah dua masalah berbeda: ethylene absorber menahan pemicu pematangan, sementara desiccant seperti Container Dry® II atau Desi Pak® menahan uap air yang memicu jamur dan embun kontainer. Keduanya bekerja pada media berbeda dan tidak saling mengganggu.',
  },
]

const KATEGORI: { id: 'all' | Kategori; name: string }[] = [
  { id: 'all', name: 'Semua' },
  { id: 'produk', name: 'Produk' },
  { id: 'penggunaan', name: 'Penggunaan' },
  { id: 'pengiriman', name: 'Pengiriman' },
  { id: 'keamanan', name: 'Keamanan' },
]

export default function FAQPage() {
  const [activeId, setActiveId] = useState<number | null>(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [kategori, setKategori] = useState<'all' | Kategori>('all')

  // Penyaringan nyata: kategori melekat pada tiap entri, bukan ditebak dari nomor.
  const filtered = useMemo(() => {
    const q = searchTerm.trim().toLowerCase()
    return FAQ_DATA.filter((f) => {
      const cocokKata =
        !q || f.question.toLowerCase().includes(q) || f.answer.toLowerCase().includes(q)
      const cocokKategori = kategori === 'all' || f.kategori === kategori
      return cocokKata && cocokKategori
    })
  }, [searchTerm, kategori])

  return (
    <div className="bg-white">
      {/* ------------------------------------------------------------------ */}
      {/* Kop dokumen                                                         */}
      {/* ------------------------------------------------------------------ */}
      <header className="relative overflow-hidden bg-ink text-white">
        <div aria-hidden="true" className="bp-grid-dark absolute inset-0" />
        <div
          aria-hidden="true"
          className="hatch hatch-lime absolute inset-y-0 right-0 w-1/3"
          style={{ clipPath: 'polygon(38% 0, 100% 0, 100% 100%, 0 100%)' }}
        />

        <div className="relative z-10 mx-auto max-w-7xl px-6 pt-36 pb-20 md:pt-44 md:pb-24 lg:px-10">
          <p className="mb-6 flex items-center gap-3">
            <span className="tech inline-flex h-[1.375rem] items-center justify-center border border-lime/45 px-1.5 text-[0.6875rem] font-semibold text-lime">
              06
            </span>
            <span aria-hidden="true" className="h-px w-7 bg-lime/45" />
            <span className="tech-label font-semibold text-lime">Lembar Tanya Jawab</span>
          </p>

          <h1 className="max-w-3xl text-[2.25rem] leading-[1.08] font-extrabold sm:text-5xl lg:text-[3.25rem]">
            Jawaban teknis, lengkap dengan angkanya
          </h1>

          <p className="mt-6 max-w-2xl leading-relaxed text-white/72">
            Sebelas pertanyaan yang paling sering diajukan calon klien, disusun sesuai urutan
            pengambilan keputusan: apa produknya, bagaimana memakainya, bagaimana mengirimnya, dan
            seberapa aman untuk pangan.
          </p>

          <dl className="mt-10 flex flex-wrap gap-x-10 gap-y-4 border-t border-white/15 pt-6">
            <div>
              <dt className="tech-label text-white/60">Dokumen</dt>
              <dd className="tech mt-1 text-sm text-white">EA-FAQ-01</dd>
            </div>
            <div>
              <dt className="tech-label text-white/60">Jumlah entri</dt>
              <dd className="tech mt-1 text-sm text-white">{FAQ_DATA.length}</dd>
            </div>
            <div>
              <dt className="tech-label text-white/60">Reg. BPOM RI</dt>
              <dd className="tech mt-1 text-sm text-lime">NA18191100273</dd>
            </div>
          </dl>
        </div>
      </header>

      {/* ------------------------------------------------------------------ */}
      {/* Penyaring + daftar                                                  */}
      {/* ------------------------------------------------------------------ */}
      <section className="relative overflow-hidden bg-paper py-16 md:py-24">
        <div aria-hidden="true" className="bp-grid absolute inset-0" />

        <div className="relative z-10 mx-auto max-w-5xl px-6 lg:px-10">
          {/* Baris pencarian */}
          <div className="mb-10 border border-ink/12 bg-white p-5 sm:p-6">
            <label htmlFor="cari-faq" className="tech-label mb-3 block font-semibold text-slate-500">
              Cari dalam dokumen
            </label>
            <div className="relative mb-5">
              <Search
                className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-slate-500"
                size={18}
              />
              <input
                id="cari-faq"
                type="search"
                placeholder="Misal: dosis, ekspor, BPOM…"
                className="w-full border border-ink/15 bg-paper py-3.5 pr-4 pl-12 text-sm text-ink placeholder:text-slate-500 focus:border-brand focus:outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {KATEGORI.map((c) => {
                const aktif = kategori === c.id
                return (
                  <button
                    key={c.id}
                    onClick={() => setKategori(c.id)}
                    aria-pressed={aktif}
                    className={`tech-label border px-3.5 py-2 font-semibold transition-colors ${
                      aktif
                        ? 'border-brand bg-brand text-white'
                        : 'border-ink/15 bg-white text-slate-500 hover:border-brand/45 hover:text-brand'
                    }`}
                  >
                    {c.name}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Penghitung hasil */}
          <p className="tech-label mb-4 text-slate-500">
            Menampilkan {filtered.length} dari {FAQ_DATA.length} entri
          </p>

          {/* Daftar akordeon */}
          {filtered.length > 0 ? (
            <div className="border-t-2 border-ink/12 bg-white">
              {filtered.map((faq) => {
                const terbuka = activeId === faq.id
                return (
                  <div key={faq.id} className="border-b border-ink/12">
                    <h2>
                      <button
                        className="flex w-full items-start gap-4 px-5 py-6 text-left sm:px-7"
                        onClick={() => setActiveId(terbuka ? null : faq.id)}
                        aria-expanded={terbuka}
                        aria-controls={`jawaban-${faq.id}`}
                      >
                        <span className="tech mt-1 shrink-0 text-[0.6875rem] font-semibold text-brand">
                          Q{String(faq.id).padStart(2, '0')}
                        </span>
                        <span className="flex-1 text-base font-bold text-ink sm:text-lg">
                          {faq.question}
                        </span>
                        <span
                          aria-hidden="true"
                          className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center border transition-all duration-300 ${
                            terbuka
                              ? 'rotate-45 border-brand bg-brand text-white'
                              : 'border-ink/20 text-ink'
                          }`}
                        >
                          <Plus size={15} strokeWidth={2.5} />
                        </span>
                      </button>
                    </h2>

                    <AnimatePresence initial={false}>
                      {terbuka && (
                        <motion.div
                          id={`jawaban-${faq.id}`}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="px-5 pb-7 sm:px-7 sm:pl-[3.75rem]">
                            <p className="text-sm leading-relaxed text-slate-600">{faq.answer}</p>

                            {faq.meta && (
                              <dl className="mt-5 flex flex-wrap gap-x-8 gap-y-3 border-l-2 border-brand bg-paper py-4 pr-5 pl-5">
                                {faq.meta.map((m) => (
                                  <div key={m.label}>
                                    <dt className="tech-label text-slate-500">{m.label}</dt>
                                    <dd className="tech mt-1 text-[0.8125rem] font-semibold text-ink">
                                      {m.value}
                                    </dd>
                                  </div>
                                ))}
                              </dl>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="border border-ink/12 bg-white px-6 py-16 text-center">
              <span className="mx-auto mb-6 flex h-14 w-14 items-center justify-center border border-ink/15 text-slate-500">
                <Search size={22} />
              </span>
              <h2 className="mb-2 text-lg font-bold text-ink">Entri tidak ditemukan</h2>
              <p className="mx-auto max-w-md text-sm leading-relaxed text-slate-600">
                Tidak ada pertanyaan yang cocok dengan kata kunci tersebut. Coba istilah lain, atau
                tanyakan langsung — pertanyaan baru biasanya kami tambahkan ke dokumen ini.
              </p>
              <button
                onClick={() => {
                  setSearchTerm('')
                  setKategori('all')
                }}
                className="tech-label mt-6 border border-ink/20 px-4 py-2.5 font-semibold text-ink transition-colors hover:border-brand hover:text-brand"
              >
                Atur ulang penyaring
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Penutup                                                             */}
      {/* ------------------------------------------------------------------ */}
      <section className="relative overflow-hidden bg-brand text-white">
        <div aria-hidden="true" className="hatch hatch-white absolute inset-0" />
        <div aria-hidden="true" className="tick-rail absolute inset-x-0 top-0 h-2.5 text-white" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 py-20 md:py-28 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-center">
            <div>
              <p className="tech-label mb-5 font-semibold text-white/70">Belum terjawab</p>
              <h2 className="mb-5 text-3xl leading-[1.14] font-extrabold md:text-4xl">
                Pertanyaan Anda mungkin lebih spesifik dari dokumen ini
              </h2>
              <p className="max-w-xl leading-relaxed text-white/85">
                Komoditas, rute, dan susunan muatan setiap klien berbeda. Sampaikan kondisi Anda dan
                tim teknis akan menjawab dengan perhitungan, bukan perkiraan.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <Link
                href="/kontak"
                className="inline-flex items-center justify-center gap-2 rounded-sm bg-white px-7 py-4 text-sm font-bold text-brand transition-colors duration-300 hover:bg-paper"
              >
                Kirim Pertanyaan Teknis
                <ArrowRight size={16} strokeWidth={2.5} />
              </Link>
              <Link
                href="/catatan-teknis"
                className="inline-flex items-center justify-center gap-2 rounded-sm border-2 border-white/60 px-7 py-4 text-sm font-bold text-white transition-colors duration-300 hover:bg-white/12"
              >
                <FileText size={16} strokeWidth={2.5} />
                Baca Catatan Teknis
              </Link>
              <p className="tech-label mt-2 text-center text-white/75">
                Dijawab tertulis, bersama perhitungan dosis
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
