// Ilustrasi teknis absorber-dickson (konsep "Lembar Data"): gambar garis tinta navy di atas kertas milimeter,
// anotasi bernomor berisi fakta dari lembar data (tanpa angka karangan).
// Cara membuat ulang: node scripts/ilustrasi/gambar-teknis.mjs <folder> <folder-font>
//   -> <folder>/*.html + batch.json; render tiap HTML (Chrome headless) ke WebP sesuai ukuran di GAMBAR, lalu salin ke
//   public/images/teknis/ dan jalankan node scripts/static-images.mjs .
//   Folder font berisi fonts.css + woff2 untuk Archivo (500, 800) dan IBM Plex Mono (400, 500, 600) dari Google Fonts.
import { writeFileSync, mkdirSync } from 'node:fs'
import path from 'node:path'

const INK = '#003c5c', BRAND = '#198754', PAPER = '#f7faf8', K = '#6d4c9f', SPENT = '#9a6b3f', MINT = '#e3f1ea'
const MONO = "'IBM Plex Mono', monospace", SANS = "'Archivo', sans-serif"

// ---------- kertas & alat bantu ----------
const kertas = (w, h) => `
  <defs>
    <pattern id="mm" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M10 0H0V10" fill="none" stroke="${INK}" stroke-opacity="0.06" stroke-width="1"/></pattern>
    <pattern id="cm" width="50" height="50" patternUnits="userSpaceOnUse"><path d="M50 0H0V50" fill="none" stroke="${INK}" stroke-opacity="0.12" stroke-width="1"/></pattern>
    <pattern id="arsir" width="9" height="9" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="9" stroke="${INK}" stroke-opacity="0.38" stroke-width="1.4"/></pattern>
    <radialGradient id="manik" cx="0.35" cy="0.35" r="0.7"><stop offset="0" stop-color="#9b7fc7"/><stop offset="1" stop-color="${K}"/></radialGradient>
    <radialGradient id="bening" cx="0.35" cy="0.35" r="0.7"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#d6e6ee"/></radialGradient>
    <linearGradient id="indik" x1="0" x2="1"><stop offset="0" stop-color="${K}"/><stop offset="0.55" stop-color="#8a5a7a"/><stop offset="1" stop-color="${SPENT}"/></linearGradient>
    <marker id="panah" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10z" fill="${BRAND}"/></marker>
  </defs>
  <rect width="${w}" height="${h}" fill="${PAPER}"/><rect width="${w}" height="${h}" fill="url(#mm)"/><rect width="${w}" height="${h}" fill="url(#cm)"/>`
const teks = (x, y, s, isi, o = {}) => `<text x="${x}" y="${y}" ${o.anchor ? `text-anchor="${o.anchor}"` : ''} style="font-family:${o.f || MONO};font-size:${s}px;font-weight:${o.w || 500};letter-spacing:${o.ls ?? 0.06}em" fill="${o.c || INK}" ${o.op ? `opacity="${o.op}"` : ''}>${isi}</text>`
// anotasi: titik di objek -> garis -> lingkaran nomor + label 1–2 baris (huruf besar supaya terbaca di kartu)
const catat = (n, px, py, lx, ly, baris, kanan = true) => {
  const tx = kanan ? lx + 34 : lx - 34, an = kanan ? 'start' : 'end'
  return `<g><circle cx="${px}" cy="${py}" r="7" fill="${INK}"/>
  <path d="M${px} ${py} L${lx} ${ly}" fill="none" stroke="${INK}" stroke-width="2.2"/>
  <circle cx="${lx}" cy="${ly}" r="22" fill="${PAPER}" stroke="${INK}" stroke-width="2.4"/>${teks(lx, ly + 8, 22, n, { anchor: 'middle', w: 600 })}
  ${baris.map((b, i) => teks(tx, ly + 8 + (i - (baris.length - 1) / 2) * 30, i === 0 ? 24 : 21, b, { anchor: an, w: i === 0 ? 600 : 400, op: i === 0 ? 1 : 0.72, ls: 0.02 })).join('')}</g>`
}
const pojok = (w, h, kode) => `<g opacity="0.85">
  <path d="M24 64V24H64M${w - 64} 24H${w - 24}V64M24 ${h - 64}V${h - 24}H64M${w - 64} ${h - 24}H${w - 24}V${h - 64}" fill="none" stroke="${INK}" stroke-width="2"/>
  ${teks(w - 40, h - 40, 13, kode, { anchor: 'end', op: 0.7 })}</g>`
