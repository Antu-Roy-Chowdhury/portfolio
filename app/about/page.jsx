import CustomCursor from "@/components/CustomCursor"
import AnimatedBackground from "@/components/AnimatedBackground"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import AboutEnhanced from "@/components/About"

export default function AboutPage() {
  return (
    <main className="relative min-h-screen">
      <CustomCursor />
      <AnimatedBackground />
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <section className="py-20">
          <AboutEnhanced />
        </section>
      </div>
      <Footer />
    </main>
  )
}
