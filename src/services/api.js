// src/services/api.js

const API_URL = process.env.NEXT_PUBLIC_GAS_API_URL;

export const getJadwal = async () => {
  try {
    const res = await fetch(`${API_URL}?action=getJadwal`, {
      method: 'GET',
      cache: 'no-store',
      redirect: 'follow', // WAJIB untuk Google Apps Script
    });
    
    if (!res.ok) throw new Error("Gagal mengambil data jadwal");
    return await res.json();
  } catch (error) {
    console.error("API Error (Jadwal):", error);
    return [];
  }
};

export const getBooking = async () => {
  try {
    const res = await fetch(`${API_URL}?action=getBooking`, {
      method: 'GET',
      cache: 'no-store',
      redirect: 'follow', // WAJIB untuk Google Apps Script
    });
    
    if (!res.ok) throw new Error("Gagal mengambil data booking");
    return await res.json();
  } catch (error) {
    console.error("API Error (Booking):", error);
    return [];
  }
};

export const getPaket = async () => {
  try {
    const res = await fetch(`${API_URL}?action=getPaket`, {
      method: 'GET',
      redirect: 'follow',
    });
    return await res.json();
  } catch (error) {
    console.error("API Error (Paket):", error);
    return [];
  }
};

export const postBooking = async (formData) => {
  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      body: JSON.stringify({ 
        action: 'booking',
        ...formData 
      }),
      redirect: 'follow',
      mode: 'no-cors',
    });
    return { success: true, message: "Booking berhasil dikirim!" };
  } catch (error) {
    console.error("API Error:", error);
    return { success: false, message: "Terjadi kesalahan koneksi." };
  }
};