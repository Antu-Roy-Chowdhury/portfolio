import CustomCursor from "@/components/CustomCursor"
import AnimatedBackground from "@/components/AnimatedBackground"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import ResearchEnhanced from "@/components/Research"

export default function ResearchPage() {
  return (
    <main className="relative min-h-screen">
      <CustomCursor />
      <AnimatedBackground />
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <section className="py-20">
          <ResearchEnhanced />
        </section>
      </div>
      <Footer />
    </main>
  )
}