const manik = (pts, r = 9, fill = 'url(#manik)') => pts.map(([x, y], i) => `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(r * (0.82 + ((i * 37) % 10) / 40)).toFixed(1)}" fill="${fill}" stroke="${INK}" stroke-opacity="0.5" stroke-width="1"/>`).join('')
const acakTitik = (x0, y0, w, h, n, seed = 1) => { const out = []; let s = seed; const r = () => ((s = (s * 9301 + 49297) % 233280) / 233280); for (let i = 0; i < n; i++) out.push([x0 + r() * w, y0 + r() * h]); return out }
const gerigi = (x0, x1, y, h, step = 12) => { let d = `M${x0} ${y}`; for (let x = x0; x < x1; x += step) d += ` L${x + step / 2} ${y + h} L${x + step} ${y}`; return d }

// ---------- produk ----------
// EA-01 sachet: tampak depan + potongan sudut memperlihatkan manik KMnO4
const sachet = (cx, cy, s = 1) => `<g transform="translate(${cx - 600 * s} ${cy - 600 * s}) scale(${s})">
  <rect x="424" y="344" width="380" height="540" fill="${INK}" opacity="0.08"/>
  <rect x="410" y="330" width="380" height="540" fill="#ffffff" stroke="${INK}" stroke-width="3.4"/>
  <rect x="410" y="330" width="380" height="44" fill="url(#arsir)" stroke="${INK}" stroke-width="1.6"/>
  <rect x="410" y="826" width="380" height="44" fill="url(#arsir)" stroke="${INK}" stroke-width="1.6"/>
  <rect x="440" y="398" width="320" height="96" fill="${MINT}" stroke="${BRAND}" stroke-width="1.6"/>
  ${teks(600, 446, 34, `<tspan fill="${INK}">Ethylene</tspan><tspan fill="${BRAND}">Absorber</tspan>`, { anchor: 'middle', f: SANS, w: 800, ls: -0.01 })}
  ${teks(600, 476, 14, 'PENYERAP GAS ETILEN', { anchor: 'middle', op: 0.8 })}
  <circle cx="600" cy="610" r="64" fill="#ffffff" stroke="${INK}" stroke-width="2"/>
  <circle cx="600" cy="610" r="50" fill="${K}" opacity="0.92"/>
  ${manik(acakTitik(565, 575, 70, 70, 14, 3).filter(([x, y]) => (x - 600) ** 2 + (y - 610) ** 2 < 1600), 8)}
  ${teks(600, 704, 13, 'INDIKATOR WARNA', { anchor: 'middle', w: 600 })}
  <rect x="470" y="722" width="260" height="14" fill="url(#indik)" stroke="${INK}" stroke-width="1.2"/>
  ${teks(470, 758, 12, 'AKTIF', { op: 0.75 })}${teks(730, 758, 12, 'GANTI', { anchor: 'end', op: 0.75 })}
  ${teks(600, 800, 13, '1 SACHET · 1–2 m³', { anchor: 'middle', w: 600 })}
  <path d="M790 700 L790 826 L664 826 Z" fill="${K}" opacity="0.18"/><path d="M790 700 L664 826" stroke="${INK}" stroke-width="2.2" stroke-dasharray="7 5"/>
  ${manik(acakTitik(715, 760, 70, 60, 9, 11).filter(([x, y]) => x + y > 1500), 9)}
  <path d="M790 700 L760 690 L654 800 L664 826 Z" fill="#ffffff" stroke="${INK}" stroke-width="2"/><path d="M760 690 L654 800" stroke="${INK}" stroke-width="1" opacity="0.4"/>
  </g>`
