"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Mengirim request ke API Google Apps Script
      const res = await fetch(process.env.NEXT_PUBLIC_GAS_API_URL, {
        method: 'POST',
        body: JSON.stringify({
          action: 'login',
          username,
          password
        }),
      });

      const result = await res.json();

      if (result.success) {
        // 1. Simpan di localStorage (untuk proteksi sisi client/UI)
        localStorage.setItem('isAdmin', 'true');

        // 2. TAMBAHKAN INI: Simpan di Cookie (agar Middleware server bisa baca)
        // Cookie ini akan berlaku selama 24 jam (86400 detik)
        document.cookie = "isAdmin=true; path=/; max-age=86400; SameSite=Lax";

        router.push('/admin/dashboard');
      } else {
        setError('Username atau Password salah!');
      }
    } catch (err) {
      setError('Terjadi kesalahan koneksi ke server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">Login Admin GoFutsal</h2>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              required
              className="mt-1 block w-full text-gray-700  px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              required
              className="mt-1 block w-full text-gray-700  px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors font-bold"
          >
            {loading ? 'Mengecek...' : 'Masuk ke Dashboard'}
          </button>
        </form>
      </div>
    </div>
  );
}