import DotPatternBackground from "@/components/DotPatternBackground"
import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
import { getSiteChrome } from "@/lib/portfolio-content"

export default async function SiteShell({ children }) {
  const { footerLinks, navigationLinks, siteMeta } = await getSiteChrome()

  return (
    <div className="site-frame">
      {siteMeta.dotBackgroundEnabled ? (
        <DotPatternBackground
          baseColor={siteMeta.dotBackgroundColor}
          highlightColor={siteMeta.dotHighlightColor}
          hoverGlow={siteMeta.dotHoverGlow}
        />
      ) : null}
      <div className="site-noise" />
      <Navbar navigationLinks={navigationLinks} siteMeta={siteMeta} />
      <main className="relative z-10 overflow-x-hidden">{children}</main>
      <Footer footerLinks={footerLinks} siteMeta={siteMeta} />
    </div>
  )
}