// CD-02 strip gantung bersel dengan pengait
const strip = (cx, cy, s = 1) => `<g transform="translate(${cx - 600 * s} ${cy - 600 * s}) scale(${s})">
  <path d="M600 130 C 560 130 556 186 600 186 L600 228" fill="none" stroke="${INK}" stroke-width="7" stroke-linecap="round"/>
  <path d="M600 130 C 640 130 646 160 624 172" fill="none" stroke="${INK}" stroke-width="7" stroke-linecap="round"/>
  <rect x="499" y="238" width="216" height="752" fill="${INK}" opacity="0.08"/>
  <rect x="485" y="224" width="216" height="752" fill="#ffffff" stroke="${INK}" stroke-width="3.4"/>
  <rect x="485" y="224" width="216" height="30" fill="url(#arsir)" stroke="${INK}" stroke-width="1.4"/><circle cx="593" cy="239" r="8" fill="${PAPER}" stroke="${INK}" stroke-width="2"/>
  <rect x="500" y="268" width="186" height="118" fill="${MINT}" stroke="${BRAND}" stroke-width="1.6"/>
  ${teks(593, 314, 26, 'Container', { anchor: 'middle', f: SANS, w: 800, ls: -0.01 })}${teks(593, 346, 26, 'Dry® II', { anchor: 'middle', f: SANS, w: 800, ls: -0.01, c: BRAND })}
  ${teks(593, 372, 11, 'DESICCANT GANTUNG', { anchor: 'middle', op: 0.8 })}
  ${[0, 1, 2, 3].map((i) => { const y = 404 + i * 140; return `<rect x="503" y="${y}" width="180" height="124" fill="#ffffff" stroke="${INK}" stroke-width="1.6"/>${i === 1 ? `<rect x="503" y="${y}" width="180" height="124" fill="url(#bening)" opacity="0.6"/>${manik(acakTitik(515, y + 12, 156, 100, 26, 5), 8, 'url(#bening)')}` : `<path d="M515 ${y + 20} h156 M515 ${y + 104} h156" stroke="${INK}" stroke-opacity="0.12" stroke-width="10"/>`}` }).join('')}
  <path d="M485 976 ${gerigi(485, 701, 976, 14, 12).slice(1)}" fill="none" stroke="${INK}" stroke-width="1.6"/>
  </g>`
// DP-03 kantong bantal + potongan memperlihatkan butiran tanah liat
const kantong = (cx, cy, s = 1) => `<g transform="translate(${cx - 600 * s} ${cy - 600 * s}) scale(${s})">
  <path d="M396 372 Q600 352 804 372 Q826 600 804 846 Q600 866 396 846 Q374 600 396 372 Z" transform="translate(14 12)" fill="${INK}" opacity="0.08"/>
  <path d="M396 372 Q600 352 804 372 Q826 600 804 846 Q600 866 396 846 Q374 600 396 372 Z" fill="#ffffff" stroke="${INK}" stroke-width="3.4"/>
  <path d="M410 392 Q600 374 790 392" fill="none" stroke="${INK}" stroke-width="1.4" stroke-dasharray="3 7"/><path d="M410 826 Q600 844 790 826" fill="none" stroke="${INK}" stroke-width="1.4" stroke-dasharray="3 7"/>
  <rect x="452" y="440" width="296" height="120" fill="${MINT}" stroke="${BRAND}" stroke-width="1.6"/>
  ${teks(600, 506, 46, 'Desi Pak<tspan font-size="24" dy="-18">®</tspan>', { anchor: 'middle', f: SANS, w: 800, ls: -0.01 })}${teks(600, 540, 13, 'DESICCANT · TANAH LIAT ALAMI', { anchor: 'middle', op: 0.8 })}
  <path d="M470 600 h260 M470 628 h200 M470 656 h230" stroke="${INK}" stroke-opacity="0.18" stroke-width="8"/>
  <path d="M600 846 L804 846 Q818 760 812 700 Z" fill="#c9b49a" opacity="0.55"/><path d="M600 846 L812 700" stroke="${INK}" stroke-width="2.2" stroke-dasharray="7 5"/>
  ${acakTitik(640, 730, 160, 110, 34, 9).filter(([x, y]) => y - 846 >= -(x - 600) * 0.69).map(([x, y], i) => `<path d="M${x.toFixed(1)} ${y.toFixed(1)} l${6 + (i % 4)} -${3 + (i % 3)} l4 7 l-8 3 z" fill="#a98f72" stroke="${INK}" stroke-opacity="0.45" stroke-width="1"/>`).join('')}
  </g>`
