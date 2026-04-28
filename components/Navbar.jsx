"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import Image from "next/image"

export default function Navbar({ navigationLinks = [], siteMeta }) {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const isActive = (path) => pathname === path

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  return (
    <nav
      id="navbar"
      className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? "border-b border-white/10 bg-[#070b10]/85 backdrop-blur-xl" : "bg-transparent"}`}
    >
      <div className="mx-auto flex max-w-[88rem] items-center justify-between px-5 py-4">
        
          <div className="flex items-center justify-center">
            <Link href="/" className="flex items-center gap-3">
            <Image src={siteMeta.logo} alt={siteMeta.shortName} width={179} height={45} className="w-auto h-8" /></Link>
          </div>
        

        <div className="hidden items-center gap-7 md:flex">
          {navigationLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm transition-colors ${isActive(link.href) ? "text-sky-200" : "text-slate-300 hover:text-white"}`}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/contact" className="rounded-full border border-sky-300/30 bg-sky-300/10 px-4 py-2 text-sm text-sky-100 transition hover:bg-sky-300/15">
            Contact me
          </Link>
        </div>

        <button
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {isOpen && (
        <div className="border-t border-white/10 bg-[#0a1017]/95 px-5 py-4 md:hidden">
          <div className="mx-auto flex max-w-[88rem] flex-col gap-2">
            {navigationLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-2xl px-4 py-3 text-sm ${isActive(link.href) ? "bg-sky-300/10 text-sky-200" : "text-slate-200 hover:bg-white/5"}`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
