import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-gray-900/50 backdrop-blur-sm border-t border-gray-800 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">
              <span className="neon-text">ANTU</span> ROY
            </h3>
            <p className="text-gray-400 mb-4">
              Developer, Designer, Engineer, and MEMER with a passion for creating elegant solutions.
            </p>
            <p className="text-gray-400">&copy; {new Date().getFullYear()} Antu Roy Chowdhury. All rights reserved.</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-[#1e9fab] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-[#1e9fab] transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/projects" className="text-gray-400 hover:text-[#1e9fab] transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/skills" className="text-gray-400 hover:text-[#1e9fab] transition-colors">
                  Skills
                </Link>
              </li>
              <li>
                <Link href="/research" className="text-gray-400 hover:text-[#1e9fab] transition-colors">
                  Research
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-[#1e9fab] transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <p className="text-gray-400 mb-2">Email: anturoychowdhury3@gmail.com</p>
            <p className="text-gray-400 mb-2">Location: Rajshahi, Bangladesh</p>
            <div className="flex gap-4 mt-4">
              <Link
                href="https://linkedin.com/in/antu-roy-chow"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#1e9fab] transition-colors"
              >
                LinkedIn
              </Link>
              <Link
                href="https://github.com/Antu-Roy-Chowdhury"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#1e9fab] transition-colors"
              >
                GitHub
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
