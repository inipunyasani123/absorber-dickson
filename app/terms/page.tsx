import LegalPage from '@/components/LegalPage';
import { DIPERBARUI, KETENTUAN } from '@/lib/legal';

export const metadata = {
  title: 'Syarat & Ketentuan',
  description:
    'Ketentuan permintaan sample, perhitungan dosis, pemesanan, dan klaim mutu produk EthyleneAbsorber, Container Dry® II, Desi Pak®, dan Silica Gel.',
  alternates: { canonical: 'https://absorber-dickson.pintuweb.id/terms' },
};

export default function TermsPage() {
  return <LegalPage doc="L-02" title="Syarat & Ketentuan" updated={DIPERBARUI} intro={KETENTUAN.intro} sections={KETENTUAN.bagian} />;
}
