import React from 'react';

/* ============================================================================
   Primitif bahasa desain "Lembar Data".
   Semua bagian halaman memakai kepala bagian yang sama supaya halaman terbaca
   sebagai satu dokumen teknis, bukan kumpulan section yang berbeda gaya.
   ========================================================================== */

type Tone = 'light' | 'dark';

/** Penanda bagian: nomor lembar + label kapital, seperti kop gambar teknik. */
export function Eyebrow({
  no,
  children,
  tone = 'light',
}: {
  no: string;
  children: React.ReactNode;
  tone?: Tone;
}) {
  const accent = tone === 'dark' ? 'text-lime' : 'text-brand';
  const border = tone === 'dark' ? 'border-lime/45' : 'border-brand/40';
  const rule = tone === 'dark' ? 'bg-lime/45' : 'bg-brand/40';

  return (
    <p className="mb-5 flex items-center gap-3">
      <span
        className={`tech inline-flex h-[1.375rem] items-center justify-center border px-1.5 text-[0.6875rem] font-semibold ${border} ${accent}`}
      >
        {no}
      </span>
      <span aria-hidden="true" className={`h-px w-7 ${rule}`} />
      <span className={`tech-label font-semibold ${accent}`}>{children}</span>
    </p>
  );
}

/** Kepala bagian lengkap: penanda, judul, pengantar, dan tautan opsional. */
export function SectionHead({
  no,
  eyebrow,
  title,
  lead,
  action,
  tone = 'light',
  className = '',
}: {
  no: string;
  eyebrow: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  action?: React.ReactNode;
  tone?: Tone;
  className?: string;
}) {
  const titleColor = tone === 'dark' ? 'text-white' : 'text-ink';
  const leadColor = tone === 'dark' ? 'text-white/70' : 'text-slate-600';

  return (
    <div className={`flex flex-col gap-6 md:flex-row md:items-end md:justify-between ${className}`}>
      <div className="max-w-2xl">
        <Eyebrow no={no} tone={tone}>
          {eyebrow}
        </Eyebrow>
        <h2
          className={`text-3xl leading-[1.14] font-extrabold md:text-4xl lg:text-[2.6rem] ${titleColor}`}
        >
          {title}
        </h2>
        {lead && <p className={`mt-5 leading-relaxed ${leadColor}`}>{lead}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

/** Rel penggaris — pemisah bagian yang membawa satuan ukur. */
export function TickRail({
  tone = 'light',
  className = '',
}: {
  tone?: Tone;
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={`tick-rail w-full ${tone === 'dark' ? 'text-lime' : 'text-ink'} ${className}`}
    />
  );
}

/** Baris spesifikasi: parameter — nilai — catatan. */
export function SpecRow({
  param,
  value,
  note,
}: {
  param: string;
  value: string;
  note?: string;
}) {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-x-4 gap-y-1 border-b border-ink/10 py-3.5 last:border-b-0 sm:grid-cols-[minmax(0,0.9fr)_minmax(0,0.7fr)_minmax(0,1.4fr)] sm:gap-6">
      <dt className="tech-label pt-0.5 font-semibold text-slate-500">{param}</dt>
      <dd className="tech text-right text-sm font-semibold text-ink sm:text-left">{value}</dd>
      {note && <dd className="col-span-2 text-sm leading-relaxed text-slate-600 sm:col-span-1">{note}</dd>}
    </div>
  );
}
