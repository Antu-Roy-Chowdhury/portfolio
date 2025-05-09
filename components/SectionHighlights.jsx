import Link from "next/link"
import Image from "next/image"
import { ArrowRight, User, Code, Cpu, BookOpen, Mail } from "lucide-react"

export default function SectionHighlights() {
  return (
    <div className="space-y-24">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold gradient-text">EXPLORE MY WORLD</h2>
        <div className="w-24 h-1 bg-[#1e9fab] mx-auto mt-4"></div>
      </div>

      {/* About Highlight */}
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="order-2 md:order-1">
          <div className="glass-card p-8 rounded-lg space-y-4 transform hover:scale-105 transition-transform duration-300">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 bg-[#1e9fab]/20 rounded-full">
                <User size={24} className="text-[#1e9fab]" />
              </div>
              <h3 className="text-2xl font-bold">About Me</h3>
            </div>
            <p className="text-gray-300">
              Highly motivated Electronics & Telecommunication Engineering student with a passion for digital
              technologies. My journey spans development, design, and engineering with experience in multiple roles.
            </p>
            <div className="pt-4">
              <Link href="/about" className="inline-flex items-center gap-2 text-[#1e9fab] hover:underline">
                Learn more about me <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
        <div className="order-1 md:order-2 flex justify-center">
          <div className="relative w-64 h-64 rounded-lg overflow-hidden glow">
            <div className="absolute inset-0 bg-gradient-to-br from-[#1e9fab]/30 to-transparent"></div>
            <Image
              src="/abtme.jpg?height=300&width=300"
              alt="About Me"
              width={300}
              height={300}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Projects Highlight */}
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="flex justify-center">
          <div className="relative w-64 h-64 rounded-lg overflow-hidden glow">
            <div className="absolute inset-0 bg-gradient-to-br from-[#1e9fab]/30 to-transparent"></div>
            <Image
              src="/mars.webp?height=300&width=300"
              alt="Projects"
              width={300}
              height={300}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div>
          <div className="glass-card p-8 rounded-lg space-y-4 transform hover:scale-105 transition-transform duration-300">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 bg-[#1e9fab]/20 rounded-full">
                <Code size={24} className="text-[#1e9fab]" />
              </div>
              <h3 className="text-2xl font-bold">My Projects</h3>
            </div>
            <p className="text-gray-300">
              From web applications to machine learning models, explore my diverse portfolio of projects. Each project
              showcases different skills and problem-solving approaches.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="text-xs bg-gray-800/50 backdrop-blur-sm px-2 py-1 rounded">React.js</span>
              <span className="text-xs bg-gray-800/50 backdrop-blur-sm px-2 py-1 rounded">Node.js</span>
              <span className="text-xs bg-gray-800/50 backdrop-blur-sm px-2 py-1 rounded">Python</span>
              <span className="text-xs bg-gray-800/50 backdrop-blur-sm px-2 py-1 rounded">Machine Learning</span>
            </div>
            <div className="pt-4">
              <Link href="/projects" className="inline-flex items-center gap-2 text-[#1e9fab] hover:underline">
                View my projects <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Skills Highlight */}
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="order-2 md:order-1">
          <div className="glass-card p-8 rounded-lg space-y-4 transform hover:scale-105 transition-transform duration-300">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 bg-[#1e9fab]/20 rounded-full">
                <Cpu size={24} className="text-[#1e9fab]" />
              </div>
              <h3 className="text-2xl font-bold">My Skills</h3>
            </div>
            <p className="text-gray-300">
              A diverse skill set spanning frontend and backend development, design, machine learning, and hardware
              engineering. My technical expertise is complemented by strong soft skills.
            </p>
            <div className="grid grid-cols-2 gap-2 pt-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#1e9fab]"></div>
                <span className="text-sm text-gray-300">Frontend Development</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#1e9fab]"></div>
                <span className="text-sm text-gray-300">Backend Development</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#1e9fab]"></div>
                <span className="text-sm text-gray-300">UI/UX Design</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#1e9fab]"></div>
                <span className="text-sm text-gray-300">Machine Learning</span>
              </div>
            </div>
            <div className="pt-4">
              <Link href="/skills" className="inline-flex items-center gap-2 text-[#1e9fab] hover:underline">
                Explore my skills <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
        <div className="order-1 md:order-2 flex justify-center">
          <div className="relative w-64 h-64 rounded-lg overflow-hidden glow">
            <div className="absolute inset-0 bg-gradient-to-br from-[#1e9fab]/30 to-transparent"></div>
            <Image
              src="/ml.png?height=300&width=300"
              alt="Skills"
              width={300}
              height={300}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Research Highlight */}
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="flex justify-center">
          <div className="relative w-64 h-64 rounded-lg overflow-hidden glow">
            <div className="absolute inset-0 bg-gradient-to-br from-[#1e9fab]/30 to-transparent"></div>
            <Image
              src="/iee.png?height=300&width=300"
              alt="Research"
              width={300}
              height={300}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div>
          <div className="glass-card p-8 rounded-lg space-y-4 transform hover:scale-105 transition-transform duration-300">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 bg-[#1e9fab]/20 rounded-full">
                <BookOpen size={24} className="text-[#1e9fab]" />
              </div>
              <h3 className="text-2xl font-bold">Research & Publications</h3>
            </div>
            <p className="text-gray-300">
              Discover my research work in machine learning and image processing. I've presented at conferences and am
              currently working on journal publications.
            </p>
            <div className="pt-2">
              <div className="text-sm text-gray-300">
                <span className="text-[#1e9fab] font-semibold">Latest Publication:</span> Residual Block-Driven CNN for
                Accurate White Blood Cell Image Analysis and Classification
              </div>
            </div>
            <div className="pt-4">
              <Link href="/research" className="inline-flex items-center gap-2 text-[#1e9fab] hover:underline">
                View my research <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Highlight */}
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="order-2 md:order-1">
          <div className="glass-card p-8 rounded-lg space-y-4 transform hover:scale-105 transition-transform duration-300">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 bg-[#1e9fab]/20 rounded-full">
                <Mail size={24} className="text-[#1e9fab]" />
              </div>
              <h3 className="text-2xl font-bold">Get In Touch</h3>
            </div>
            <p className="text-gray-300">
              Have a project in mind or want to collaborate? I'm always open to new opportunities and challenges. Let's
              connect and create something amazing together.
            </p>
            <div className="pt-2">
              <div className="text-sm text-gray-300">
                <span className="text-[#1e9fab] font-semibold">Email:</span> anturoychowdhury3@gmail.com
              </div>
            </div>
            <div className="pt-4">
              <Link href="/contact" className="inline-flex items-center gap-2 text-[#1e9fab] hover:underline">
                Contact me <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
        <div className="order-1 md:order-2 flex justify-center">
          <div className="relative w-64 h-64 rounded-lg overflow-hidden glow">
            <div className="absolute inset-0 bg-gradient-to-br from-[#1e9fab]/30 to-transparent"></div>
            <Image
              src="/contact.jpg?height=300&width=300"
              alt="Contact"
              width={300}
              height={300}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
