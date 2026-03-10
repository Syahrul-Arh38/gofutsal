import React from 'react';

const Contact = () => {
  return (
    <section id="contact" className="py-24 bg-gray-50 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 relative">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-green-600 font-bold uppercase tracking-widest text-sm">Get In Touch</span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mt-2">Lokasi & Kontak</h2>
          <div className="w-24 h-1.5 bg-green-600 mx-auto mt-6 rounded-full"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-stretch">
          
          {/* Kolom Kiri: Info Detail */}
          <div className="flex flex-col gap-6">
            <div className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-gray-200/50 border border-gray-100 flex-1">
              <div className="space-y-8">
                
                {/* Alamat */}
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center text-2xl shrink-0">
                    📍
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg">Alamat Arena</h4>
                    <p className="text-gray-500 mt-1 leading-relaxed">
                      Jl. Futsal Raya No. 123, Kel. Olahraga, <br />
                      Kec. Sehat, Kota Anda, Indonesia 12345
                    </p>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center text-2xl shrink-0">
                    📱
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg">WhatsApp Customer Service</h4>
                    <p className="text-gray-500 mt-1">0812-3456-7890 (Fast Response)</p>
                  </div>
                </div>

                {/* Jam Operasional */}
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center text-2xl shrink-0">
                    ⏰
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg">Jam Operasional</h4>
                    <p className="text-gray-500 mt-1">Setiap Hari: 08:00 - 00:00 WIB</p>
                  </div>
                </div>

              </div>

              {/* Tombol Aksi */}
              <div className="grid sm:grid-cols-2 gap-4 mt-12">
                <a 
                  href="https://wa.me/628123456789" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-4 rounded-2xl font-bold hover:bg-green-700 hover:shadow-lg hover:shadow-green-200 transition-all active:scale-95"
                >
                  <span>Chat Sekarang</span>
                </a>
                <a 
                  href="#jadwal" 
                  className="flex items-center justify-center gap-2 bg-gray-900 text-white px-6 py-4 rounded-2xl font-bold hover:bg-gray-800 transition-all active:scale-95"
                >
                  <span>Booking Lapangan</span>
                </a>
              </div>
            </div>
          </div>

          {/* Kolom Kanan: Google Maps */}
          <div className="h-[400px] lg:h-auto min-h-[400px] rounded-[2.5rem] overflow-hidden shadow-xl shadow-gray-200/50 border-8 border-white">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.216346294514!2d106.8431804!3d-6.2351187!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMTQnMDYuNCJTIDEwNiw1MCczNS41IkU!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Lokasi GoFutsal"
              className="grayscale-[0.2] contrast-[1.1]"
            ></iframe>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;