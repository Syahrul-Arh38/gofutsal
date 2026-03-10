import React from 'react'

const Gallery = () => {
    const photos = [
        "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=500",
        "./data/image/Gallery1.png",
        "./data/image/Gallery2.png",
        "./data/image/Gallery3.png",
        "./data/image/Gallery4.png",
        "./data/image/Gallery5.png",
      ];
  return (
    <section id="gallery" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
      <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="text-green-600 font-bold uppercase tracking-widest text-sm">Our Moment</span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mt-2">
              Galeri <span className="text-green-600">Lapangan.</span>
            </h2>
            <div className="w-24 h-1.5 bg-green-600 mt-6 rounded-full"></div>
            <p className="text-gray-500 mt-2">Lihat momen yang kami ciptakan untuk Anda.</p>
          </div>
        </div>
        <div className="flex w-full gap-4 h-100">
          {photos.map((src, index) => (
            <div 
              key={index} 
              className="relative overflow-hidden rounded-xl shadow-sm transition-all duration-500 ease-in-out flex-[1] hover:flex-[3] group"
            >
              <img 
                src={src} 
                alt="Futsal" 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-100"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Gallery