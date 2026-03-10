import React from 'react';

const About = () => {
  const fieldTypes = [
    {
      icon: "🌿",
      title: "Lapangan Rumput (Sintetis)",
      desc: "Rumput sintetis standar FIFA yang empuk dan meminimalisir cedera saat terjatuh. Cocok untuk permainan teknis.",
      tag: "Best for Safety",
      image: "./data/image/About1.png",
      color: "from-green-600 to-green-900", // Warna hover
      // Warna awal yang lebih gelap (pangkat 700 ke 900)
      initialBg: "bg-gradient-to-br from-green-700 via-green-800 to-green-950" 
    },
    {
      icon: "⚽",
      title: "Lapangan Biasa (Vinyl/Interlock)",
      desc: "Lantai berstandar kompetisi yang memberikan pantulan bola stabil dan kecepatan lari yang maksimal.",
      tag: "Best for Speed",
      image: "./data/image/About2.png",
      color: "from-blue-600 to-blue-900", // Warna hover
      // Warna awal yang lebih gelap (pangkat 700 ke 900)
      initialBg: "bg-gradient-to-br from-blue-700 via-blue-800 to-blue-950"
    }
  ];

  const facilities = [
    { icon: "🚿", text: "Shower & Kamar Mandi Bersih" },
    { icon: "💡", text: "Penerangan LED Standar Pro" },
    { icon: "🚗", text: "Area Parkir Luas & Aman" },
    { icon: "☕", text: "Kantin & Rest Area" }
  ];

  return (
    <section id="about" className="py-24 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-4">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="text-green-600 font-bold uppercase tracking-widest text-sm">Our Facilities</span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mt-2">
              Arena Terbaik untuk <span className="text-green-600">Performa Terbaik.</span>
            </h2>
            <div className="w-24 h-1.5 bg-green-600 mt-6 rounded-full"></div>
          </div>
          <p className="text-gray-500 text-lg md:max-w-xs border-l-4 border-gray-100 pl-4 italic">
            "Bermain lebih nyaman dengan pilihan lantai yang sesuai gaya bermain tim kamu."
          </p>
        </div>

        {/* Tipe Lapangan - Grid 2 Kolom */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {fieldTypes.map((type, index) => (
            <div 
              key={index} 
              className={`group relative overflow-hidden rounded-3xl h-80 flex items-end p-8 shadow-2xl transition-all hover:-translate-y-2 duration-500 ${type.initialBg}`}
            >
              {/* --- LAYER GAMBAR (Muncul saat Hover) --- */}
              <div className="absolute inset-0 z-0 overflow-hidden">
                <img 
                  src={type.image} 
                  alt={type.title}
                  className="w-full h-full object-cover opacity-100 transition-all duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-black/50 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>

              {/* --- OVERLAY GRADIENT AWAL (Agar icon & text lebih pop di awal) --- */}
              <div className={`absolute inset-0 bg-gradient-to-t ${type.color} opacity-40 group-hover:opacity-0 transition-opacity duration-500 z-[1]`}></div>
              
              <div className="relative z-10 w-full">
                <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-500">{type.icon}</div>
                <span className="bg-white/20 backdrop-blur-md text-white text-[10px] font-bold py-1 px-3 rounded-full uppercase">
                  {type.tag}
                </span>
                <h3 className="text-2xl font-bold text-white mt-3 transition-colors duration-300">{type.title}</h3>
                <p className="text-gray-100 mt-2 text-sm leading-relaxed max-w-sm opacity-90 group-hover:text-gray-200 transition-colors">
                  {type.desc}
                </p>
              </div>

              {/* Dekorasi Garis Lapangan */}
              <div className="absolute top-4 right-4 w-20 h-20 border-2 border-white/10 rounded-full -mr-10 -mt-10"></div>
            </div>
          ))}
        </div>

        {/* Fasilitas Pendukung - Mini Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {facilities.map((fac, idx) => (
            <div key={idx} className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100 hover:bg-green-50 hover:border-green-200 transition-colors group">
              <span className="text-2xl group-hover:scale-110 transition-transform">{fac.icon}</span>
              <span className="text-sm font-semibold text-gray-700">{fac.text}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default About;