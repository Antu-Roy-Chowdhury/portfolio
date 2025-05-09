"use client"

import { useEffect, useRef } from "react"
import { Code, Cpu, Palette, Server, Lightbulb, Users } from "lucide-react"

export default function Skills() {
  const radarChartRef = useRef(null)

  useEffect(() => {
    if (!radarChartRef.current) return

    const skills = [
      { name: "Frontend", value: 0.85, angle: 0 },
      { name: "Backend", value: 0.75, angle: 60 },
      { name: "Design", value: 0.8, angle: 120 },
      { name: "ML/AI", value: 0.7, angle: 180 },
      { name: "Hardware", value: 0.65, angle: 240 },
      { name: "Soft Skills", value: 0.9, angle: 300 },
    ]

    const chart = radarChartRef.current
    const centerX = chart.offsetWidth / 2
    const centerY = chart.offsetHeight / 2
    const radius = Math.min(centerX, centerY) - 30

    // Create radar lines
    skills.forEach((skill) => {
      const line = document.createElement("div")
      line.className = "radar-chart-line"
      line.style.transform = `rotate(${skill.angle}deg)`
      chart.appendChild(line)
    })

    // Create concentric circles
    for (let i = 1; i <= 3; i++) {
      const circle = document.createElement("div")
      circle.className = "radar-chart-circle"
      circle.style.width = `${(i / 3) * 100}%`
      circle.style.height = `${(i / 3) * 100}%`
      circle.style.top = `${50 - (i / 3) * 50}%`
      circle.style.left = `${50 - (i / 3) * 50}%`
      chart.appendChild(circle)
    }

    // Create skill points and labels
    skills.forEach((skill) => {
      const angleRad = (skill.angle * Math.PI) / 180
      const distance = skill.value * radius
      const x = centerX + distance * Math.cos(angleRad)
      const y = centerY + distance * Math.sin(angleRad)

      const point = document.createElement("div")
      point.className = "radar-chart-point"
      point.style.left = `${x}px`
      point.style.top = `${y}px`
      chart.appendChild(point)

      const labelX = centerX + (radius + 20) * Math.cos(angleRad)
      const labelY = centerY + (radius + 20) * Math.sin(angleRad)

      const label = document.createElement("div")
      label.className = "radar-chart-label"
      label.textContent = skill.name
      label.style.left = `${labelX}px`
      label.style.top = `${labelY}px`
      chart.appendChild(label)
    })

    // Create skill area
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
    svg.setAttribute("width", "100%")
    svg.setAttribute("height", "100%")
    svg.style.position = "absolute"
    svg.style.top = "0"
    svg.style.left = "0"

    const polygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon")
    const points = skills
      .map((skill) => {
        const angleRad = (skill.angle * Math.PI) / 180
        const distance = skill.value * radius
        const x = centerX + distance * Math.cos(angleRad)
        const y = centerY + distance * Math.sin(angleRad)
        return `${x},${y}`
      })
      .join(" ")

    polygon.setAttribute("points", points)
    polygon.setAttribute("fill", "rgba(30, 159, 171, 0.2)")
    polygon.setAttribute("stroke", "#1e9fab")
    polygon.setAttribute("stroke-width", "2")

    svg.appendChild(polygon)
    chart.appendChild(svg)
  }, [])

  const technicalSkills = [
    { name: "JavaScript", category: "frontend" },
    { name: "React", category: "frontend" },
    { name: "HTML/CSS", category: "frontend" },
    { name: "Tailwind CSS", category: "frontend" },
    { name: "Node.js", category: "backend" },
    { name: "Express.js", category: "backend" },
    { name: "MongoDB", category: "backend" },
    { name: "Python", category: "programming" },
    { name: "C/C++", category: "programming" },
    { name: "PHP", category: "programming" },
    { name: "MySQL", category: "backend" },
    { name: "Flask", category: "backend" },
    { name: "Machine Learning", category: "ai" },
    { name: "TensorFlow/Keras", category: "ai" },
    { name: "Image Processing", category: "ai" },
    { name: "UI/UX Design", category: "design" },
    { name: "Photoshop", category: "design" },
    { name: "Illustrator", category: "design" },
    { name: "AutoCAD", category: "engineering" },
    { name: "MATLAB", category: "engineering" },
    { name: "Simulink", category: "engineering" },
    { name: "Git/GitHub", category: "tools" },
    { name: "WordPress", category: "cms" },
    { name: "WIX", category: "cms" },
  ]

  const softSkills = [
    "Problem-solving",
    "Competitive Programming",
    "Management",
    "Communication",
    "Active Listening",
    "Negotiation",
    "Event Planning",
    "Adaptability",
  ]

  return (
    <div className="space-y-12">
      <div className="text-center">
        <h2 className="text-3xl font-bold">MY SKILLS</h2>
        <div className="w-20 h-1 bg-[#1e9fab] mx-auto mt-2"></div>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div ref={radarChartRef} className="radar-chart">
          <div className="radar-chart-bg"></div>
        </div>

        <div className="space-y-6">
          <h3 className="text-2xl font-semibold neon-text">Skill Overview</h3>
          <p className="text-gray-300 leading-relaxed">
            With a diverse skill set spanning frontend and backend development, design, machine learning, and hardware
            engineering, I bring a holistic approach to problem-solving. My technical expertise is complemented by
            strong soft skills, allowing me to collaborate effectively and deliver results.
          </p>
          <p className="text-gray-300 leading-relaxed">
            I'm constantly learning and expanding my skill set, with a particular focus on emerging technologies in AI
            and web development.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-8">
        <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-[#1e9fab]/20 rounded-lg">
              <Code size={24} className="text-[#1e9fab]" />
            </div>
            <h3 className="text-xl font-semibold">Frontend</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {technicalSkills
              .filter((skill) => skill.category === "frontend")
              .map((skill, index) => (
                <span key={index} className="skill-item px-3 py-1 bg-gray-800 rounded-full text-sm">
                  {skill.name}
                </span>
              ))}
          </div>
        </div>

        <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-[#1e9fab]/20 rounded-lg">
              <Server size={24} className="text-[#1e9fab]" />
            </div>
            <h3 className="text-xl font-semibold">Backend</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {technicalSkills
              .filter((skill) => skill.category === "backend")
              .map((skill, index) => (
                <span key={index} className="skill-item px-3 py-1 bg-gray-800 rounded-full text-sm">
                  {skill.name}
                </span>
              ))}
          </div>
        </div>

        <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-[#1e9fab]/20 rounded-lg">
              <Palette size={24} className="text-[#1e9fab]" />
            </div>
            <h3 className="text-xl font-semibold">Design</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {technicalSkills
              .filter((skill) => skill.category === "design" || skill.category === "cms")
              .map((skill, index) => (
                <span key={index} className="skill-item px-3 py-1 bg-gray-800 rounded-full text-sm">
                  {skill.name}
                </span>
              ))}
          </div>
        </div>

        <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-[#1e9fab]/20 rounded-lg">
              <Cpu size={24} className="text-[#1e9fab]" />
            </div>
            <h3 className="text-xl font-semibold">Programming & AI</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {technicalSkills
              .filter((skill) => skill.category === "programming" || skill.category === "ai")
              .map((skill, index) => (
                <span key={index} className="skill-item px-3 py-1 bg-gray-800 rounded-full text-sm">
                  {skill.name}
                </span>
              ))}
          </div>
        </div>

        <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-[#1e9fab]/20 rounded-lg">
              <Lightbulb size={24} className="text-[#1e9fab]" />
            </div>
            <h3 className="text-xl font-semibold">Engineering & Tools</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {technicalSkills
              .filter((skill) => skill.category === "engineering" || skill.category === "tools")
              .map((skill, index) => (
                <span key={index} className="skill-item px-3 py-1 bg-gray-800 rounded-full text-sm">
                  {skill.name}
                </span>
              ))}
          </div>
        </div>

        <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-[#1e9fab]/20 rounded-lg">
              <Users size={24} className="text-[#1e9fab]" />
            </div>
            <h3 className="text-xl font-semibold">Soft Skills</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {softSkills.map((skill, index) => (
              <span key={index} className="skill-item px-3 py-1 bg-gray-800 rounded-full text-sm">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="pt-8">
        <h3 className="text-2xl font-semibold neon-text mb-6">Certifications</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
            <h4 className="font-semibold">Supervised Machine Learning: Regression and Classification</h4>
            <p className="text-sm text-gray-400">Stanford | DeepLearning.AI • Apr 2024</p>
            <p className="text-gray-300 mt-2">Credential ID: XXSJUB68VF4Q</p>
            <div className="mt-4">
              <a
                href="https://coursera.org/verify/XXSJUB68VF4Q"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#1e9fab] text-sm hover:underline"
              >
                Verify Certificate
              </a>
            </div>
          </div>

          <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
            <h4 className="font-semibold">Advanced Learning Algorithms</h4>
            <p className="text-sm text-gray-400">Stanford | DeepLearning.AI • Jul 2024</p>
            <p className="text-gray-300 mt-2">Credential ID: 7VFMARJWZYZN</p>
            <div className="mt-4">
              <a
                href="https://coursera.org/verify/7VFMARJWZYZN"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#1e9fab] text-sm hover:underline"
              >
                Verify Certificate
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
