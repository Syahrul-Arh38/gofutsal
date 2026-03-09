import React from 'react'

const About = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800">Tentang GoFutsal</h2>
          <div className="w-20 h-1 bg-green-600 mx-auto mt-4"></div>
        </div>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="p-6">
            <div className="text-4xl mb-4">🏟️</div>
            <h3 className="font-bold mb-2">Lapangan Standar</h3>
            <p className="text-gray-600 text-sm">Menggunakan rumput sintetis dan vinyl kualitas terbaik untuk kenyamanan bermain.</p>
          </div>
          <div className="p-6">
            <div className="text-4xl mb-4">🚿</div>
            <h3 className="font-bold mb-2">Fasilitas Lengkap</h3>
            <p className="text-gray-600 text-sm">Tersedia kamar mandi bersih, ruang ganti, dan kantin untuk bersantai.</p>
          </div>
          <div className="p-6">
            <div className="text-4xl mb-4">💡</div>
            <h3 className="font-bold mb-2">Penerangan LED</h3>
            <p className="text-gray-600 text-sm">Main malam hari tidak masalah dengan lampu LED yang terang dan merata.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About