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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://anturoychowdhury.me"

export const metadata = {
  metadataBase: new URL(siteUrl),

  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/icon.png', sizes: '48x48', type: 'image/png' },
    ],
    apple: [
      { url: '/icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  title: {
    default: "Antu Roy Chowdhury | Research-Oriented Software Portfolio",
    template: "%s | Antu Roy Chowdhury",
  },
  description:
    "Electronics & Telecommunication Engineering student at RUET specializing in practical machine learning, image processing, and full-stack prototyping.",
  keywords: [
    "Antu Roy Chowdhury",
    "Antu",
    "Antu Roy",
    "ETE",
    "Electronics & Telecommunication Engineering",
    "RUET",
    "machine learning",
    "computer vision",
    "healthcare AI",
    "embedded systems",
    "full-stack developer",
    "research portfolio",
    "software portfolio",
  ],
  authors: [{ name: "Antu Roy Chowdhury", url: siteUrl }],
  creator: "Antu Roy Chowdhury",
  publisher: "Antu Roy Chowdhury",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "Antu Roy Chowdhury | Research-Oriented Software Portfolio",
    description:
      "Bridging the gap between engineering research and intelligent software through practical ML, image processing, and full-stack prototyping.",
    siteName: "Antu Roy Chowdhury Portfolio",
    verification: {
    google: "6ucf9Waw55dvsgAfqWAXzRxHfsrnWFajHQZjkQUileg",
  },
    images: [
      {
        url: "/potraint.png",
        width: 1200,
        height: 1200,
        alt: "Portrait of Antu Roy Chowdhury",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Antu Roy Chowdhury | Research-Oriented Software Portfolio",
    description:
      "Electronics & Telecommunication Engineering student at RUET building ML, computer vision, and full-stack systems with research depth.",
    images: ["/potraint.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  generator: "Antu",
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
