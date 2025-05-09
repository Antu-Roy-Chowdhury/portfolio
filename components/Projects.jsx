"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Github, ExternalLink } from "lucide-react"

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("all")

  const projects = [
    {
      id: 1,
      title: "Ukil Chamber",
      description:
        "A modern web application that connects clients with legal professionals through an intuitive and feature-rich platform.",
      image: "/ukil.png?height=400&width=600",
      category: "web",
      tech: ["React.js", "Node.js", "Tailwind CSS", "Context API", "WebSocket", "JWT", "MongoDB"],
      github: "https://github.com/Antu-Roy-Chowdhury/ukil-chamber",
      live: "#",
      date: "Jan 2025 - Present",
    },
    {
      id: 2,
      title: "Bangla Sign Language Translator",
      description:
        "This Flask-based web application translates Bangla sign language characters into written Bangla in real-time using machine learning.",
      image: "/SignLAng.png?height=400&width=600",
      category: "ml",
      tech: ["Flask", "Python", "TensorFlow/Keras", "HTML/CSS", "JavaScript", "Machine Learning", "Image Processing"],
      github: "https://github.com/Antu-Roy-Chowdhury/BSL-Translating-Web",
      live: "#",
      date: "Jan 2025 - May 2025",
    },
    {
      id: 3,
      title: "Dominoes",
      description:
        "Dominoes is a family of tile-based games played with gaming pieces. Created with basic coding and simplest algorithm.",
      image: "/dominos.png?height=400&width=600",
      category: "game",
      tech: ["JavaScript", "Node.js", "Express.js", "Socket.io"],
      github: "#",
      live: "#",
      date: "Mar 2025 - May 2025",
    },
    {
      id: 4,
      title: "MongoDB Data Fetching API",
      description:
        "This API is able to scrape Tables, Images, Titles, videos, PDFs, book details, eBay product details and movie details.",
      image: "/mongo.png?height=400&width=600",
      category: "api",
      tech: ["MongoDB", "Mongoose", "REST APIs", "Databases"],
      github: "https://github.com/Antu-Roy-Chowdhury/API",
      live: "#",
      date: "Mar 2025",
    },
    {
      id: 5,
      title: "Web Scrapper",
      description:
        "A Flask-based web scraping application that extracts tables, images, titles, videos, PDFs, book details, eBay product details and movie details from websites.",
      image: "/scrapper.png?height=400&width=600",
      category: "web",
      tech: ["Flask", "Scrapy Framework", "Data Scraping", "Web Scraping", "Beautiful Soup", "Selenium"],
      github: "#",
      live: "#",
      date: "Mar 2025",
    },
    {
      id: 6,
      title: "Mars Rover",
      description:
        "Currently working as a Communication Team Leader on this project. Participated in NRC with the design.",
      image: "/mars.webp?height=400&width=600",
      category: "hardware",
      tech: ["Python", "Machine Learning", "Telecommunication", "Critical Thinking"],
      github: "#",
      live: "#",
      date: "Ongoing",
    },
  ]

  const filteredProjects =
    activeFilter === "all" ? projects : projects.filter((project) => project.category === activeFilter)

  return (
    <div className="space-y-12">
      <div className="text-center">
        <h2 className="text-3xl font-bold">MY PROJECTS</h2>
        <div className="w-20 h-1 bg-[#1e9fab] mx-auto mt-2"></div>
      </div>

      <div className="flex flex-wrap justify-center gap-4">
        <button
          className={`px-4 py-2 rounded-full text-sm ${activeFilter === "all" ? "bg-[#1e9fab] text-white" : "bg-gray-800 text-gray-300 hover:bg-gray-700"}`}
          onClick={() => setActiveFilter("all")}
        >
          All
        </button>
        <button
          className={`px-4 py-2 rounded-full text-sm ${activeFilter === "web" ? "bg-[#1e9fab] text-white" : "bg-gray-800 text-gray-300 hover:bg-gray-700"}`}
          onClick={() => setActiveFilter("web")}
        >
          Web Dev
        </button>
        <button
          className={`px-4 py-2 rounded-full text-sm ${activeFilter === "ml" ? "bg-[#1e9fab] text-white" : "bg-gray-800 text-gray-300 hover:bg-gray-700"}`}
          onClick={() => setActiveFilter("ml")}
        >
          Machine Learning
        </button>
        <button
          className={`px-4 py-2 rounded-full text-sm ${activeFilter === "api" ? "bg-[#1e9fab] text-white" : "bg-gray-800 text-gray-300 hover:bg-gray-700"}`}
          onClick={() => setActiveFilter("api")}
        >
          API
        </button>
        <button
          className={`px-4 py-2 rounded-full text-sm ${activeFilter === "game" ? "bg-[#1e9fab] text-white" : "bg-gray-800 text-gray-300 hover:bg-gray-700"}`}
          onClick={() => setActiveFilter("game")}
        >
          Games
        </button>
        <button
          className={`px-4 py-2 rounded-full text-sm ${activeFilter === "hardware" ? "bg-[#1e9fab] text-white" : "bg-gray-800 text-gray-300 hover:bg-gray-700"}`}
          onClick={() => setActiveFilter("hardware")}
        >
          Hardware
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="project-card bg-gray-900 rounded-lg overflow-hidden border border-gray-800 hover:border-[#1e9fab] transition-colors"
          >
            <div className="relative h-48">
              <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-70"></div>
              <div className="absolute bottom-4 left-4">
                <span className="text-xs bg-[#1e9fab] px-2 py-1 rounded">{project.date}</span>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <h3 className="text-xl font-bold">{project.title}</h3>
              <p className="text-gray-400 text-sm line-clamp-3">{project.description}</p>

              <div className="flex flex-wrap gap-2 pt-2">
                {project.tech.slice(0, 3).map((tech, index) => (
                  <span key={index} className="text-xs bg-gray-800 px-2 py-1 rounded">
                    {tech}
                  </span>
                ))}
                {project.tech.length > 3 && (
                  <span className="text-xs bg-gray-800 px-2 py-1 rounded">+{project.tech.length - 3} more</span>
                )}
              </div>

              <div className="flex justify-between items-center pt-4">
                <Link
                  href={`/projects/${project.id}`}
                  className="text-[#1e9fab] text-sm flex items-center gap-1 hover:underline"
                >
                  View Details <ArrowRight size={14} />
                </Link>

                <div className="flex gap-3">
                  {project.github !== "#" && (
                    <Link
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-white"
                    >
                      <Github size={18} />
                    </Link>
                  )}
                  {project.live !== "#" && (
                    <Link
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-white"
                    >
                      <ExternalLink size={18} />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center pt-8">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 px-6 py-3 bg-transparent border border-[#1e9fab] text-[#1e9fab] rounded-md hover:bg-[#1e9fab]/10 transition-colors"
        >
          View All Projects <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  )
}
