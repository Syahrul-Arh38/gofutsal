"use client";
import { useEffect, useState } from 'react';
import { getJadwal } from '../../services/api';
import BookingModal from './BookingModal';

const Jadwal = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedJadwal, setSelectedJadwal] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getJadwal();
        setData(result);
      } catch (error) {
        console.error("Gagal mengambil jadwal:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-32 space-y-4">
        <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-green-700 font-bold animate-pulse tracking-widest">MENYINKRONKAN JADWAL...</p>
      </div>
    );
  }

  return (
    <section id="jadwal" className="relative z-10 py-24 bg-gray-50 overflow-hidden">
      {/* Dekorasi Latar Belakang agar tidak kosong */}
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-white to-transparent opacity-50"></div>
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Header Section diselaraskan dengan About */}
        <div className="text-center mb-16">
          <span className="text-green-600 font-bold uppercase tracking-widest text-sm">Reservasi Arena</span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mt-2">
            Pilih <span className="text-green-600">Jadwal Main.</span>
          </h2>
          <div className="w-24 h-1.5 bg-green-600 mx-auto mt-6 rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.length > 0 ? data.map((item, index) => {
            const isAvailable = item.status === 'Tersedia';
            
            return (
              <div 
                key={index} 
                className="group bg-white rounded-[2.5rem] shadow-xl shadow-gray-200/50 border border-gray-100 hover:shadow-2xl hover:shadow-green-200/30 transition-all duration-500 hover:-translate-y-2 flex flex-col overflow-hidden"
              >
                <div className="p-8 flex-1">
                  {/* Header Card: Lapangan & Tag */}
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Lapangan</span>
                      <h3 className="text-2xl font-bold text-gray-800 group-hover:text-green-600 transition-colors">
                        {item.lapangan || "Nama Lapangan"}
                      </h3>
                    </div>
                  </div>

                  {/* Detail Info: Jam & Harga agar Card Terlihat Penuh */}
                  <div className="bg-gray-50 rounded-2xl p-5 mb-8 border border-gray-100 group-hover:bg-green-50 group-hover:border-green-100 transition-colors">
                    <div className="flex items-center gap-4 mb-3">
                      <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm text-xl">⏰</div>
                      <div>
                        <p className="text-[10px] text-gray-400 font-bold uppercase">Jam Main</p>
                        <p className="font-bold text-gray-700">{item.jam_mulai} - {item.jam_selesai}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm text-xl">💰</div>
                      <div>
                        <p className="text-[10px] text-gray-400 font-bold uppercase">Harga Sewa</p>
                        <p className="font-bold text-green-600">
                          Rp {item.harga ? Number(item.harga).toLocaleString('id-ID') : '0'} <span className="text-[10px] text-gray-400 font-normal">/ Jam</span>
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Button Action */}
                  <button 
                    type="button" 
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedJadwal(item);
                    }}
                    disabled={!isAvailable}
                    className={`w-full py-4 rounded-2xl font-bold transition-all transform active:scale-95 shadow-lg ${
                      isAvailable 
                      ? 'bg-green-600 text-white hover:bg-green-700 shadow-green-200 cursor-pointer' 
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'
                    }`}
                  >
                    {isAvailable ? 'Booking Sekarang →' : 'Sudah Dipesan'}
                  </button>
                </div>
              </div>
            );
          }) : (
            <div className="col-span-full text-center py-24 bg-white rounded-[2.5rem] border-2 border-dashed border-gray-200">
               <div className="text-5xl mb-4 text-gray-200">📅</div>
               <p className="text-gray-400 font-medium italic">Belum ada jadwal yang tersedia untuk saat ini.</p>
            </div>
          )}
        </div>
      </div>

      {/* Tampilkan Modal */}
      {selectedJadwal && (
        <BookingModal 
          jadwal={selectedJadwal} 
          onClose={() => setSelectedJadwal(null)} 
        />
      )}
    </section>
  );
};

export default Jadwal;