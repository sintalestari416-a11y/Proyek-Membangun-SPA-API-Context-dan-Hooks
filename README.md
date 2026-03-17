Proyek: Membangun SPA dengan API Context dan Hooks
Ini adalah aplikasi Single Page Application (SPA) yang dibangun menggunakan React. Proyek ini bertujuan untuk mendalami penggunaan Hooks (seperti useState, useEffect, useContext) dan Context API untuk manajemen state yang lebih efisien tanpa perlu melakukan prop drilling.

🚀 Fitur Utama
Single Page Application (SPA): Navigasi antar halaman yang cepat tanpa reload.

State Management: Menggunakan Context API untuk mengelola data global (seperti tema atau data pengguna).

Custom Hooks: Implementasi logika yang dapat digunakan kembali menggunakan React Hooks.

Responsive Design: Tampilan yang optimal di berbagai perangkat.

🛠️ Teknologi yang Digunakan
React.js (Vite/CRA)

React Context API

React Hooks (useState, useEffect, useContext, dsb.)

React Router (untuk navigasi)

CSS / Styled Components

💻 Cara Menjalankan Proyek Secara Lokal
Clone repositori ini:

Bash
git clone https://github.com/sintalestari416-a11y/Proyek-Membangun-SPA-API-Context-dan-Hooks.git
Masuk ke direktori proyek:

Bash
cd Proyek-Membangun-SPA-API-Context-dan-Hooks
Install dependensi:

Bash
npm install
Jalankan aplikasi:

Bash
npm run dev
# atau
npm start
Buka browser dan akses http://localhost:5173 (jika menggunakan Vite) atau http://localhost:3000.

📁 Struktur Folder
Plaintext
src/
├── components/     # Komponen UI yang reusable
├── contexts/       # Definisi Context API
├── hooks/          # Custom hooks
├── pages/          # Komponen halaman utama
└── App.jsx         # Entry point aplikasi