// SG-04 tiga kantong kecil berjendela + butiran lepas
const silika = (cx, cy, s = 1) => {
  const kecil = (x, y, r) => `<g transform="rotate(${r} ${x + 110} ${y + 150})"><rect x="${x + 10}" y="${y + 10}" width="220" height="300" fill="${INK}" opacity="0.08"/><rect x="${x}" y="${y}" width="220" height="300" fill="#ffffff" stroke="${INK}" stroke-width="3"/>
    <path d="${gerigi(x, x + 220, y + 22, -12, 11)}" fill="none" stroke="${INK}" stroke-width="1.4"/><path d="${gerigi(x, x + 220, y + 278, 12, 11)}" fill="none" stroke="${INK}" stroke-width="1.4"/>
    ${teks(x + 110, y + 70, 22, 'SILICA GEL', { anchor: 'middle', f: SANS, w: 800, ls: 0.02 })}${teks(x + 110, y + 94, 11, 'DESICCANT · SiO₂', { anchor: 'middle', op: 0.8 })}
    <rect x="${x + 30}" y="${y + 116}" width="160" height="104" fill="url(#bening)" stroke="${INK}" stroke-width="1.4"/>${manik(acakTitik(x + 40, y + 126, 140, 84, 18, x), 8, 'url(#bening)')}
    ${teks(x + 110, y + 252, 12, 'JANGAN DIMAKAN', { anchor: 'middle', w: 600, c: BRAND })}</g>`
  return `<g transform="translate(${cx - 600 * s} ${cy - 600 * s}) scale(${s})">${kecil(330, 430, -12)}${kecil(640, 410, 9)}${kecil(480, 470, -1)}
  ${manik(acakTitik(420, 800, 380, 60, 16, 4), 10, 'url(#bening)')}</g>`
}

// ---------- isometri ----------
const C30 = Math.cos(Math.PI / 6), S30 = 0.5
const iso = (o, s) => (x, y, z = 0) => [o[0] + (x - y) * C30 * s, o[1] + (x + y) * S30 * s - z * s]
const poly = (pts, fill, o = {}) => `<polygon points="${pts.map((p) => p.map((v) => v.toFixed(1)).join(',')).join(' ')}" fill="${fill}" stroke="${o.stroke || INK}" stroke-width="${o.sw ?? 2}" ${o.op ? `fill-opacity="${o.op}"` : ''} ${o.dash ? `stroke-dasharray="${o.dash}"` : ''}/>`
const kotak = (P, x, y, z, w, d, h, warna = { a: '#ffffff', b: '#eef4f1', c: '#dde8e3' }, o = {}) => {
  const A = P(x, y, z + h), B = P(x + w, y, z + h), Cc = P(x + w, y + d, z + h), D = P(x, y + d, z + h)
  const E = P(x + w, y + d, z), F = P(x, y + d, z), G = P(x + w, y, z)
  return poly([A, B, Cc, D], warna.a, o) + poly([D, Cc, E, F], warna.b, o) + poly([B, G, E, Cc], warna.c, o)
}
const peti = (P, x, y, z, w = 40, d = 30, h = 22, isi = '#f4c04d') => kotak(P, x, y, z, w, d, h, { a: isi, b: '#e7d3a8', c: '#d8c092' }, { sw: 1.4 }) +
  `<path d="M${P(x, y + d, z + h * 0.5).join(' ')} L${P(x + w, y + d, z + h * 0.5).join(' ')}" stroke="${INK}" stroke-width="1" opacity="0.5"/>`
