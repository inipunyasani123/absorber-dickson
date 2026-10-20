/* ============================================================================
   Lembar data empat produk PT Dickson Synergy (konsep "Lembar Data").
   Angka yang dicantumkan hanya yang ada di brief/FAQ: cakupan 1–2 m³,
   masa efektif 30 hari (hingga 45), masa simpan 2 tahun, registrasi dan
   standar keamanan pangan. Angka daya serap desiccant tidak dikarang —
   diberikan pada lembar data tertulis sesuai permintaan.
   ========================================================================== */

export type Produk = {
  slug: string
  kode: string
  nama: string
  image: string
  fungsi: 'Etilen' | 'Kelembapan'
  ringkas: string
  uraian: string
  spek: [string, string][]
  pakai: string[]
  cocok: string[]
  tidakCocok: string[]
  dokumen: string[]
  eco: boolean
  pasangan: string
}

export const PRODUK: Produk[] = [
  {
    slug: 'ethyleneabsorber-sachet',
    kode: 'EA-01',
    nama: 'EthyleneAbsorber Sachet',
    image: '/images/teknis/gbr-sachet.webp',
    fungsi: 'Etilen',
    ringkas: 'Penyerap gas etilen berbasis kalium permanganat untuk komoditas segar di dalam kemasan, peti, dan kontainer.',
    uraian:
      'Sachet menahan gas etilen — hormon yang dilepas buah dan sayur dan yang memicu pematangan. Bahan aktif kalium permanganat bereaksi dengan etilen dan berubah warna dari ungu menjadi cokelat saat jenuh, sehingga waktu penggantian terbaca langsung. Bahan aktif terbungkus material food-grade dan tidak bersentuhan dengan pangan.',
    spek: [
      ['Bahan aktif', 'Kalium permanganat (KMnO₄)'],
      ['Cakupan', '1 sachet per 1–2 m³ ruang tertutup'],
      ['Masa efektif', '30 hari setelah dibuka; hingga 45 hari pada kondisi ideal'],
      ['Indikator', 'Ungu (aktif) → cokelat (jenuh)'],
      ['Masa simpan', '2 tahun dalam kemasan asli, belum dibuka'],
      ['Registrasi', 'BPOM RI NA18191100273'],
      ['Standar', 'FDA 21 CFR 175.300 · EU No 10/2011 · JHOSPA'],
    ],
    pakai: [
      'Hitung volume ruang tertutup (bukan berat muatan).',
      'Buka kemasan luar tepat sebelum pemasangan — reaksi dimulai saat terpapar udara.',
      'Letakkan sachet di sela peti atau di dinding kemasan, jangan tertimbun di dasar.',
      'Tutup kemasan atau kontainer serapat mungkin.',
      'Periksa warna indikator di setiap titik transit.',
    ],
    cocok: ['Pisang, mangga, alpukat, pepaya, apel', 'Tomat dan sayuran buah', 'Bunga potong', 'Pengapalan laut 3–4 minggu'],
    tidakCocok: ['Kemasan yang sering dibuka-tutup', 'Ruang terbuka tanpa sekat', 'Pengganti rantai dingin'],
    dokumen: ['Lembar data teknis', 'Salinan registrasi BPOM', 'Pernyataan kesesuaian FDA 21 CFR 175.300', 'Pernyataan kesesuaian EU No 10/2011'],
    eco: false,
    pasangan: 'container-dry-ii',
  },
  {
    slug: 'container-dry-ii',
    kode: 'CD-02',
    nama: 'Container Dry® II',
    image: '/images/teknis/gbr-container.webp',
    fungsi: 'Kelembapan',
    ringkas: 'Desiccant gantung berdaya serap tinggi yang menahan kelembapan di dalam kontainer selama pelayaran jarak jauh.',
    uraian:
      'Uap air di dalam kontainer mengembun saat suhu turun di malam hari atau saat kapal melintasi zona iklim berbeda — dikenal sebagai "hujan kontainer". Container Dry® II digantung di dinding kontainer dan menyerap uap air sebelum mengembun, sehingga kardus tidak lembek dan jamur tidak tumbuh.',
    spek: [
      ['Bentuk', 'Strip gantung'],
      ['Aplikasi', 'Kontainer 20 ft dan 40 ft'],
      ['Fungsi', 'Menyerap uap air, mencegah embun kontainer'],
      ['Sertifikat', 'EcoTain®'],
      ['Jumlah per kontainer', 'Ditetapkan dalam lembar data tertulis sesuai rute'],
    ],
    pakai: [
      'Gantung pada rel atau lubang pengait di dinding samping kontainer.',
      'Sebarkan merata sepanjang dinding, jangan dikumpulkan di satu titik.',
      'Pastikan tidak tertekan muatan agar ruang serapnya tidak tertutup.',
      'Pasang bersama ethylene absorber bila muatan adalah komoditas segar.',
    ],
    cocok: ['Kontainer kering jarak jauh', 'Muatan berkardus', 'Rute lintas iklim'],
    tidakCocok: ['Menyerap etilen — gunakan EthyleneAbsorber', 'Kontainer berpendingin dengan kontrol kelembapan aktif'],
    dokumen: ['Lembar data teknis', 'Sertifikat EcoTain®'],
    eco: true,
    pasangan: 'ethyleneabsorber-sachet',
  },
  {
    slug: 'desi-pak',
    kode: 'DP-03',
    nama: 'Desi Pak®',
    image: '/images/teknis/gbr-desipak.webp',
    fungsi: 'Kelembapan',
    ringkas: 'Desiccant dalam kemasan kantong berbahan tanah liat, fleksibel untuk kemasan ritel maupun muatan palet.',
    uraian:
      'Desi Pak® memakai tanah liat alami sebagai bahan penyerap, dikemas dalam kantong yang bisa diselipkan di dalam kardus ritel maupun di antara lapisan palet. Pilihan yang tepat bila kelembapan harus dijaga di tingkat kemasan, bukan hanya di tingkat kontainer.',
    spek: [
      ['Bahan', 'Tanah liat alami'],
      ['Bentuk', 'Kantong'],
      ['Aplikasi', 'Kemasan ritel dan muatan palet'],
      ['Sertifikat', 'EcoTain®'],
      ['Ukuran kantong', 'Beberapa ukuran; lihat lembar data tertulis'],
    ],
    pakai: [
      'Pilih ukuran kantong sesuai volume kemasan.',
      'Letakkan di dalam kemasan sebelum ditutup.',
      'Untuk palet, selipkan di antara lapisan kardus.',
    ],
    cocok: ['Kemasan ritel', 'Palet di gudang lembap', 'Barang kering dan bahan kemasan'],
    tidakCocok: ['Kontak langsung dengan pangan tanpa kemasan', 'Menyerap etilen'],
    dokumen: ['Lembar data teknis', 'Sertifikat EcoTain®'],
    eco: true,
    pasangan: 'ethyleneabsorber-sachet',
  },
  {
    slug: 'silica-gel',
    kode: 'SG-04',
    nama: 'Silica Gel',
    image: '/images/teknis/gbr-silika.webp',
    fungsi: 'Kelembapan',
    ringkas: 'Butiran silica gel mutu industri untuk proteksi kelembapan pada barang jadi, komponen, dan peralatan.',
    uraian:
      'Silica gel menyerap uap air di ruang kecil yang tertutup: kotak komponen elektronik, kemasan alat, hingga dokumen dan arsip. Karena berupa butiran dalam kantong kecil, ia mudah disesuaikan dengan berbagai ukuran kemasan.',
    spek: [
      ['Bahan', 'Silikon dioksida (SiO₂)'],
      ['Bentuk', 'Butiran dalam kantong'],
      ['Aplikasi', 'Barang jadi, komponen, peralatan'],
      ['Mutu', 'Industri'],
      ['Ukuran kantong', 'Beberapa ukuran; lihat lembar data tertulis'],
    ],
    pakai: [
      'Letakkan kantong di dalam kemasan tertutup bersama barang.',
      'Jangan dibuka atau dituang dari kantongnya.',
      'Ganti bila kemasan sudah dibuka lama di udara lembap.',
    ],
    cocok: ['Komponen elektronik dan mesin', 'Peralatan dan perkakas', 'Dokumen dan arsip'],
    tidakCocok: ['Konsumsi — jangan dimakan', 'Menyerap etilen'],
    dokumen: ['Lembar data teknis', 'Lembar data keselamatan bahan'],
    eco: false,
    pasangan: 'desi-pak',
  },
]

export const produkBySlug = (slug: string) => PRODUK.find((p) => p.slug === slug)

// Volume kontainer standar (bagian dalam), untuk kalkulator dosis.
export const KONTAINER = [
  { id: '20', nama: 'Kontainer 20 ft', m3: 33 },
  { id: '40', nama: 'Kontainer 40 ft', m3: 67 },
  { id: '40hc', nama: 'Kontainer 40 ft HC', m3: 76 },
]
