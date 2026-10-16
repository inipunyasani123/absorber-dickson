import Hero from '@/components/Hero'
import CertBar from '@/components/CertBar'
import Problem from '@/components/Problem'
import HowItWorks from '@/components/HowItWorks'
import Lifespan from '@/components/Lifespan'
import Products from '@/components/Products'
import Applications from '@/components/Applications'
import FaqPreview from '@/components/FaqPreview'
import CTABand from '@/components/CTABand'

/* Halaman dibaca berurutan seperti lembar data:
   posisi → kepatuhan → masalah → mekanisme → masa pakai →
   katalog → penerapan → tanya jawab → tindakan.
   Pita angka perusahaan & kutipan pelanggan dihapus: angka dan nama itu
   tidak ada di brief, jadi tidak boleh tampil sebagai fakta. */
export default function HomePage() {
  return (
    <>
      <Hero />
      <CertBar />
      <Problem />
      <HowItWorks />
      <Lifespan />
      <Products />
      <Applications />
      <FaqPreview />
      <CTABand />
    </>
  )
}
