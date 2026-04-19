export const siteMeta = {
  name: "Antu Roy Chowdhury",
  shortName: "Antu",
  role: "Developer, designer, and ETE engineer building useful digital products.",
  location: "Rajshahi, Bangladesh",
  email: "anturoychowdhury3@gmail.com",
  phone: "+8801710907476",
  resumeUrl: "/resume.pdf",
  portrait: "/placeholder-user.jpg",
  logo: "/skylight.png",
  intro:
    "I design polished interfaces, build full-stack products, and work across engineering, research, and leadership roles with a bias toward practical results.",
  about:
    "I am an Electronics and Telecommunication Engineering student at RUET with experience across web development, machine learning, design, and technical leadership. I care about systems that look thoughtful, feel fast, and solve real problems.",
  socialLinks: [
    { label: "GitHub", href: "https://github.com/Antu-Roy-Chowdhury" },
    { label: "LinkedIn", href: "https://linkedin.com/in/antu-roy-chow" },
  ],
}

export const navigationLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Skills", href: "/skills" },
  { label: "Research", href: "/research" },
  { label: "Contact", href: "/contact" },
]

export const highlightStats = [
  { value: "6+", label: "Featured projects" },
  { value: "4", label: "Active leadership roles" },
  { value: "2024", label: "Research started publishing" },
  { value: "RUET", label: "Engineering base" },
]

export const strengths = [
  {
    title: "Product-minded development",
    description: "From UI to backend logic, I focus on useful flows, clean structure, and maintainable delivery.",
  },
  {
    title: "Design with intent",
    description: "I like interfaces that feel deliberate instead of generic, balancing clarity, motion, and personality.",
  },
  {
    title: "Cross-discipline range",
    description: "My work spans engineering, machine learning, product building, and team coordination.",
  },
]

export const projects = [
  {
    id: "ukil-chamber",
    title: "Ukil Chamber",
    category: "Web Platform",
    summary: "A legal services platform connecting clients with lawyers through a modern, structured workflow.",
    description:
      "A modern web application that connects clients with legal professionals through an intuitive and feature-rich platform.",
    image: "/Ukil.png",
    tech: ["React.js", "Node.js", "Tailwind CSS", "JWT", "MongoDB", "WebSocket"],
    github: "https://github.com/Antu-Roy-Chowdhury/ukil-chamber",
    live: "#",
    timeline: "Jan 2025 - Present",
    featured: true,
  },
  {
    id: "bangla-sign-language-translator",
    title: "Bangla Sign Language Translator",
    category: "Machine Learning",
    summary: "A real-time translation system for Bangla sign language with educational feedback loops.",
    description:
      "A Flask-based web application translating Bangla sign language characters into written Bangla using machine learning.",
    image: "/SignLAng.png",
    tech: ["Flask", "Python", "TensorFlow/Keras", "Computer Vision", "Image Processing"],
    github: "https://github.com/Antu-Roy-Chowdhury/BSL-Translating-Web",
    live: "#",
    timeline: "Jan 2025 - May 2025",
    featured: true,
  },
  {
    id: "mongodb-data-fetching-api",
    title: "MongoDB Data Fetching API",
    category: "API",
    summary: "A multipurpose scraping and extraction API for structured and media-rich data sources.",
    description:
      "An API that can scrape tables, images, titles, videos, PDFs, book details, eBay product details, and movie data.",
    image: "/mongo.png",
    tech: ["MongoDB", "Mongoose", "REST API", "Data Extraction"],
    github: "https://github.com/Antu-Roy-Chowdhury/API",
    live: "#",
    timeline: "Mar 2025",
    featured: true,
  },
  {
    id: "web-scrapper",
    title: "Web Scrapper",
    category: "Automation",
    summary: "A Flask scraping system for extracting structured assets from websites.",
    description:
      "A Flask-based web scraping application that extracts tables, images, titles, videos, PDFs, book details, eBay product details, and movie details from websites.",
    image: "/scrapper.png",
    tech: ["Flask", "Scrapy", "Beautiful Soup", "Selenium"],
    github: "#",
    live: "#",
    timeline: "Mar 2025",
    featured: false,
  },
  {
    id: "dominoes",
    title: "Dominoes",
    category: "Game",
    summary: "A multiplayer-oriented dominoes implementation built with lightweight real-time logic.",
    description:
      "Dominoes is a family of tile-based games played with gaming pieces. Created with basic coding and simple algorithmic logic.",
    image: "/dominos.png",
    tech: ["JavaScript", "Node.js", "Express.js", "Socket.io"],
    github: "#",
    live: "#",
    timeline: "Mar 2025 - May 2025",
    featured: false,
  },
  {
    id: "mars-rover",
    title: "Mars Rover",
    category: "Hardware",
    summary: "A rover initiative where I contribute leadership and communication systems thinking.",
    description:
      "Currently serving as communication team leader and contributing to the design direction of the Mars Rover project.",
    image: "/mars.webp",
    tech: ["Python", "Machine Learning", "Telecommunication", "Leadership"],
    github: "#",
    live: "#",
    timeline: "Ongoing",
    featured: false,
  },
]

