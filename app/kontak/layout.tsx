import { meta } from '@/lib/seo';

// /kontak adalah client component, jadi metadatanya dipasang di layout ini.
export const metadata = meta({
  title: 'Permintaan Sample',
  description:
    'Ajukan permintaan sample EthyleneAbsorber: sebutkan komoditas, volume ruang, dan rute — tim teknis menyiapkan perhitungan dosis tertulis.',
  path: '/kontak',
});

export default function KontakLayout({ children }: { children: React.ReactNode }) {
  return children;
}
