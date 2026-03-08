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

  if (loading) return <div className="text-center py-20 text-green-600 font-bold">Memuat Jadwal...</div>;
// Tambahkan di dalam komponen Jadwal sebelum return
console.log("Status Modal:", selectedJadwal ? "Terbuka" : "Tertutup");
  return (
    // Tambahkan 'relative z-10' untuk memastikan section tidak tertutup Hero/Navbar
    <section id="jadwal" className="relative z-10 py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">Jadwal Lapangan</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((item, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 transition-transform hover:scale-105">
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800">{item.lapangan}</h3>
                <p className="text-gray-500 mb-4">⏰ {item.jam_mulai} - {item.jam_selesai}</p>
                
                <button 
                  type="button" // Pastikan type button agar tidak dianggap submit
                  onClick={(e) => {
                    e.stopPropagation(); // Stop event merambat ke elemen lain
                    setSelectedJadwal(item);
                  }}
                  disabled={item.status !== 'Tersedia'}
                  // Tambahkan 'relative z-20' dan 'pointer-events-auto'
                  className={`relative z-20 w-full py-3 rounded-lg font-semibold transition-all active:scale-95 pointer-events-auto ${
                    item.status === 'Tersedia' 
                    ? 'bg-green-600 text-white hover:bg-green-700 cursor-pointer shadow-md' 
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {item.status === 'Tersedia' ? 'Booking Sekarang' : 'Sudah Dipesan'}
                </button>
              </div>
            </div>
          ))}
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