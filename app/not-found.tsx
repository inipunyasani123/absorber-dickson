import Link from 'next/link';
import PageHead from '@/components/PageHead';

export const metadata = {
  title: { absolute: 'Halaman tidak ditemukan · Dickson Synergy' },
  robots: { index: false, follow: true },
};

/* 404 bergaya lembar data: kode dokumen yang dicari tidak ada di arsip. */
export default function NotFound() {
  return (
    <div className="bg-white">
      <PageHead
        doc="404"
        eyebrow="Dokumen tidak ditemukan"
        title="Lembar ini tidak ada di arsip"
        intro="Alamatnya mungkin salah ketik, atau dokumennya sudah dipindah. Mulai lagi dari salah satu berkas di bawah."
      />
      <section className="relative bg-paper py-14 md:py-20">
        <div aria-hidden="true" className="bp-grid absolute inset-0" />
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
        <ul className="grid gap-px border border-ink/12 bg-ink/12 sm:grid-cols-3">
          {[
            ['K-00', 'Katalog & lembar data', '/produk'],
            ['CT-00', 'Catatan teknis', '/catatan-teknis'],
            ['Form EA-01', 'Permintaan sample', '/kontak'],
          ].map(([kode, label, href]) => (
            <li key={href}>
              <Link href={href} className="flex h-full flex-col gap-2 bg-white p-6 transition-colors hover:bg-mint">
                <span className="tech-label font-semibold text-brand">{kode}</span>
                <span className="font-bold text-ink">{label} →</span>
              </Link>
            </li>
          ))}
        </ul>
        </div>
      </section>
    </div>
  );
}
