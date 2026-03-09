import Image from "next/image";
import { Hero, Navbar, Jadwal, Gallery, About, Contact, Footer } from "@/components";

export default function Home() {
  return (
    <>
    <Navbar />
    <Hero />
    <main className="min-h-screen bg-white">
      <About />
      <Jadwal />
      <Gallery />
      <Contact />
    </main>
    <Footer />
    </>
  );
}