export const skillGroups = [
  {
    title: "Frontend",
    description: "Interfaces that feel precise, responsive, and expressive.",
    items: ["React", "Next.js", "JavaScript", "HTML/CSS", "Tailwind CSS"],
  },
  {
    title: "Backend",
    description: "APIs, data flow, and application structure that can scale with the product.",
    items: ["Node.js", "Express.js", "MongoDB", "PostgreSQL", "Flask"],
  },
  {
    title: "AI and Engineering",
    description: "Practical machine learning and engineering problem-solving.",
    items: ["TensorFlow/Keras", "Machine Learning", "Image Processing", "MATLAB", "Simulink"],
  },
  {
    title: "Design and Tools",
    description: "Visual thinking, prototyping, and collaboration tooling.",
    items: ["UI/UX Design", "Photoshop", "Illustrator", "Git/GitHub", "AutoCAD"],
  },
]

export const experienceItems = [
  {
    year: "2025",
    title: "Co-Founder",
    org: "Ukil Chamber",
    text: "Building a legal-tech product that connects clients with legal professionals through a streamlined digital experience.",
  },
  {
    year: "2025",
    title: "Industrial Trainee",
    org: "Brain Station 23",
    text: "Worked on software infrastructure and design practices in a professional engineering environment.",
  },
  {
    year: "2024",
    title: "HUB Manager",
    org: "University Innovation Hub Program",
    text: "Handled operations, planning, compliance, and budget-sensitive coordination for program activities.",
  },
  {
    year: "2024",
    title: "Assistant ICT Secretary",
    org: "RUET Career Forum",
    text: "Supported web development and promotional execution for the organization.",
  },
]

export const educationItems = [
  {
    degree: "B.Sc. in Electronics and Telecommunication Engineering",
    institution: "Rajshahi University of Engineering and Technology",
    duration: "2022 - Present",
    result: "CGPA 3.36",
    text: "Studying telecommunications, electronics, and programming while combining academic work with research, technical projects, and leadership activities.",
  },
]

export const certifications = [
  {
    title: "Supervised Machine Learning: Regression and Classification",
    issuer: "Stanford | DeepLearning.AI",
    date: "Apr 2024",
    credentialId: "XXSJUB68VF4Q",
    url: "https://coursera.org/verify/XXSJUB68VF4Q",
  },
  {
    title: "Advanced Learning Algorithms",
    issuer: "Stanford | DeepLearning.AI",
    date: "Jul 2024",
    credentialId: "7VFMARJWZYZN",
    url: "https://coursera.org/verify/7VFMARJWZYZN",
  },
]

export const researchItems = [
  {
    title: "Residual Block-Driven CNN for Accurate White Blood Cell Image Analysis and Classification",
    venue: "ICCIT 2024",
    summary:
      "A deep learning research effort focused on accurate white blood cell classification to support medical analysis workflows.",
    tags: ["Machine Learning", "CNN", "Medical Imaging", "Healthcare"],
  },
  {
    title: "Machine Learning in Telecommunications",
    venue: "Ongoing research",
    summary:
      "Exploring machine learning approaches to improve telecommunication network efficiency and signal intelligence.",
    tags: ["Machine Learning", "Telecommunications", "Signal Processing"],
  },
  {
    title: "Sign Language Translation Systems",
    venue: "Ongoing research",
    summary:
      "Advancing real-time sign language interpretation systems for accessibility-focused communication tools.",
    tags: ["Computer Vision", "Accessibility", "NLP"],
  },
]

export const achievementItems = [
  {
    title: "Champion in Programming Contest",
    meta: "Department of ETE, RUET",
    text: "Won an inter-department programming competition organized by the Department of Electronics and Telecommunication Engineering.",
  },
  {
    title: "Mars Rover Project",
    meta: "Communication Team Leader",
    text: "Leading communication-focused work and contributing to system-level coordination and design.",
  },
]
