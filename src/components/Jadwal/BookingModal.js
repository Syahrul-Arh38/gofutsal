"use client";
import { useState } from 'react';
import { postBooking } from '../../services/api';

export default function BookingModal({ jadwal, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    nama: '',
    no_hp: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fungsi validasi nomor HP saat user mengetik
  const handlePhoneChange = (e) => {
    const value = e.target.value;
    // Hanya izinkan angka (Regex: mengganti semua yang bukan angka menjadi string kosong)
    const numericValue = value.replace(/[^0-9]/g, '');
    
    setFormData({
      ...formData,
      no_hp: numericValue
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Validasi tambahan sebelum kirim
    if (formData.no_hp.length < 10) {
      setError('Nomor HP minimal 10 digit.');
      return;
    }

    setLoading(true);

    const payload = {
      nama: formData.nama,
      no_hp: formData.no_hp,
      lapangan: jadwal.lapangan,
      tanggal: jadwal.tanggal,
      jam: `${jadwal.jam_mulai} - ${jadwal.jam_selesai}`
    };

    try {
      const result = await postBooking(payload);
      if (result.success) {
        alert(`Berhasil! Booking ID: ${result.bookingId}. Admin akan menghubungi Anda.`);
        onSuccess(); // Memanggil refresh data di komponen Jadwal
        onClose();
      } else {
        setError('Gagal memproses booking. Silakan coba lagi.');
      }
    } catch (err) {
      setError('Terjadi kesalahan koneksi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl max-w-md w-full p-8 shadow-2xl relative animate-in fade-in zoom-in duration-200">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-red-500 text-2xl font-bold">&times;</button>
        
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Form Pemesanan</h3>
        <p className="text-sm text-gray-500 mb-6">
          Booking <span className="font-bold text-green-600">{jadwal.lapangan}</span> jam {jadwal.jam_mulai}
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
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition-all"
              placeholder="Contoh: Budi Santoso"
              value={formData.nama}
              onChange={(e) => setFormData({...formData, nama: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nomor WhatsApp (Hanya Angka)</label>
            <input
              type="text" // Gunakan text agar kita bisa kontrol inputnya via JS
              inputMode="numeric" // Memunculkan keyboard angka di HP
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition-all"
              placeholder="Contoh: 08123456789"
              value={formData.no_hp}
              onChange={handlePhoneChange}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-4 rounded-xl font-bold hover:bg-green-700 transition-all disabled:bg-gray-400 shadow-lg shadow-green-200"
          >
            {loading ? "Sedang Memesan..." : "Konfirmasi Booking"}
          </button>
        </form>
      </div>
    </div>
  );
}