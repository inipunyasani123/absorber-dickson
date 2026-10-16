import LegalPage from '@/components/LegalPage';
import { DIPERBARUI, KETENTUAN } from '@/lib/legal';
import { meta } from '@/lib/seo';

export const metadata = meta({
  title: 'Syarat & Ketentuan',
  description:
    'Ketentuan permintaan sample, perhitungan dosis, pemesanan, dan klaim mutu produk EthyleneAbsorber, Container Dry® II, Desi Pak®, dan Silica Gel.',
  path: '/terms',
});

export default function TermsPage() {
  return <LegalPage doc="L-02" title="Syarat & Ketentuan" updated={DIPERBARUI} intro={KETENTUAN.intro} sections={KETENTUAN.bagian} />;
}
