"use client";
import { useState, useEffect } from 'react';

export default function KelolaJadwal() {
  const [jadwal, setJadwal] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newJadwal, setNewJadwal] = useState({
    lapangan: 'Lapangan A',
    hari: 'Setiap Hari',
    jam_mulai: '',
    jam_selesai: '',
    harga: ''
  });

  const URL_API = process.env.NEXT_PUBLIC_GAS_API_URL;

  const fetchJadwal = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${URL_API}?action=getJadwal`, { cache: 'no-store' });
      const data = await res.json();
      setJadwal(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchJadwal(); }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await fetch(URL_API, {
        method: 'POST',
        body: JSON.stringify({ action: 'addJadwal', payload: newJadwal })
      });
      setShowModal(false);
      fetchJadwal();
    } catch (err) { alert("Gagal tambah jadwal"); }
  };

  const handleDelete = async (id) => {
    if (!confirm("Hapus jadwal ini?")) return;
    try {
      await fetch(URL_API, {
        method: 'POST',
        body: JSON.stringify({ action: 'deleteJadwal', id })
      });
      fetchJadwal();
    } catch (err) { alert("Gagal hapus"); }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Kelola Jadwal Lapangan</h2>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-green-600 text-white px-4 py-2 rounded-lg font-bold"
        >
          + Tambah Jam Operasional
        </button>
      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4">Lapangan</th>
              <th className="p-4">Jam</th>
              <th className="p-4">Harga</th>
              <th className="p-4 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {jadwal.map((item, index) => (
              <tr key={index} className="border-b">
                <td className="p-4 font-bold">{item.lapangan}</td>
                <td className="p-4">{item.jam_mulai} - {item.jam_selesai}</td>
                <td className="p-4">Rp {Number(item.harga).toLocaleString()}</td>
                <td className="p-4 text-center">
                  <button 
                    onClick={() => handleDelete(item.id)}
                    className="text-red-500 hover:bg-red-50 px-3 py-1 rounded"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Tambah Jadwal Sederhana */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
          <form onSubmit={handleAdd} className="bg-white p-6 rounded-xl w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Tambah Jadwal Baru</h3>
            <div className="space-y-3">
              <select 
                className="w-full border p-2 rounded"
                onChange={(e) => setNewJadwal({...newJadwal, lapangan: e.target.value})}
              >
                <option>Lapangan A</option>
                <option>Lapangan B</option>
              </select>
              <input type="text" placeholder="Jam Mulai (Contoh 08:00)" className="w-full border p-2 rounded" required
                onChange={(e) => setNewJadwal({...newJadwal, jam_mulai: e.target.value})} />
              <input type="text" placeholder="Jam Selesai (Contoh 09:00)" className="w-full border p-2 rounded" required
                onChange={(e) => setNewJadwal({...newJadwal, jam_selesai: e.target.value})} />
              <input type="number" placeholder="Harga (Contoh 100000)" className="w-full border p-2 rounded" required
                onChange={(e) => setNewJadwal({...newJadwal, harga: e.target.value})} />
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 text-gray-500">Batal</button>
              <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Simpan</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}