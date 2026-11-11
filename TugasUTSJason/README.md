# Rona Rasa — Company Profile UMKM

Website company profile dan pemesanan untuk **Rona Rasa**, UMKM kuliner fiktif yang dibuat sebagai contoh tugas UTS Web Desain. Situs ini menggunakan HTML, CSS, dan JavaScript tanpa proses build.

## Identitas mahasiswa

- **Nama:** Jason
- **NIM:** 240103022
- **Program studi:** S1 Bisnis Digital
- **Nama UMKM:** Rona Rasa
- **Link website:** Belum dideploy
- **Link repository:** [Isi link repository GitHub]

## Fitur

- Empat halaman: Beranda, Tentang Kami, Produk, dan Kontak.
- Dropdown kategori produk dengan dukungan hover dan fokus keyboard.
- Navigasi hamburger untuk layar kecil.
- Konten profil, sejarah, visi, misi, profil pendiri, katalog produk, dan informasi kontak.
- Harga contoh dan tampilan produk dalam katalog.
- Keranjang belanja yang menyimpan pilihan produk di browser, dapat diubah, dan menampilkan estimasi subtotal serta ongkos kirim.
- Form pemesanan yang menyiapkan ringkasan pesanan untuk dikirim lewat WhatsApp setelah nomor usaha diatur.
- Form kontak berupa demonstrasi visual; tidak mengirim atau menyimpan data.
- Desain responsif, tautan lewati ke konten, dan dukungan pengaturan reduced motion.

## Struktur berkas

```text
.
├── index.html
├── tentang.html
├── produk.html
├── pemesanan.html
├── kontak.html
├── css/
│   └── style.css
└── js/
    └── script.js
```

## Menjalankan secara lokal

Buka `index.html` di peramban. Untuk pengujian lebih konsisten, jalankan server statis sederhana dari folder proyek, misalnya:

```bash
python -m http.server 8000
```

Kemudian kunjungi `http://localhost:8000`.

## Deploy ke GitHub Pages

1. Unggah seluruh berkas proyek ke repository GitHub.
2. Buka **Settings → Pages** pada repository.
3. Pada **Build and deployment**, pilih **Deploy from a branch**, lalu pilih branch `main` dan folder `/ (root)`.
4. Simpan, tunggu proses deployment selesai, lalu catat URL publik yang diberikan GitHub Pages.
5. Perbarui bagian identitas mahasiswa dan link website/repository di README ini.

Semua nama, alamat, nomor telepon, harga, dan akun media sosial pada contoh ini bersifat fiktif. Ganti informasi tersebut dan lengkapi identitas sebelum dikumpulkan. Foto produk dapat ditambahkan sendiri pada folder `img/` bila tersedia.

## Pengaturan pemesanan WhatsApp

Sebelum menerima pesanan sungguhan, isi konstanta `WHATSAPP_NUMBER` di `js/script.js` dengan nomor WhatsApp usaha dalam format internasional tanpa tanda `+`, spasi, atau tanda baca (contoh format: `6281234567890`). Ganti juga informasi kontak fiktif di `kontak.html`. Form pemesanan hanya membuka pesan WhatsApp berisi rincian pesanan; situs ini tidak memproses pembayaran atau mengirim data ke server. Harga dan ongkos kirim adalah contoh yang perlu disesuaikan.

## Hosting dan domain gratis

Untuk tugas ini, **GitHub Pages** paling praktis karena kode sudah berupa berkas statis dan dapat dipublikasikan langsung dari repository. Alamat gratisnya berbentuk `https://nama-akun.github.io/nama-repository/` (untuk repository khusus `nama-akun.github.io`, alamatnya `https://nama-akun.github.io/`).

Alternatif lain:

- **Netlify** — subdomain gratis berbentuk `nama-situs.netlify.app`; dapat dihubungkan ke GitHub.
- **Vercel** — subdomain gratis berbentuk `nama-proyek.vercel.app`; dapat dihubungkan ke GitHub.

Alamat subdomain dari penyedia tersebut gratis; domain kustom seperti `.com` biasanya perlu dibeli. Setelah memilih layanan, perbarui link website di README dan kumpulkan link repository serta link deployment. Berkas HTML menggunakan tautan relatif sehingga bisa dipublikasikan di GitHub Pages maupun platform statis lain.
