'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Check, ArrowRight, Loader2 } from 'lucide-react'

/* Volume acuan untuk mengisi kolom "Volume ruang". Angkanya sama dengan
   CT-01: satu sachet untuk 1–2 m³, jadi rentangnya volume ÷ 2 sampai volume ÷ 1. */
const acuan = [
  { ruang: 'Kontainer 20 ft', volume: '± 33 m³', sachet: '17 – 33' },
  { ruang: 'Kontainer 40 ft', volume: '± 67 m³', sachet: '34 – 67' },
  { ruang: 'Kontainer 40 ft HC', volume: '± 76 m³', sachet: '38 – 76' },
  { ruang: 'Ruang simpan / cold storage', volume: 'P × L × T', sachet: '÷ 2 s.d. ÷ 1' },
]

const alurKerja = [
  {
    no: '01',
    title: 'Formulir masuk',
    desc: 'Permintaan tercatat beserta komoditas, volume ruang, dan rute yang Anda isikan.',
  },
  {
    no: '02',
    title: 'Perhitungan dosis',
    desc: 'Tim teknis menyusun kebutuhan sachet berdasarkan volume dan laju pelepasan etilen komoditas Anda.',
  },
  {
    no: '03',
    title: 'Sample dikirim',
    desc: 'Sample beserta lembar data dan salinan sertifikat dikirim untuk diuji di fasilitas Anda.',
  },
  {
    no: '04',
    title: 'Uji pembanding',
    desc: 'Bandingkan satu peti berperlakuan dengan satu peti kontrol sebelum memutuskan pembelian.',
  },
]

