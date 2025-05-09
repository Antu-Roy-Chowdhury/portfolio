import Link from "next/link";
import { Home } from "lucide-react";
import CustomCursor from "@/components/CustomCursor";
import AnimatedBackground from "@/components/AnimatedBackground";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center text-white px-4 relative overflow-hidden">
      <CustomCursor />
      <AnimatedBackground />

      {/* Background with subtle wave effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] to-[#1e3a8a] opacity-50 z-0">
        <div className="wave-animation"></div>
      </div>

      {/* Scattered Papers Animation */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="paper"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Main Content */}
      <div className="glass-card p-12 rounded-lg text-center max-w-lg relative z-20">
        {/* 404 Text with Map Background */}
        <h1
          className="text-9xl font-bold glow-text relative"
          style={{
            backgroundImage: "url('https://www.transparenttextures.com/patterns/old-map.png')",
            backgroundSize: "cover",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            color: "transparent",
            textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
          }}
        >
          404
        </h1>
        <h2 className="text-2xl md:text-4xl font-bold mt-4 mb-6 text-center tracking-wider">
          Page Not Found
        </h2>
        <p className="text-gray-400 text-center max-w-md mb-8 font-serif italic">
          The page ye be lookin’ for might have been plundered, lost in the storm, or is temporarily hidden in the fog.
        </p>
        <Link
          href="/"
          className="px-6 py-3 bg-[#1e9fab] text-white rounded-md flex items-center gap-2 hover:bg-[#1e9fab]/80 transition-colors mx-auto w-fit"
        >
          <Home size={16} /> Back to Home
        </Link>
      </div>

      {/* Treasure Chest at the Bottom */}
      <div className="absolute bottom-10 left-10 z-20">
        <div className="text-4xl">💰</div>
      </div>
    </div>
  );
}
