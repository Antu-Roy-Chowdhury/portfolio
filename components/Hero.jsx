"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Download } from "lucide-react"

export default function Hero() {
  const textRef = useRef(null)

  useEffect(() => {
    const text = textRef.current
    if (!text) return

    const letters = text.textContent.split("")
    text.textContent = ""

    letters.forEach((letter, i) => {
      const span = document.createElement("span")
      span.textContent = letter
      span.style.animationDelay = `${i * 0.05}s`
      span.className = "inline-block opacity-0 animate-fade-in"
      text.appendChild(span)
    })
  }, [])

  return (
    <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-12">
      <div className="w-full md:w-1/2 space-y-6">
        <div className="space-y-3">
          <p className="text-sm tracking-[0.3em] neon-text">D E V E L O P E R | D E S I G N E R</p>
          <h1 ref={textRef} className="text-4xl md:text-5xl lg:text-6xl font-bold">
            I'm Antu Roy Chowdhury
          </h1>
          <p className="text-gray-400 text-lg mt-4">
      
            Designer, Web Dev, Engineer, and Meme Master, weaving elegant solutions with wit.
          </p>
        </div>

        <div className="flex flex-wrap gap-4 pt-4">
          <Link
            href="/projects"
            className="px-6 py-3 bg-[#1e9fab] text-white rounded-md flex items-center gap-2 hover:bg-[#1e9fab]/80 transition-colors"
          >
            View My Work <ArrowRight size={16} />
          </Link>
          <Link
            href="/resume.pdf"
            className="px-6 py-3 bg-transparent border border-[#1e9fab] text-[#1e9fab] rounded-md flex items-center gap-2 hover:bg-[#1e9fab]/10 transition-colors"
            download
          >
            Download Resume <Download size={16} />
          </Link>
        </div>
      </div>

      <div className="w-full md:w-1/2 relative">
        <div className="relative w-64 h-64 md:w-80 md:h-80 mx-auto">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#1e9fab]/20 to-transparent animate-pulse"></div>
          <div className="absolute inset-2 rounded-full border-2 border-[#1e9fab] overflow-hidden">
            <Image
              src="/placeholder-user.jpg"
              alt="Antu Roy Chowdhury"
              width={300}
              height={300}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -bottom-4 -right-4 bg-[#0a0a0a] px-4 py-2 rounded-full border border-[#1e9fab]">
            <span className="text-[#1e9fab] font-bold"><Image src="/skylight.png" width={200} height={200} alt="Antu Roy Chowdhury" /></span>
          </div>
        </div>
      </div>
    </div>
  )
}
