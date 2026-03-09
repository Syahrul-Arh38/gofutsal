import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-green-900 text-white py-12">
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-8 border-b border-green-800 pb-12">
        <div>
          <h3 className="text-xl font-bold mb-4">GoFutsal</h3>
          <p className="text-green-200 text-sm leading-relaxed">
            Penyedia lapangan futsal terbaik dengan proses booking yang mudah, transparan, dan terintegrasi otomatis.
          </p>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-4">Navigasi</h3>
          <ul className="text-green-200 text-sm space-y-2">
            <li><a href="#" className="hover:text-white">Home</a></li>
            <li><a href="#about" className="hover:text-white">Tentang Kami</a></li>
            <li><a href="#gallery" className="hover:text-white">Galeri</a></li>
            <li><a href="#contact" className="hover:text-white">Kontak</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-4">Operasional</h3>
          <p className="text-green-200 text-sm">Buka Setiap Hari:</p>
          <p className="font-bold">08:00 - 00:00 WIB</p>
        </div>
      </div>
      <div className="text-center mt-8 text-green-400 text-xs">
        &copy; {new Date().getFullYear()} GoFutsal Center. All Rights Reserved.
      </div>
    </footer>
  )
}

export default Footer