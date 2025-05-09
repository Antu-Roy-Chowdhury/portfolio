import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Github, ExternalLink, Calendar } from "lucide-react"
import CustomCursor from "@/components/CustomCursor"
import AnimatedBackground from "@/components/AnimatedBackground"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

// This would typically come from a database or API
const projects = [
  {
    id: 1,
    title: "Ukil Chamber",
    description:
      "A modern web application that connects clients with legal professionals through an intuitive and feature-rich platform.",
    fullDescription: `
      Ukil Chamber is a comprehensive web application designed to bridge the gap between clients seeking legal assistance and legal professionals. The platform offers an intuitive interface with a range of features to facilitate seamless connections and communication.
      
      As a co-founder and lead developer, I was responsible for architecting and implementing the core functionality of the platform, including user authentication, real-time messaging, and the matching algorithm that connects clients with appropriate legal professionals based on their needs.
      
      The application uses React.js for the frontend, with Tailwind CSS for styling. The backend is built with Node.js, and MongoDB serves as the database. Real-time features are implemented using WebSockets, and JWT is used for secure authentication.
    `,
    image: "/placeholder.svg?height=400&width=600",
    category: "web",
    tech: ["React.js", "Node.js", "Tailwind CSS", "Context API", "WebSocket", "JWT", "MongoDB"],
    github: "https://github.com/Antu-Roy-Chowdhury/ukil-chamber",
    live: "#",
    date: "Jan 2025 - Present",
    challenges: [
      "Implementing a secure and efficient matching algorithm",
      "Building a real-time messaging system with WebSockets",
      "Creating a responsive and intuitive user interface",
      "Ensuring data privacy and security for sensitive legal information",
    ],
    solutions: [
      "Developed a sophisticated algorithm that matches clients with legal professionals based on expertise, location, and availability",
      "Implemented WebSocket connections for instant messaging and notifications",
      "Used Tailwind CSS for a responsive design that works across all devices",
      "Implemented JWT authentication and encryption for secure data handling",
    ],
    screenshots: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
  },
  {
    id: 2,
    title: "Bangla Sign Language Translator",
    description:
      "This Flask-based web application translates Bangla sign language characters into written Bangla in real-time using machine learning.",
    fullDescription: `
      The Bangla Sign Language Translator is an innovative web application that bridges the communication gap for the deaf and hard-of-hearing community in Bangladesh. Using advanced machine learning techniques, the application can recognize and translate Bangla sign language gestures into written Bangla text in real-time.
      
      The system was trained on a comprehensive dataset of 45 classes (9,000 images, augmented to 36,000) covering 10 Bangla digits and 35 Bangla characters. I experimented with various models including MobileNetV2, ResNet, CustomCNN, and Teachable Machine to achieve the highest possible accuracy.
      
      Beyond translation, the application also serves as an educational tool, displaying corresponding ideal sign images for result verification and including tutorials and curated playlists to help users learn Bangla sign language.
    `,
    image: "/placeholder.svg?height=400&width=600",
    category: "ml",
    tech: ["Flask", "Python", "TensorFlow/Keras", "HTML/CSS", "JavaScript", "Machine Learning", "Image Processing"],
    github: "https://github.com/Antu-Roy-Chowdhury/BSL-Translating-Web",
    live: "#",
    date: "Jan 2025 - May 2025",
    challenges: [
      "Creating a robust dataset for Bangla sign language characters",
      "Developing a model with high accuracy for real-time translation",
      "Building an intuitive interface for both translation and learning",
      "Optimizing the model for web deployment",
    ],
    solutions: [
      "Collected and augmented a dataset of 9,000 images to 36,000 for comprehensive coverage",
      "Experimented with multiple models to achieve the best balance of accuracy and performance",
      "Designed a user-friendly interface with real-time translation and educational resources",
      "Optimized the model for web deployment using TensorFlow.js",
    ],
    screenshots: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
  },
  // Add more projects as needed
]

export default function ProjectPage({ params }) {
  const project = projects.find((p) => p.id.toString() === params.id)

  if (!project) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <CustomCursor />
      <AnimatedBackground />
      <Navbar />

      <div className="container mx-auto px-4 py-20">
        <Link href="/projects" className="inline-flex items-center gap-2 text-[#1e9fab] mb-8 hover:underline">
          <ArrowLeft size={16} /> Back to Projects
        </Link>

        <div className="space-y-12 glass-card p-8 rounded-lg">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold gradient-text">{project.title}</h1>
            <div className="flex items-center gap-2 text-gray-400">
              <Calendar size={16} />
              <span>{project.date}</span>
            </div>
          </div>

          <div className="relative h-[400px] w-full rounded-lg overflow-hidden glow">
            <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
          </div>

          <div className="flex flex-wrap gap-3">
            {project.tech.map((tech, index) => (
              <span key={index} className="px-3 py-1 bg-gray-800/50 backdrop-blur-sm rounded-full text-sm">
                {tech}
              </span>
            ))}
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-semibold neon-text">Project Overview</h2>
            <div className="text-gray-300 space-y-4">
              {project.fullDescription.split("\n\n").map((paragraph, index) => (
                <p key={index} className="leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4 glass-card p-6 rounded-lg">
              <h2 className="text-2xl font-semibold neon-text">Challenges</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-300">
                {project.challenges.map((challenge, index) => (
                  <li key={index}>{challenge}</li>
                ))}
              </ul>
            </div>

            <div className="space-y-4 glass-card p-6 rounded-lg">
              <h2 className="text-2xl font-semibold neon-text">Solutions</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-300">
                {project.solutions.map((solution, index) => (
                  <li key={index}>{solution}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-semibold neon-text">Screenshots</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {project.screenshots.map((screenshot, index) => (
                <div key={index} className="relative h-[200px] rounded-lg overflow-hidden glow">
                  <Image
                    src={screenshot || "/placeholder.svg"}
                    alt={`${project.title} screenshot ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-4 pt-8">
            {project.github !== "#" && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-transparent border border-[#1e9fab] text-[#1e9fab] rounded-md flex items-center gap-2 hover:bg-[#1e9fab]/10 transition-colors"
              >
                View on GitHub <Github size={16} />
              </a>
            )}

            {project.live !== "#" && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-[#1e9fab] text-white rounded-md flex items-center gap-2 hover:bg-[#1e9fab]/80 transition-colors"
              >
                Live Demo <ExternalLink size={16} />
              </a>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
