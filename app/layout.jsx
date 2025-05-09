import { Inter } from "next/font/google"
import "./globals.css"


const inter = Inter({ subsets: ["latin"] })
// insert favicons.PNG in public folder


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
      <body className={`${inter.className} bg-[#0a0a0a] text-white min-h-screen`}>{children}</body>
    </html>
  )
}
