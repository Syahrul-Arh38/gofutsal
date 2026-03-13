"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const formatWA = (num) => {
  if (!num) return "";
  let cleanNum = num.toString().replace(/\D/g, '');
  if (cleanNum.startsWith('0')) return '62' + cleanNum.slice(1);
  return cleanNum.startsWith('62') ? cleanNum : '62' + cleanNum;
};

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('booking'); // 'booking' atau 'jadwal'
  const [bookings, setBookings] = useState([]);
  const [jadwalList, setJadwalList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newJadwal, setNewJadwal] = useState({ lapangan: '', jam_mulai: '', jam_selesai: '', harga: '' });
  
  const router = useRouter();
  const URL_API = process.env.NEXT_PUBLIC_GAS_API_URL;

  useEffect(() => {
    const adminStatus = localStorage.getItem('isAdmin');
    if (adminStatus !== 'true') {
      router.push('/admin');
    } else {
      fetchAllData();
    }
  }, [router]);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      // Ambil Booking
      const resB = await fetch(`${URL_API}?action=getBooking`, { cache: 'no-store' });
      const dataB = await resB.json();
      setBookings(Array.isArray(dataB) ? dataB.reverse() : []);

      // Ambil Jadwal
      const resJ = await fetch(`${URL_API}?action=getJadwal`, { cache: 'no-store' });
      const dataJ = await resJ.json();
      setJadwalList(Array.isArray(dataJ) ? dataJ : []);
    } catch (err) {
      console.error("Gagal sinkronisasi data.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (id) => {
    if (!confirm("Konfirmasi pembayaran lunas?")) return;
    try {
      const res = await fetch(URL_API, {
        method: 'POST',
        body: JSON.stringify({ action: 'updateStatus', id, status: 'Lunas' }),
      });
      const result = await res.json();
      if (result.success) fetchAllData();
    } catch (err) { alert("Gagal update status."); }
  };

  const handleAddJadwal = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(URL_API, {
        method: 'POST',
        body: JSON.stringify({ action: 'addJadwal', payload: newJadwal }),
      });
      const result = await res.json();
      if (result.success) {
        setShowModal(false);
        fetchAllData();
      }
    } catch (err) { alert("Gagal menambah jadwal."); }
  };

  const handleDeleteJadwal = async (id) => {
    if (!confirm("Hapus jadwal ini?")) return;
    try {
      const res = await fetch(URL_API, {
        method: 'POST',
        body: JSON.stringify({ action: 'deleteJadwal', id }),
      });
      const result = await res.json();
      if (result.success) fetchAllData();
    } catch (err) { alert("Gagal menghapus."); }
  };

  const handleLogout = () => {
    if (confirm("Apakah Anda yakin ingin keluar?")) {
      // Hapus LocalStorage
      localStorage.removeItem('isAdmin'); 
      
      // Hapus Cookie dengan menyetel expired/max-age ke 0
      document.cookie = "isAdmin=; path=/; max-age=0; SameSite=Lax";
      
      window.location.href = '/admin'; 
    }
  };



  return (
    <div className="min-h-screen bg-gray-100 flex font-sans">
      {/* SIDEBAR */}
      <aside className="w-64 bg-green-900 text-white p-6 hidden md:block shadow-xl">
        <h1 className="text-2xl font-bold mb-10 border-b border-green-800 pb-4 text-center">Admin GoFutsal</h1>
        <nav className="space-y-2">
          <button 
            onClick={() => setActiveTab('booking')}
            className={`w-full text-left p-3 rounded-lg transition ${activeTab === 'booking' ? 'bg-green-700 font-bold shadow-inner' : 'hover:bg-green-800'}`}
          >
            Daftar Booking
          </button>
          <button 
            onClick={() => setActiveTab('jadwal')}
            className={`w-full text-left p-3 rounded-lg transition ${activeTab === 'jadwal' ? 'bg-green-700 font-bold shadow-inner' : 'hover:bg-green-800'}`}
          >
            Kelola Jadwal
          </button>
          <button onClick={handleLogout} className="w-full text-left p-3 hover:bg-red-600 rounded-lg mt-20 transition font-medium text-red-200">
            Logout
          </button>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-4 md:p-10 overflow-x-hidden">
        <div className="flex justify-between items-center mb-8 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              {activeTab === 'booking' ? "Daftar Pesanan Masuk" : "Pengaturan Jadwal Lapangan"}
            </h2>
            <p className="text-gray-500 text-sm">Dashboard Management System</p>
          </div>
          <div className="flex gap-2">
            {activeTab === 'jadwal' && (
              <button onClick={() => setShowModal(true)} className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-bold transition shadow-lg shadow-blue-100">
                + Tambah Jadwal
              </button>
            )}
            <button onClick={fetchAllData} className="bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-xl font-bold transition flex items-center gap-2 active:scale-95 shadow-lg shadow-green-100">
              <span>🔄</span> Refresh
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-200">
          <div className="overflow-x-auto">
            {activeTab === 'booking' ? (
              /* TABEL BOOKING */
              <table className="w-full text-left border-collapse">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="p-4 text-xs uppercase font-bold text-gray-500">ID / Nama</th>
                    <th className="p-4 text-xs uppercase font-bold text-gray-500">Kontak WA</th>
                    <th className="p-4 text-xs uppercase font-bold text-gray-500">Jadwal</th>
                    <th className="p-4 text-xs uppercase font-bold text-gray-500 text-center">Status</th>
                    <th className="p-4 text-xs uppercase font-bold text-gray-500 text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {loading ? (
                    <tr><td colSpan="5" className="p-20 text-center animate-pulse">Menyinkronkan data...</td></tr>
                  ) : bookings.map((row, index) => {
                    const isLunas = Object.values(row).some(v => v?.toString().toLowerCase().trim() === 'lunas');
                    return (
                      <tr key={index} className="hover:bg-gray-50 transition">
                        <td className="p-4">
                          <div className="font-bold text-gray-700">{row.nama || row.Nama}</div>
                          <div className="text-[10px] text-gray-400 font-mono">{row.id || row.ID}</div>
                        </td>
                        <td className="p-4 text-sm">
                          <a href={`https://wa.me/${formatWA(row.no_hp || row.No_HP)}`} target="_blank" className="text-blue-600 font-bold hover:underline">
                            {row.no_hp || row.No_HP}
                          </a>
                        </td>
                        <td className="p-4 text-sm">
                          <div className="font-semibold text-gray-700">{row.lapangan || row.Lapangan}</div>
                          <div className="text-gray-500 text-[11px]">{row.tanggal || row.Tanggal} | {row.jam || row.Jam}</div>
                        </td>
                        <td className="p-4 text-center">
                          <span className={`px-3 py-1 rounded-full text-[10px] font-black border ${isLunas ? 'bg-green-100 text-green-700 border-green-200' : 'bg-yellow-100 text-yellow-700 border-yellow-200'}`}>
                            {isLunas ? "LUNAS" : "PENDING"}
                          </span>
                        </td>
                        <td className="p-4 text-center">
                          {isLunas ? <span className="text-green-600 font-bold text-xs italic">Selesai</span> : (
                            <button onClick={() => handleUpdateStatus(row.id || row.ID)} className="bg-green-600 text-white px-3 py-1.5 rounded-lg text-[10px] font-bold">Konfirmasi</button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : (
              /* TABEL KELOLA JADWAL */
              <table className="w-full text-left border-collapse">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="p-4 text-xs uppercase font-bold text-gray-500">Lapangan</th>
                    <th className="p-4 text-xs uppercase font-bold text-gray-500">Jam Operasional</th>
                    <th className="p-4 text-xs uppercase font-bold text-gray-500">Harga</th>
                    <th className="p-4 text-xs uppercase font-bold text-gray-500 text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {jadwalList.map((item, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="p-4 font-bold text-gray-800">{item.lapangan}</td>
                        <td className="p-4 text-sm">
                          {/* Pastikan memanggil properti yang sesuai dengan header spreadsheet */}
                          {item.jam_mulai} - {item.jam_selesai}
                        </td>
                        <td className="p-4 text-sm font-mono text-green-700 font-bold">
                          {/* Gunakan pengecekan isNaN agar tidak muncul Rp NaN */}
                          Rp {item.harga && !isNaN(item.harga) ? Number(item.harga).toLocaleString('id-ID') : '0'}
                        </td>
                        <td className="p-4 text-center">
                          <button 
                            onClick={() => handleDeleteJadwal(item.id)} 
                            className="text-red-500 hover:bg-red-50 px-4 py-2 rounded-xl text-xs font-bold border border-red-100 transition"
                          >
                            Hapus
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
              </table>
            )}
          </div>
        </div>
      </main>

      {/* MODAL TAMBAH JADWAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <form onSubmit={handleAddJadwal} className="bg-white p-8 rounded-2xl w-full max-w-md shadow-2xl scale-in-center">
            <h3 className="text-xl font-bold mb-6 text-gray-800 border-b pb-2">Tambah Jadwal Baru</h3>
            <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                Nama Lapangan / Judul
              </label>
              <input 
                type="text" 
                list="lapanganOptions" // Menghubungkan ke datalist di bawah
                placeholder="Ketik nama lapangan atau judul..." 
                className="w-full border p-3 rounded-xl mt-1 text-gray-700 focus:ring-2 focus:ring-blue-500 outline-none transition-all" 
                required 
                value={newJadwal.lapangan} 
                onChange={(e) => setNewJadwal({...newJadwal, lapangan: e.target.value})}
              />
              
              {/* Daftar saran yang akan muncul saat kolom diklik atau diketik */}
              <datalist id="lapanganOptions">
                <option value="Lapangan A (Rumput)" />
                <option value="Lapangan B (Vinyl)" />
                <option value="Event Spesial" />
                <option value="Turnamen" />
              </datalist>
              
              <p className="text-[10px] text-gray-400 mt-1 italic">
                *Kamu bisa mengetik nama baru atau memilih dari saran yang ada.
              </p>
            </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase">Jam Mulai</label>
                  <input type="time" placeholder="08:00" className="w-full border  p-3 rounded-xl mt-1 text-gray-700" required 
                    onChange={(e) => setNewJadwal({...newJadwal, jam_mulai: e.target.value})} />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase">Jam Selesai</label>
                  <input type="time" placeholder="09:00" className="w-full border p-3 rounded-xl mt-1 text-gray-700" required 
                    onChange={(e) => setNewJadwal({...newJadwal, jam_selesai: e.target.value})} />
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase">Harga Sewa (Rp)</label>
                <input type="number" placeholder="100000" className="w-full border p-3 rounded-xl mt-1 font-mono text-gray-700" required 
                  onChange={(e) => setNewJadwal({...newJadwal, harga: e.target.value})} />
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-8">
              <button type="button" onClick={() => setShowModal(false)} className="px-5 py-2 text-gray-400 font-bold">Batal</button>
              <button type="submit" className="bg-green-600 text-white px-8 py-2 rounded-xl font-bold shadow-lg shadow-green-100 active:scale-95 transition">Simpan Jadwal</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}