export default function ContactPage() {
  const [form, setForm] = useState({
    nama: '',
    perusahaan: '',
    email: '',
    telepon: '',
    komoditas: '',
    volume: '',
    rute: '',
    pesan: '',
  })
  const [mengirim, setMengirim] = useState(false)
  const [terkirim, setTerkirim] = useState(false)

  const ubah = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }))

  const kirim = (e: React.FormEvent) => {
    e.preventDefault()
    setMengirim(true)
    // Purwarupa desain — pengiriman disimulasikan, tanpa backend.
    setTimeout(() => {
      setMengirim(false)
      setTerkirim(true)
    }, 1200)
  }

  return (
    <div className="bg-white">
      {/* ------------------------------------------------------------------ */}
      {/* Kop dokumen + formulir                                              */}
      {/* ------------------------------------------------------------------ */}
      <header className="relative overflow-hidden bg-ink text-white">
        <div aria-hidden="true" className="bp-grid-dark absolute inset-0" />
        <div
          aria-hidden="true"
          className="hatch hatch-lime absolute inset-y-0 right-0 w-1/4"
          style={{ clipPath: 'polygon(45% 0, 100% 0, 100% 100%, 0 100%)' }}
        />

        <div className="relative z-10 mx-auto max-w-7xl px-6 pt-36 pb-20 md:pt-44 md:pb-24 lg:px-10">
          <div className="grid items-start gap-14 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-20">
            <div className="lg:pt-4">
              <p className="mb-6 flex items-center gap-3">
                <span className="tech inline-flex h-[1.375rem] items-center justify-center border border-lime/45 px-1.5 text-[0.6875rem] font-semibold text-lime">
                  07
                </span>
                <span aria-hidden="true" className="h-px w-7 bg-lime/45" />
                <span className="tech-label font-semibold text-lime">Permintaan Sample</span>
              </p>

              <h1 className="text-[2.25rem] leading-[1.08] font-extrabold sm:text-5xl lg:text-[3.1rem]">
                Sebutkan muatannya.
                <br />
                <span className="text-lime">Kami hitung dosisnya.</span>
              </h1>

              <p className="mt-6 max-w-lg leading-relaxed text-white/72">
                Kami tidak menjual berdasarkan perkiraan. Isi komoditas, volume ruang, dan rute
                distribusi Anda — tim teknis mengembalikan perhitungan kebutuhan sachet beserta
                sample untuk diuji sendiri.
              </p>

              {/* Alur kerja setelah formulir dikirim */}
              <ol className="mt-12 border-t border-white/15">
                {alurKerja.map((s) => (
                  <li key={s.no} className="flex gap-5 border-b border-white/15 py-5">
                    <span className="tech shrink-0 pt-0.5 text-[0.6875rem] font-semibold text-lime">
                      {s.no}
                    </span>
                    <div>
                      <p className="text-sm font-bold text-white">{s.title}</p>
                      <p className="mt-1 text-[0.8125rem] leading-relaxed text-white/62">
                        {s.desc}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            {/* Formulir */}
            <div className="corner-frame bg-white p-6 shadow-2xl sm:p-9">
              <div className="mb-7 flex items-baseline justify-between border-b border-ink/12 pb-5">
                <h2 className="text-lg font-extrabold text-ink">Formulir Permintaan</h2>
                <span className="tech-label text-slate-500">Form EA-01</span>
              </div>

              <AnimatePresence mode="wait">
                {terkirim ? (
                  <motion.div
                    key="sukses"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="py-10 text-center"
                  >
                    <span className="mx-auto mb-6 flex h-16 w-16 items-center justify-center bg-brand text-white">
                      <Check size={30} strokeWidth={2.5} />
                    </span>
                    <h3 className="mb-3 text-xl font-extrabold text-ink">Permintaan tercatat</h3>
                    <p className="mx-auto max-w-sm text-sm leading-relaxed text-slate-600">
                      Terima kasih. Halaman ini konsep desain untuk kontes, jadi formulir belum
                      tersambung dan data muatan Anda tidak terkirim ke tim teknis.
                    </p>
                    <button
                      onClick={() => setTerkirim(false)}
                      className="tech-label mt-8 border border-ink/20 px-5 py-2.5 font-semibold text-ink transition-colors hover:border-brand hover:text-brand"
                    >
                      Isi permintaan lain
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={kirim}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-5"
                  >
                    <div className="grid gap-5 sm:grid-cols-2">
                      <Field
                        label="Nama lengkap"
                        name="nama"
                        value={form.nama}
                        onChange={ubah}
                        placeholder="Nama Anda"
                        required
                      />
                      <Field
                        label="Perusahaan"
                        name="perusahaan"
                        value={form.perusahaan}
                        onChange={ubah}
                        placeholder="Nama perusahaan"
                        required
                      />
                      <Field
                        label="Surel"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={ubah}
                        placeholder="nama@perusahaan.com"
                        required
                      />
                      <Field
                        label="Telepon"
                        name="telepon"
                        type="tel"
                        value={form.telepon}
                        onChange={ubah}
                        placeholder="+62 …"
                        required
                      />
                    </div>

                    <div className="border-t border-ink/12 pt-5">
                      <p className="tech-label mb-4 font-semibold text-brand">Data muatan</p>
                      <div className="grid gap-5 sm:grid-cols-2">
                        <Field
                          label="Komoditas"
                          name="komoditas"
                          value={form.komoditas}
                          onChange={ubah}
                          placeholder="Mis. manggis, pisang"
                          required
                        />
                        <Field
                          label="Volume ruang (m³)"
                          name="volume"
                          type="number"
                          min="1"
                          value={form.volume}
                          onChange={ubah}
                          placeholder="Mis. 33"
                          hint="Kontainer 20 ft ±33 m³ · 40 ft ±67 m³"
                          required
                        />
                      </div>
                      <div className="mt-5">
                        <Field
                          label="Rute distribusi"
                          name="rute"
                          value={form.rute}
                          onChange={ubah}
                          placeholder="Mis. Surabaya → Yokohama, laut 3 minggu"
                          required
                        />
                      </div>
                    </div>

                    <div className="border-t border-ink/12 pt-5">
                      <label
                        htmlFor="pesan"
                        className="tech-label mb-2.5 block font-semibold text-slate-500"
                      >
                        Catatan tambahan
                      </label>
                      <textarea
                        id="pesan"
                        name="pesan"
                        rows={4}
                        value={form.pesan}
                        onChange={ubah}
                        placeholder="Kendala yang pernah dialami, target masa simpan, atau dokumen yang Anda perlukan."
                        className="w-full resize-y border border-ink/15 bg-paper px-4 py-3 text-sm text-ink placeholder:text-slate-500 focus:border-brand focus:outline-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={mengirim}
                      className="flex w-full items-center justify-center gap-2 rounded-sm bg-brand py-4 text-sm font-bold text-white transition-colors duration-300 hover:bg-brand-deep disabled:opacity-70"
                    >
                      {mengirim ? (
                        <>
                          <Loader2 size={16} className="animate-spin" strokeWidth={2.5} />
                          Mengirim…
                        </>
                      ) : (
                        <>
                          <Send size={16} strokeWidth={2.5} />
                          Kirim Permintaan Sample
                        </>
                      )}
                    </button>

                    <p className="tech-label leading-[1.6] text-slate-500">
                      Purwarupa desain — pengiriman formulir disimulasikan dan data tidak tersimpan.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </header>

      {/* ------------------------------------------------------------------ */}
      {/* Volume acuan                                                         */}
      {/* ------------------------------------------------------------------ */}
      <section className="relative overflow-hidden bg-paper py-20 md:py-28">
        <div aria-hidden="true" className="bp-grid absolute inset-0" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mb-8 flex flex-col gap-3 border-b-2 border-ink/12 pb-4 sm:flex-row sm:items-baseline sm:justify-between">
            <h2 className="tech-label font-semibold text-ink">Tabel 02 — Volume acuan untuk formulir</h2>
            <p className="tech-label text-slate-500">1 sachet = 1–2 m³ ruang tertutup</p>
          </div>

          <dl className="grid grid-cols-2 gap-px border border-ink/12 bg-ink/12 lg:grid-cols-4">
            {acuan.map((a) => (
              <div key={a.ruang} className="bg-white p-4 sm:p-7">
                <dt className="tech-label leading-[1.5] font-semibold text-slate-500">{a.ruang}</dt>
                <dd className="tech mt-3 text-xl font-semibold text-ink sm:text-2xl">{a.volume}</dd>
                <dd className="mt-3 flex flex-col gap-1 border-t border-ink/10 pt-3 sm:flex-row sm:items-baseline sm:justify-between sm:gap-3">
                  <span className="tech-label text-slate-500">Sachet</span>
                  <span className="tech text-sm font-semibold text-brand">{a.sachet}</span>
                </dd>
              </div>
            ))}
          </dl>

          <p className="mt-5 max-w-3xl text-sm leading-relaxed text-slate-600">
            Batas atas untuk komoditas penghasil etilen tinggi atau muatan yang rapat; batas bawah
            untuk komoditas yang lebih tenang. Cara menghitungnya ada di{' '}
            <Link href="/catatan-teknis/dosis-kontainer-20-dan-40-ft" className="font-semibold text-brand underline-offset-4 hover:underline">
              CT-01
            </Link>
            .
          </p>

          {/* Arahan sebelum menghubungi */}
          <div className="mt-12 flex flex-col gap-6 border-l-2 border-brand bg-white px-8 py-7 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-2xl">
              <p className="tech-label mb-2.5 font-semibold text-brand">Sebelum menghubungi</p>
              <p className="text-sm leading-relaxed text-slate-700">
                Pertanyaan soal dosis, masa efektif, keamanan pangan, dan dokumen ekspor sudah
                terjawab lengkap beserta angkanya di lembar tanya jawab teknis.
              </p>
            </div>
            <Link
              href="/faq"
              className="inline-flex shrink-0 items-center gap-2 text-sm font-bold text-brand underline-offset-4 hover:underline min-h-11"
            >
              Buka lembar tanya jawab
              <ArrowRight size={15} strokeWidth={2.5} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

/* Satu gaya isian untuk seluruh formulir. */
function Field({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = 'text',
  required = false,
  hint,
  min,
}: {
  label: string
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  type?: string
  required?: boolean
  hint?: string
  min?: string
}) {
  return (
    <div>
      <label htmlFor={name} className="tech-label mb-2.5 block font-semibold text-slate-500">
        {label}
        {required && <span className="ml-1 text-brand">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        min={min}
        required={required}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full border border-ink/15 bg-paper px-4 py-3 text-sm text-ink placeholder:text-slate-500 focus:border-brand focus:outline-none"
      />
      {hint && <p className="tech-label mt-2 leading-[1.5] text-slate-500">{hint}</p>}
    </div>
  )
}
