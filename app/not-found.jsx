import Link from "next/link"
import { Home } from "lucide-react"
import CustomCursor from "@/components/CustomCursor"
import AnimatedBackground from "@/components/AnimatedBackground"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center text-white px-4 relative">
      <CustomCursor />
      <AnimatedBackground />

      <div className="glass-card p-12 rounded-lg text-center max-w-lg">
        <h1 className="text-9xl font-bold gradient-text glow-text">404</h1>
        <h2 className="text-2xl md:text-4xl font-bold mt-4 mb-6 text-center">Page Not Found</h2>
        <p className="text-gray-400 text-center max-w-md mb-8">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Link
          href="/"
          className="px-6 py-3 bg-[#1e9fab] text-white rounded-md flex items-center gap-2 hover:bg-[#1e9fab]/80 transition-colors mx-auto w-fit"
        >
          <Home size={16} /> Back to Home
        </Link>
      </div>
    </div>
  )
}