const sachetIso = (P, x, y, z) => { const [a, b] = P(x, y, z); return `<g transform="translate(${a.toFixed(1)} ${b.toFixed(1)})"><rect x="-9" y="-24" width="18" height="24" fill="${K}" stroke="${INK}" stroke-width="1.4"/><rect x="-9" y="-24" width="18" height="6" fill="#ffffff" stroke="${INK}" stroke-width="1"/></g>` }

// A. kontainer ekspor: dinding depan dipotong, peti bertumpuk, sachet di sela peti
const sektorA = () => {
  const P = iso([470, 290], 2.6)
  let s = kotak(P, 0, 0, 0, 200, 80, 4, { a: '#dfe8e3', b: '#d4dfda', c: '#e9f0ec' })
  s += poly([P(0, 0, 4), P(200, 0, 4), P(200, 0, 90), P(0, 0, 90)], '#eef3f0', { sw: 2 }) + poly([P(0, 0, 4), P(0, 80, 4), P(0, 80, 90), P(0, 0, 90)], '#e4ece8', { sw: 2 })
  for (let i = 0; i < 4; i++) for (let j = 0; j < 2; j++) for (let k = 0; k < 3; k++) s += peti(P, 10 + i * 46, 6 + j * 36, 4 + k * 24, 40, 30, 22, ['#f4c04d', '#9bc35a', '#f08a3c'][(i + j + k) % 3])
  s += sachetIso(P, 56, 40, 76) + sachetIso(P, 148, 40, 76) + sachetIso(P, 102, 6, 52)
  s += `<path d="M${P(200, 0, 90).join(' ')} L${P(200, 0, 0).join(' ')}" stroke="${INK}" stroke-width="2.4"/>`
  s += catat('1', ...P(56, 40, 80), 96, 680, ['Sachet di sela peti,', 'bukan di dasar']) + catat('2', ...P(200, 40, 92), 1090, 110, ['Ruang tertutup', 'kontainer 20/40 ft'], false)
  return s
}
// B. gudang dingin: rak palet bertingkat, sachet di tiang rak
const sektorB = () => {
  const P = iso([520, 300], 2.5)
  let s = kotak(P, 0, 0, 0, 210, 110, 2, { a: '#e6eeea', b: '#d8e3de', c: '#eef3f0' })
  s += poly([P(0, 0, 2), P(210, 0, 2), P(210, 0, 100), P(0, 0, 100)], '#f1f5f3') + poly([P(0, 0, 2), P(0, 110, 2), P(0, 110, 100), P(0, 0, 100)], '#e7eeea')
  for (const y0 of [12, 62]) {
    for (const z of [2, 34, 66]) {
      s += kotak(P, 14, y0, z, 180, 36, 3, { a: '#c8d6cf', b: '#b9c9c1', c: '#d3dfd9' }, { sw: 1.2 })
      for (let i = 0; i < 4; i++) s += peti(P, 18 + i * 44, y0 + 4, z + 3, 38, 28, 20, ['#9bc35a', '#f4c04d', '#e26b4f', '#f08a3c'][(i + Math.round(z / 32)) % 4])
    }
    for (const x of [14, 104, 194]) s += `<path d="M${P(x, y0 + 36, 0).join(' ')} L${P(x, y0 + 36, 96).join(' ')}" stroke="${INK}" stroke-width="3"/>`
  }
  s += sachetIso(P, 104, 98, 92) + sachetIso(P, 194, 98, 60) + sachetIso(P, 14, 48, 92)
  s += catat('1', ...P(194, 98, 60), 1090, 130, ['Sachet di tiap', 'lajur rak'], false) + catat('2', ...P(14, 48, 84), 96, 690, ['Ruang simpan', 'tertutup'])
  return s
}
// C. ritel: rak pajang terbuka di depan, gudang belakang dengan peti bersachet
const sektorC = () => {
  const P = iso([480, 250], 2.6)
  let s = kotak(P, 0, 0, 0, 230, 120, 2, { a: '#e6eeea', b: '#d8e3de', c: '#eef3f0' })
  for (let k = 0; k < 3; k++) {
    s += kotak(P, 20, 70 - k * 18, k * 16, 110, 18, 16, { a: '#ffffff', b: '#e9f0ec', c: '#dfe8e3' }, { sw: 1.4 })
    for (let i = 0; i < 5; i++) { const [a, b] = P(28 + i * 21, 76 - k * 18, k * 16 + 22); s += `<ellipse cx="${a.toFixed(1)}" cy="${b.toFixed(1)}" rx="15" ry="11" fill="${['#e26b4f', '#f4c04d', '#9bc35a'][(i + k) % 3]}" stroke="${INK}" stroke-width="1.2"/>` }
  }
  s += poly([P(160, 0, 2), P(160, 120, 2), P(160, 120, 70), P(160, 0, 70)], '#f1f5f3')
  for (let j = 0; j < 2; j++) for (let k = 0; k < 2; k++) s += peti(P, 172, 14 + j * 40, 2 + k * 24, 44, 32, 22, ['#f4c04d', '#9bc35a'][(j + k) % 2])
  s += sachetIso(P, 194, 30, 52) + sachetIso(P, 194, 70, 52)
  s += catat('1', ...P(194, 30, 44), 1090, 150, ['Sachet di peti', 'gudang belakang'], false) + catat('2', ...P(60, 52, 40), 96, 660, ['Rak pajang', 'terbuka'])
  return s
}
// D. olahan & minuman: lemari bahan baku tertutup bersachet -> meja olah -> botol jus
const sektorD = () => {
  const P = iso([460, 230], 2.6)
  let s = kotak(P, 0, 0, 0, 250, 110, 2, { a: '#e6eeea', b: '#d8e3de', c: '#eef3f0' })
  s += kotak(P, 10, 10, 2, 70, 60, 80, { a: '#ffffff', b: '#eaf1ed', c: '#f6f9f7' })
  s += poly([P(80, 10, 6), P(80, 70, 6), P(80, 70, 78), P(80, 10, 78)], '#ffffff', { op: 0.25, dash: '6 4' })
  for (let k = 0; k < 3; k++) s += peti(P, 18, 18, 6 + k * 24, 54, 44, 20, ['#f4c04d', '#f08a3c', '#9bc35a'][k])
  s += sachetIso(P, 46, 70, 74)
  s += kotak(P, 120, 30, 2, 90, 50, 34, { a: '#ffffff', b: '#e9f0ec', c: '#dfe8e3' })
  for (let i = 0; i < 4; i++) { const [a, b] = P(132 + i * 20, 52, 36); s += `<g transform="translate(${a.toFixed(1)} ${b.toFixed(1)})"><rect x="-8" y="-34" width="16" height="34" rx="3" fill="${['#f4c04d', '#f08a3c', '#9bc35a', '#e26b4f'][i]}" stroke="${INK}" stroke-width="1.3"/><rect x="-5" y="-42" width="10" height="9" fill="#ffffff" stroke="${INK}" stroke-width="1.2"/></g>` }
  s += `<path d="M${P(84, 40, 30).join(' ')} C ${P(100, 40, 60).join(' ')} ${P(112, 40, 60).join(' ')} ${P(118, 40, 42).join(' ')}" fill="none" stroke="${BRAND}" stroke-width="2.4" stroke-dasharray="6 5" marker-end="url(#panah)"/>`
  s += catat('1', ...P(46, 70, 66), 96, 680, ['Bahan baku', 'tertutup bersachet']) + catat('2', ...P(170, 52, 40), 1090, 130, ['Kematangan', 'seragam'], false)
  return s
}
// hero: kardus terpotong berisi mangga dua lapis, sachet berdiri di dinding kemasan
const hero = () => {
  const P = iso([470, 560], 3.0)
  let s = kotak(P, 0, 0, 0, 150, 110, 3, { a: '#e9d6b3', b: '#d9c29b', c: '#e2cca5' })
  s += poly([P(0, 0, 3), P(150, 0, 3), P(150, 0, 86), P(0, 0, 86)], '#efdcb9') + poly([P(0, 0, 3), P(0, 110, 3), P(0, 110, 86), P(0, 0, 86)], '#e6d1ab')
  s += poly([P(0, 0, 86), P(150, 0, 86), P(150, -20, 110), P(0, -20, 110)], '#f2e2c4') + poly([P(0, 0, 86), P(0, 110, 86), P(-20, 110, 108), P(-20, 0, 108)], '#ead7b4')
  const mangga = (x, y, z) => { const [a, b] = P(x, y, z); return `<g transform="translate(${a.toFixed(1)} ${b.toFixed(1)}) rotate(-20)"><path d="M-58 4 C -60 -30 -10 -44 30 -34 C 62 -26 72 4 56 22 C 40 40 -4 30 -28 34 C -48 38 -57 24 -58 4 Z" fill="#f2c14e" stroke="${INK}" stroke-width="2.2"/><path d="M-34 -12 C -10 -26 22 -26 44 -14" fill="none" stroke="#fff" stroke-opacity="0.5" stroke-width="6" stroke-linecap="round"/><path d="M30 26 C 10 30 -8 24 -26 30" fill="none" stroke="#c98a1e" stroke-opacity="0.6" stroke-width="2"/><path d="M58 -6 l12 -9" stroke="${INK}" stroke-width="2.4"/></g>` }
  for (const z of [30, 62]) for (let i = 0; i < 3; i++) for (let j = 0; j < 2; j++) s += mangga(26 + i * 44, 30 + j * 46, z)
  const [sa, sb] = P(6, 72, 40)
  s += `<g transform="translate(${sa.toFixed(1)} ${sb.toFixed(1)}) skewY(-30)"><rect x="-4" y="-120" width="84" height="110" fill="#ffffff" stroke="${INK}" stroke-width="2.2"/><rect x="-4" y="-120" width="84" height="12" fill="url(#arsir)" stroke="${INK}" stroke-width="1.2"/><rect x="6" y="-96" width="64" height="22" fill="${MINT}" stroke="${BRAND}" stroke-width="1.2"/><circle cx="38" cy="-46" r="16" fill="${K}" stroke="${INK}" stroke-width="1.4"/></g>`
  s += poly([P(150, 0, 3), P(150, 110, 3), P(150, 110, 10), P(150, 0, 10)], 'url(#arsir)', { sw: 1.4 })
  s += poly([P(0, 110, 3), P(150, 110, 3), P(150, 110, 10), P(0, 110, 10)], 'url(#arsir)', { sw: 1.4 })
  s += `<path d="M${P(150, 0, 86).join(' ')} L${P(150, 0, 3).join(' ')} L${P(150, 110, 3).join(' ')} L${P(0, 110, 3).join(' ')} L${P(0, 110, 86).join(' ')}" fill="none" stroke="${INK}" stroke-width="2" stroke-dasharray="9 6"/>`
  s += acakTitik(...P(30, 30, 92), 300, 90, 26, 21).map(([x, y]) => `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="3.5" fill="${BRAND}" opacity="0.6"/>`).join('')
  s += catat('1', sa + 38, sb - 70, 96, 940, ['Sachet di', 'dinding kemasan'])
  s += catat('2', ...P(60, 60, 96), 904, 280, ['Etilen', 'tertangkap'], false)
  s += catat('3', ...P(120, 76, 60), 904, 940, ['Komoditas', 'klimakterik'], false)
  return s
}

