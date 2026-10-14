// /faq adalah client component, jadi metadatanya dipasang di layout ini.
export const metadata = {
  title: 'Pertanyaan Teknis',
  description:
    'Jawaban teknis EthyleneAbsorber: cara pakai, masa efektif 30–45 hari, keamanan pangan (BPOM, FDA, EU, JHOSPA), dosis muatan curah, dan dokumen ekspor.',
  alternates: { canonical: 'https://absorber-dickson.pintuweb.id/faq' },
};

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return children;
}
