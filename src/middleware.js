import { NextResponse } from 'next/server';

// PENTING: Nama fungsi harus 'middleware' dan harus di-export
export function middleware(request) {
  // Ambil status login dari Cookie (bukan localStorage)
  // Karena Middleware berjalan di sisi Server, ia tidak bisa baca localStorage
  const isAdmin = request.cookies.get('isAdmin')?.value;

  const url = request.nextUrl.clone();

  // Jika mencoba masuk ke dashboard tapi tidak ada cookie isAdmin
  if (url.pathname.startsWith('/admin/dashboard')) {
    if (isAdmin !== 'true') {
      url.pathname = '/admin'; // Alihkan ke halaman login
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

// Tentukan halaman mana saja yang akan diawasi oleh middleware ini
export const config = {
  matcher: ['/admin/dashboard/:path*'],
};