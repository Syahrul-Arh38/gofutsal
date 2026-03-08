import Image from "next/image";
import { Hero, Navbar, Jadwal} from "@/components";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      {/* Section Jadwal akan dipanggil di sini */}
      <Jadwal />
      {/* Nanti kita tambahkan About, Paket, dan Kontak */}
    </main>
  );
}
