import Link from 'next/link';

const Hero = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden z-0">
      {/* Background Image dengan Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 hover:scale-105"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1574629810360-7efbbe195018?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40"></div>
      </div>

      {/* Konten Utama */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 text-center sm:text-left">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-6">
            GoFutsal - Booking Lapangan <span className="text-green-500">Futsal Online</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-200 mb-10 leading-relaxed">
            Mudah, cepat, dan praktis memesan lapangan futsal favoritmu. 
            Cek jadwal *real-time* dan amankan slot bermainmu hanya dalam beberapa klik!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center sm:justify-start">
            <Link 
              href="#jadwal" 
              className="px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition-all transform hover:-translate-y-1 shadow-lg text-center"
            >
              Lihat Jadwal
            </Link>
            
            <Link 
              href="#paket" 
              className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg backdrop-blur-md border border-white/30 transition-all text-center"
            >
              Booking Sekarang
            </Link>
          </div>
          
          {/* Info Singkat */}
          <div className="mt-12 flex items-center space-x-6 text-gray-300">
            <div className="flex items-center space-x-2">
              <span className="text-green-500 font-bold">✓</span>
              <span>Konfirmasi Instan</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-green-500 font-bold">✓</span>
              <span>Update Real-time</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Dekorasi Animasi Lingkaran (Opsional) */}
      <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-green-500/20 rounded-full blur-3xl animate-pulse"></div>
    </section>
  );
};

export default Hero;