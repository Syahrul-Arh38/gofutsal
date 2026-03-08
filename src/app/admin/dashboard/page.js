"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

// 1. Tambahkan fungsi helper ini di paling atas (di luar komponen)
const formatWA = (num) => {
  if (!num) return "";
  let stringNum = num.toString();
  // Mengubah 0812... menjadi 62812...
  if (stringNum.startsWith('0')) {
    return '62' + stringNum.slice(1);
  }
  return stringNum;
};

export default function AdminDashboard() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const adminStatus = localStorage.getItem('isAdmin');
    if (adminStatus !== 'true') {
      router.push('/admin');
    } else {
      fetchBookingData();
    }
  }, [router]);

  const fetchBookingData = async () => {
    setLoading(true);
    const URL_API = process.env.NEXT_PUBLIC_GAS_API_URL;

    try {
      console.log("📡 Memanggil API...");
      const res = await fetch(`${URL_API}?action=getBooking`, {
        method: 'GET',
        cache: 'no-store',
        redirect: 'follow',
      });

      const rawData = await res.json();
      console.log("📦 Data Mentah dari GAS:", rawData);

      let finalData = [];
      if (Array.isArray(rawData)) {
        finalData = rawData;
      } else if (rawData.data && Array.isArray(rawData.data)) {
        finalData = rawData.data;
      }

      // Filter untuk memastikan hanya baris berisi data yang masuk
      const cleanData = finalData.filter(item => 
        item.nama || item.Nama || item.id || item.ID
      );
      
      setBookings(cleanData.reverse());
      
    } catch (err) {
      console.error("❌ Error Fetching:", err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (id) => {
    if (!confirm("Konfirmasi pembayaran lunas untuk booking ini?")) return;
  
    try {
      const res = await fetch(process.env.NEXT_PUBLIC_GAS_API_URL, {
        method: 'POST',
        body: JSON.stringify({
          action: 'updateStatus',
          id: id,
          status: 'Lunas'
        }),
      });
      const result = await res.json();
      if (result.success) {
        alert("Pembayaran Berhasil Dikonfirmasi!");
        fetchBookingData(); // Refresh tabel otomatis
      }
    } catch (err) {
      alert("Gagal update status: " + err.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    router.push('/admin');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-green-900 text-white p-6 hidden md:block shadow-xl">
        <h1 className="text-2xl font-bold mb-10 border-b border-green-800 pb-4">Admin GoFutsal</h1>
        <nav className="space-y-2">
          <div className="bg-green-700 p-3 rounded-lg font-semibold shadow-inner">Daftar Booking</div>
          <div className="p-3 hover:bg-green-800 rounded-lg cursor-pointer transition">Kelola Jadwal</div>
          <button onClick={handleLogout} className="w-full text-left p-3 hover:bg-red-600 rounded-lg mt-20 transition font-medium">
            Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-10 overflow-x-hidden">
        <div className="flex justify-between items-center mb-8 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Daftar Pesanan Masuk</h2>
            <p className="text-gray-500 text-sm">Total: {bookings.length} Pesanan</p>
          </div>
          <button 
            onClick={fetchBookingData} 
            className="bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-xl font-bold transition-all flex items-center gap-2 active:scale-95 shadow-lg shadow-green-100"
          >
            <span>🔄</span> Refresh Data
          </button>
        </div>

        {/* Tabel */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="p-4 font-semibold text-gray-600 uppercase text-xs tracking-wider">ID / Nama</th>
                  <th className="p-4 font-semibold text-gray-600 uppercase text-xs tracking-wider">Kontak WA</th>
                  <th className="p-4 font-semibold text-gray-600 uppercase text-xs tracking-wider">Lapangan & Jam</th>
                  <th className="p-4 font-semibold text-gray-600 uppercase text-xs tracking-wider text-center">Status</th>
                  <th className="p-4 font-semibold text-gray-600 uppercase text-xs tracking-wider text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {loading ? (
                  <tr>
                    <td colSpan="5" className="p-20 text-center">
                      <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-green-500 border-t-transparent"></div>
                      <p className="mt-2 text-gray-500">Memuat data...</p>
                    </td>
                  </tr>
                ) : bookings.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="p-20 text-center text-gray-400 italic">Belum ada booking masuk.</td>
                  </tr>
                ) : (
                  bookings.map((row, index) => (
                    <tr key={index} className="hover:bg-gray-50/80 transition-colors group">
                      <td className="p-4">
                        <div className="font-bold text-gray-800">{row.nama || row.Nama || 'No Name'}</div>
                        <div className="text-xs text-gray-400 font-mono">{row.id || row.ID || '-'}</div>
                      </td>
                      
                      <td className="p-4 text-sm">
                        <a 
                          href={`https://wa.me/${formatWA(row.no_hp || row.No_HP)}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2 group-hover:underline"
                        >
                          📱 {row.no_hp || row.No_HP || '-'}
                        </a>
                      </td>

                      <td className="p-4 text-sm">
                        <div className="font-semibold text-gray-700">{row.lapangan || row.Lapangan || '-'}</div>
                        <div className="text-gray-500 text-xs italic">
                          {row.tanggal || row.Tanggal} | {row.jam || row.Jam}
                        </div>
                      </td>

                      <td className="p-4 text-center text-xs">
                        <span className={`px-3 py-1.5 rounded-full font-bold shadow-sm ${
                          (row.status_pembayaran === 'Lunas' || row.Status === 'Lunas') 
                            ? 'bg-green-100 text-green-700 border border-green-200' 
                            : 'bg-yellow-100 text-yellow-700 border border-yellow-200'
                        }`}>
                          {row.status_pembayaran || row.Status || 'Pending'}
                        </span>
                      </td>
                      
                      <td className="p-4 text-center">
                        {row.status_pembayaran !== 'Lunas' && row.Status !== 'Lunas' ? (
                            <button 
                            onClick={() => handleUpdateStatus(row.id || row.ID)}
                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-1.5 rounded-lg text-xs font-bold transition-all"
                            >
                            Konfirmasi Lunas
                            </button>
                        ) : (
                            <span className="text-green-600 font-bold text-xs">✅ Selesai</span>
                        )}
                        </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}