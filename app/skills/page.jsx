import CustomCursor from "@/components/CustomCursor"
import AnimatedBackground from "@/components/AnimatedBackground"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import Skills from "@/components/Skills"

export default function SkillsPage() {
  return (
    <main className="relative min-h-screen">
      <CustomCursor />
      <AnimatedBackground />
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <section className="py-20">
          <Skills />
        </section>
      </div>
      <Footer />
    </main>
  )
}
