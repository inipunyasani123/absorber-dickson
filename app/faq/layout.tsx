import { meta } from '@/lib/seo';

// /faq adalah client component, jadi metadatanya dipasang di layout ini.
export const metadata = meta({
  title: 'Pertanyaan Teknis',
  description:
    'Jawaban teknis EthyleneAbsorber: cara pakai, masa efektif 30–45 hari, keamanan pangan (BPOM, FDA, EU, JHOSPA), dosis curah, dan dokumen ekspor.',
  path: '/faq',
});

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return children;
}
