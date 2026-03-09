import React from 'react'

const Gallery = () => {
    const photos = [
        "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=500",
        "https://images.unsplash.com/photo-1526232762682-d2f5f6ca5a69?q=80&w=500",
        "https://images.unsplash.com/photo-1518605336397-90db35f59991?q=80&w=500",
        "https://images.unsplash.com/photo-1560272564-c83d66b1ad12?q=80&w=500",
      ];
  return (
    <section id="gallery" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800">Galeri Lapangan</h2>
          <p className="text-gray-500 mt-2">Lihat fasilitas yang kami sediakan untuk Anda.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {photos.map((src, index) => (
            <div key={index} className="overflow-hidden rounded-xl h-64 shadow-sm group">
              <img 
                src={src} 
                alt="Futsal" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Gallery