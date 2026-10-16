import LegalPage from '@/components/LegalPage';
import { DIPERBARUI, PRIVASI } from '@/lib/legal';
import { meta } from '@/lib/seo';

export const metadata = meta({
  title: 'Kebijakan Privasi',
  description:
    'Data apa yang diminta EthyleneAbsorber saat Anda meminta sample atau perhitungan dosis, untuk apa dipakai, dan berapa lama disimpan.',
  path: '/privacy',
});

export default function PrivacyPage() {
  return <LegalPage doc="L-01" title="Kebijakan Privasi" updated={DIPERBARUI} intro={PRIVASI.intro} sections={PRIVASI.bagian} />;
}
