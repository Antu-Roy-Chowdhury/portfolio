import { Manrope, Space_Grotesk } from "next/font/google"
import "./globals.css"

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
})

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
})


export const metadata = {
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  title: "Antu Roy Chowdhury",
  description: "Portfolio website of Antu Roy Chowdhury - Developer, Designer, Engineer",
    generator: 'Antu'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${manrope.variable} ${spaceGrotesk.variable} min-h-screen bg-[#05080d] text-white antialiased`}>
        {children}
      </body>
    </html>
  )
}
