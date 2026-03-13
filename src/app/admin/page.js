"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

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
        localStorage.setItem('isAdmin', 'true');
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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 relative overflow-hidden">
      
      {/* Dekorasi Background agar senada dengan landing page */}
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-green-50 to-transparent opacity-60"></div>
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-green-100 rounded-full blur-3xl opacity-30"></div>

      <div className="max-w-md w-full relative z-10">
        
        {/* Tombol Kembali ke Home */}
        <Link 
          href="/" 
          className="inline-flex items-center text-sm font-bold text-gray-400 hover:text-green-600 mb-8 transition-colors group"
        >
          <span className="mr-2 transform group-hover:-translate-x-1 transition-transform">←</span> 
          Kembali ke Beranda
        </Link>

        <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-gray-200/50 p-10 border border-gray-100">
          <div className="text-center mb-10">
            <div className="w-20 h-20 bg-green-100 rounded-3xl flex items-center justify-center text-4xl mx-auto mb-4">
              🛡️
            </div>
            <h2 className="text-3xl font-extrabold text-gray-900">Admin Login</h2>
            <p className="text-gray-400 text-sm mt-2 font-medium">Management System GoFutsal</p>
            <div className="w-12 h-1 bg-green-600 mx-auto mt-4 rounded-full"></div>
          </div>
          
          {error && (
            <div className="bg-red-50 border border-red-100 text-red-600 text-sm p-4 rounded-2xl mb-6 flex items-center gap-3 animate-shake">
              <span>⚠️</span> {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 mb-2">Username</label>
              <input
                type="text"
                required
                placeholder="Masukkan username"
                className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-gray-700 focus:ring-2 focus:ring-green-500 focus:bg-white outline-none transition-all font-medium"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 mb-2">Password</label>
              <input
                type="password"
                required
                placeholder="••••••••"
                className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-gray-700 focus:ring-2 focus:ring-green-500 focus:bg-white outline-none transition-all font-medium"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 rounded-2xl font-bold text-white transition-all transform active:scale-95 shadow-lg flex items-center justify-center gap-2 ${
                loading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-green-600 hover:bg-green-700 shadow-green-200'
              }`}
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Mengecek...
                </>
              ) : (
                'Masuk ke Dashboard →'
              )}
            </button>
          </form>
        </div>
        
        <p className="text-center mt-8 text-gray-400 text-xs font-medium">
          Protected Area &copy; {new Date().getFullYear()} GoFutsal Center
        </p>
      </div>
    </div>
  );
}