import Hero from "@/components/Hero"
import CustomCursor from "@/components/CustomCursor"
import AnimatedBackground from "@/components/AnimatedBackground"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import SectionHighlights from "@/components/SectionHighlights"

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <CustomCursor />
      <AnimatedBackground />
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <section className="py-20">
          <Hero />
        </section>

        <section className="py-20">
          <SectionHighlights />
        </section>
      </div>
      <Footer />
    </main>
  )
}
