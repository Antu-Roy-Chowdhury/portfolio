"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import {
  Home,
  User,
  GraduationCap,
  Wrench,
  FolderGit2,
  Mail,
  Grid,
  X,
  Linkedin,
  Github,
  Facebook,
  Instagram,
  BookOpen,
  Code2,
} from "lucide-react"

export default function Navbar({ navigationLinks = [], siteMeta, hero }) {
  const [activeSheet, setActiveSheet] = useState(null) // 'nav' | 'socials' | null
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const isActive = (path) => pathname === path

  useEffect(() => {
    setActiveSheet(null)
  }, [pathname])

  const navIcons = {
    Home: Home,
    About: User,
    Academic: GraduationCap,
    Research: GraduationCap,
    Skills: Wrench,
    Projects: FolderGit2,
    Contact: Mail,
  }

  const socialLinks = [
    { label: "LinkedIn", href: "https://linkedin.com", icon: Linkedin },
    { label: "GitHub", href: "https://github.com", icon: Github },
    { label: "Facebook", href: "https://facebook.com", icon: Facebook },
    { label: "Instagram", href: "https://instagram.com", icon: Instagram },
    { label: "Codeforces", href: "https://codeforces.com", icon: Code2 },
    { label: "Google Scholar", href: "https://scholar.google.com", icon: BookOpen },
    { label: "ResearchGate", href: "https://researchgate.net", icon: BookOpen },
    { label: "Email", href: "mailto:contact@anturoychowdhury.me", icon: Mail },
  ]

  const closeSheet = () => setActiveSheet(null)

  return (
    <>
      {/* Top Navbar: Visible on all screens, but hamburger button is removed so mobile content never gets pushed */}
      <nav
        id="navbar"
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled
            ? "border-b border-white/10 bg-[#070b10]/85 backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-[88rem] items-center justify-between px-5 py-4">
          <div className="flex items-center justify-center">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src={siteMeta.logo}
                alt={siteMeta.shortName}
                width={179}
                height={45}
                className="h-8 w-auto"
                priority
              />
            </Link>
          </div>

          <div className="hidden items-center gap-7 md:flex">
            {navigationLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm transition-colors ${
                  isActive(link.href)
                    ? "text-sky-200"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="rounded-full border border-sky-300/30 bg-sky-300/10 px-4 py-2 text-sm text-sky-100 transition hover:bg-sky-300/15"
            >
              Contact me
            </Link>
          </div>
        </div>
      </nav>

      {/* Backdrop overlay for modal sheets */}
      {activeSheet && (
        <div
          onClick={closeSheet}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity duration-300 md:hidden"
        />
      )}

      {/* Bottom Sheet Modal for Navigation and Socials */}
      <div
        className={`fixed inset-x-0 bottom-0 z-50 rounded-t-[2rem] border-t border-white/10 bg-[#0d0e12]/95 p-6 backdrop-blur-xl transition-transform duration-300 ease-out md:hidden ${
          activeSheet ? "translate-y-0" : "translate-y-full pointer-events-none"
        }`}
      >
        <div className="relative pb-6">
          <button
            onClick={closeSheet}
            className="absolute -bottom-2 right-1 p-2 text-slate-400 hover:text-white"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Navigation View */}
          {activeSheet === "nav" && (
            <div className="grid grid-cols-3 gap-y-7 text-center">
              {navigationLinks.map((link) => {
                const IconComponent = navIcons[link.label] || FolderGit2
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={closeSheet}
                    className={`flex flex-col items-center justify-center gap-2 transition ${
                      isActive(link.href)
                        ? "text-sky-300"
                        : "text-slate-300 hover:text-white"
                    }`}
                  >
                    <IconComponent className="h-6 w-6 stroke-[1.8]" />
                    <span className="text-xs font-medium tracking-wide">
                      {link.label}
                    </span>
                  </Link>
                )
              })}
            </div>
          )}

          {/* Socials View */}
          {activeSheet === "socials" && (
            <div className="grid grid-cols-3 gap-y-7 text-center">
              {socialLinks.map((item) => {
                const IconComponent = item.icon
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    onClick={closeSheet}
                    className="flex flex-col items-center justify-center gap-2 text-slate-300 transition hover:text-white"
                  >
                    <IconComponent className="h-6 w-6 stroke-[1.8]" />
                    <span className="text-xs font-medium tracking-wide">
                      {item.label}
                    </span>
                  </a>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Persistent Bottom Bar (Mobile only) */}
      <div className="fixed inset-x-0 bottom-0 z-40 flex h-14 items-center justify-between border-t border-white/10 bg-[#070b10]/90 px-6 backdrop-blur-md md:hidden">
        {/* Left: Avatar button (uses hero.image, opens Socials) */}
        <button
          onClick={() =>
            setActiveSheet(activeSheet === "socials" ? null : "socials")
          }
          className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border border-white/20 active:scale-95"
          aria-label="Toggle socials"
        >
          {hero?.image && (
            <Image
              src={hero.image}
              alt={siteMeta?.shortName || "Profile"}
              width={32}
              height={32}
              className="h-full w-full object-cover"
            />
          )}
        </button>

        {/* Center: Brand Logo */}
        <div className="flex items-center justify-center">
          <Image
            src={siteMeta.logo}
            alt={siteMeta.shortName}
            width={120}
            height={30}
            className="h-6 w-auto"
          />
        </div>

        {/* Right: Grid menu button (opens Navigation) */}
        <button
          onClick={() => setActiveSheet(activeSheet === "nav" ? null : "nav")}
          className={`p-1.5 transition active:scale-95 ${
            activeSheet === "nav"
              ? "text-sky-300"
              : "text-slate-300 hover:text-white"
          }`}
          aria-label="Toggle navigation"
        >
          <Grid className="h-6 w-6" />
        </button>
      </div>
    </>
  )
}