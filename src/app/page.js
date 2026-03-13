import Image from "next/image";
import { Hero, Navbar, Jadwal, Gallery, About, Contact, Footer } from "@/components";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <About />
      <Jadwal />
      <Gallery />
      <Contact />
      <Footer />
    </main>
  );
}
