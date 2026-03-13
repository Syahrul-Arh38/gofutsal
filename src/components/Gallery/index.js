"use client";

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

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
    <section id="about" className="py-24 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-4">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="text-green-600 font-bold uppercase tracking-widest text-sm">Our Moment</span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mt-2">
              Galeri <span className="text-green-600">Lapangan.</span>
            </h2>
            <div className="w-24 h-1.5 bg-green-600 mt-6 rounded-full"></div>
          </div>
        </div>
    
        {/* Tampilan Mobile: Foto Full & Berganti-ganti (Slider) */}
        <div className="block md:hidden h-[400px]">
          <Swiper
            spaceBetween={0}
            centeredSlides={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            modules={[Autoplay, Pagination]}
            className="h-full rounded-2xl shadow-lg"
          >
            {photos.map((src, index) => (
              <SwiperSlide key={index}>
                <img 
                  src={src} 
                  alt={`Project ${index}`} 
                  className="w-full h-full object-cover"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="hidden md:flex w-full gap-4 h-[500px]">
          {photos.map((src, index) => (
            <div 
              key={index} 
              className="relative overflow-hidden rounded-xl shadow-sm transition-all duration-500 ease-in-out flex-[1] hover:flex-[4] group"
            >
              <img 
                src={src} 
                alt="Project Detail" 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;

