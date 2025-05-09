"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import Image from "next/image";

export default function Navbar() {
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

  const isActive = (path) => {
    return pathname === path
  }

  return (
    <nav
    
      id="navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-[#0a0a0a]/90 backdrop-blur-md shadow-lg" : "bg-transparent"}`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* add logo here */}
          {/* <div className="w-10 h-10 bg-gray-800 rounded-full"></div> */}
          <div>
            <Image
              src="/skylight.png"
              alt="Logo"
              width={120}
              height={100}
              className="rounded-full"/>
          </div>
        

          <div className="hidden md:flex space-x-8">
            <Link href="/" className={`navbar-item transition-colors ${isActive("/") ? "neon-text" : "hover:neon-text"}`}>
              HOME
            </Link>
            <Link href="/about" className={`navbar-item transition-colors ${isActive("/about") ? "neon-text" : "hover:neon-text"}`}>
              ABOUT
            </Link>
            <Link
              href="/projects"
              className={`navbar-item transition-colors ${isActive("/projects") ? "neon-text" : "hover:neon-text"}`}
            >
              PROJECTS
            </Link>
            <Link
              href="/skills"
              className={`navbar-item transition-colors ${isActive("/skills") ? "neon-text" : "hover:neon-text"}`}
            >
              SKILLS
            </Link>
            <Link
              href="/research"
              className={`navbar-item transition-colors ${isActive("/research") ? "neon-text" : "hover:neon-text"}`}
            >
              RESEARCH
            </Link>
            <Link
              href="/contact"
              className={`navbar-item transition-colors ${isActive("/contact") ? "neon-text" : "hover:neon-text"}`}
            >
              CONTACT
            </Link>
          </div>

          <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-[#0a0a0a] border-t border-gray-800">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <Link
              href="/"
              className={`py-2 transition-colors ${isActive("/") ? "neon-text" : "hover:neon-text"}`}
              onClick={() => setIsOpen(false)}
            >
              HOME
            </Link>
            <Link
              href="/about"
              className={`py-2 transition-colors ${isActive("/about") ? "neon-text" : "hover:neon-text"}`}
              onClick={() => setIsOpen(false)}
            >
              ABOUT
            </Link>
            <Link
              href="/projects"
              className={`py-2 transition-colors ${isActive("/projects") ? "neon-text" : "hover:neon-text"}`}
              onClick={() => setIsOpen(false)}
            >
              PROJECTS
            </Link>
            <Link
              href="/skills"
              className={`py-2 transition-colors ${isActive("/skills") ? "neon-text" : "hover:neon-text"}`}
              onClick={() => setIsOpen(false)}
            >
              SKILLS
            </Link>
            <Link
              href="/research"
              className={`py-2 transition-colors ${isActive("/research") ? "neon-text" : "hover:neon-text"}`}
              onClick={() => setIsOpen(false)}
            >
              RESEARCH
            </Link>
            <Link
              href="/contact"
              className={`py-2 transition-colors ${isActive("/contact") ? "neon-text" : "hover:neon-text"}`}
              onClick={() => setIsOpen(false)}
            >
              CONTACT
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