const wrap = (w, h, isi, fontdir) => `<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="file://${fontdir}/fonts.css"><style>html,body{margin:0}svg{display:block}</style></head><body>
<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${kertas(w, h)}${isi}</svg></body></html>`

export const GAMBAR = {
  'gbr-sachet': [1200, 1200, () => sachet(560, 640, 1.22) + catat('1', 352, 262, 150, 150, ['Segel panas']) + catat('2', 760, 400, 900, 260, ['Lapisan', 'food-grade']) + catat('3', 640, 616, 900, 560, ['Jendela', 'indikator']) + catat('4', 746, 845, 900, 1000, ['Bahan aktif', 'KMnO₄']) + pojok(1200, 1200, 'GBR. EA-01 · TAMPAK DEPAN, POTONGAN SUDUT')],
  'gbr-container': [1200, 1200, () => strip(560, 610, 1.02) + catat('1', 560, 146, 700, 120, ['Pengait ke rel', 'dinding kontainer']) + catat('2', 683, 650, 830, 640, ['Kantong', 'penyerap']) + catat('3', 683, 960, 830, 1020, ['Merata di', 'dinding samping']) + pojok(1200, 1200, 'GBR. CD-02 · TAMPAK DEPAN')],
  'gbr-desipak': [1200, 1200, () => kantong(560, 620, 1.2) + catat('1', 330, 420, 120, 230, ['Kantong bernapas']) + catat('2', 760, 860, 860, 1040, ['Tanah liat', 'alami']) + catat('3', 790, 420, 880, 250, ['Kardus', '& palet']) + pojok(1200, 1200, 'GBR. DP-03 · TAMPAK DEPAN, POTONGAN')],
  'gbr-silika': [1200, 1200, () => silika(580, 560, 1.12) + catat('1', 560, 640, 120, 170, ['Butiran SiO₂']) + catat('2', 840, 420, 880, 220, ['Kantong', 'berpori']) + catat('3', 560, 830, 700, 1000, ['Jangan dibuka']) + pojok(1200, 1200, 'GBR. SG-04 · TAMPAK DEPAN')],
  'sektor-ekspor': [1200, 750, () => sektorA() + pojok(1200, 750, 'GBR. A · KONTAINER EKSPOR')],
  'sektor-gudang': [1200, 750, () => sektorB() + pojok(1200, 750, 'GBR. B · GUDANG & COLD STORAGE')],
  'sektor-ritel': [1200, 750, () => sektorC() + pojok(1200, 750, 'GBR. C · RITEL MODERN')],
  'sektor-olahan': [1200, 750, () => sektorD() + pojok(1200, 750, 'GBR. D · OLAHAN & MINUMAN')],
  'hero-kemasan': [1000, 1200, () => hero() + pojok(1000, 1200, 'GBR. 01 · SACHET DALAM KEMASAN, POTONGAN')],
}

if (process.argv[1] && process.argv[1].endsWith('gambar-teknis.mjs')) {
  const [, , out = './out', fontdir] = process.argv
  mkdirSync(out, { recursive: true })
  const batch = []
  for (const [n, [w, h, f]] of Object.entries(GAMBAR)) {
    const fh = path.resolve(out, n + '.html')
    writeFileSync(fh, wrap(w, h, f(), path.resolve(fontdir)))
    batch.push({ in: fh, out: path.resolve(out, n + '.webp'), w, h, scale: 1, quality: 86, wait: 500 })
  }
  writeFileSync(path.join(out, 'batch.json'), JSON.stringify(batch, null, 1))
  console.log(batch.length, 'gambar')
}
