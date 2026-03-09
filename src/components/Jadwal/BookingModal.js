"use client";
import { useState } from 'react';
import { postBooking } from '../../services/api';

export default function BookingModal({ jadwal, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    nama: '',
    no_hp: '',
    tanggal: '', // Akan diisi oleh input date
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    const numericValue = value.replace(/[^0-9]/g, '');
    setFormData({ ...formData, no_hp: numericValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (formData.no_hp.length < 10) {
      setError('Nomor HP minimal 10 digit.');
      return;
    }

    setLoading(true);

    // PERBAIKAN: Pastikan semua data dikirim sebagai STRING MURNI
    // Tambahkan tanda kutip satu (') di depan no_hp dan jam untuk mencegah auto-format Google Sheets
    const payload = {
      nama: formData.nama,
      no_hp: `'${formData.no_hp}`, 
      lapangan: jadwal.lapangan,
      tanggal: formData.tanggal, // Mengambil dari input date modal
      jam: `'${jadwal.jam_mulai} - ${jadwal.jam_selesai}` 
    };

    try {
      const result = await postBooking(payload);
      
      // Karena kita menggunakan mode: 'no-cors', kita asumsikan sukses 
      // jika try-block tidak melempar error (catch).
      if (result.success) {
        alert(`Booking Berhasil Terkirim! Admin akan menghubungi Anda via WhatsApp.`);
        onSuccess();
        onClose();
      } else {
        setError('Gagal memproses booking. Silakan coba lagi.');
      }
    } catch (err) {
      // Jika masuk ke sini, berarti ada masalah jaringan fatal
      setError('Terjadi masalah pada server. Namun cek dashboard Anda, data mungkin sudah masuk.');
    } finally {
      setLoading(false);
    }
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl max-w-md w-full p-8 shadow-2xl relative animate-in fade-in zoom-in duration-200">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-red-500 text-2xl font-bold">&times;</button>
        
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Form Pemesanan</h3>
        <p className="text-sm text-gray-500 mb-6">
          Anda akan memesan <span className="font-bold text-green-600">{jadwal.lapangan}</span>
        </p>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
            <input
              type="text"
              required
              className="w-full px-4 py-3 text-gray-700 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition-all"
              placeholder="Contoh: Budi Santoso"
              value={formData.nama}
              onChange={(e) => setFormData({...formData, nama: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nomor WhatsApp</label>
            <input
              type="text"
              inputMode="numeric"
              required
              className="w-full px-4 py-3 text-gray-700 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition-all"
              placeholder="Contoh: 0812..."
              value={formData.no_hp}
              onChange={handlePhoneChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal Main</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">📅</span>
              <input
                type="date"
                required
                min={today}
                value={formData.tanggal}
                onChange={(e) => setFormData({ ...formData, tanggal: e.target.value })}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition-all"
              />
            </div>
          </div>

          <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
             <p className="text-xs text-gray-500 uppercase font-bold mb-1">Detail Jadwal Terpilih:</p>
             <p className="text-sm text-gray-700">{jadwal.jam_mulai} - {jadwal.jam_selesai}</p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-4 rounded-xl font-bold hover:bg-green-700 transition-all disabled:bg-gray-400 shadow-lg shadow-green-200"
          >
            {loading ? "Sedang Memesan..." : "Konfirmasi Booking Sekarang"}
          </button>
        </form>
      </div>
    </div>
  );
}