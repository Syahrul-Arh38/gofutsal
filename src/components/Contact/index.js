import React from 'react'

const Contact = () => {
  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Lokasi & Kontak</h2>
        <div className="bg-green-50 p-8 rounded-2xl border border-green-100">
          <p className="text-lg text-gray-700 mb-4 font-semibold">📍 Alamat Kami:</p>
          <p className="text-gray-600 mb-8">Jl. Futsal Raya No. 123, Kota Anda, Indonesia</p>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <a 
              href="https://wa.me/628123456789" 
              className="bg-green-600 text-white px-8 py-3 rounded-full font-bold hover:bg-green-700 transition"
            >
              Hubungi via WhatsApp
            </a>
            <a 
              href="https://maps.google.com" 
              className="bg-blue-600 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-700 transition"
            >
              Lihat di Google Maps
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact