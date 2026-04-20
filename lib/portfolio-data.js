export const siteMeta = {
  name: "Antu Roy Chowdhury",
  shortName: "Antu",
  role: "Research-oriented developer and ETE engineer working across software, design, and applied machine learning.",
  location: "Rajshahi, Bangladesh",
  email: "anturoychowdhury3@gmail.com",
  phone: "+8801710907476",
  resumeUrl: "https://collection.cloudinary.com/djt70cy8p/5e6133df960dcbd486bf73a2b3836a40",
  portrait: "/potraint.png",
  logo: "https://res.cloudinary.com/djt70cy8p/image/upload/q_auto/f_auto/v1776684639/portfolio/ny2n8qbr8bg5dtddqw5i.png",
  intro:
    "I work across web development, research, machine learning, and technical leadership, with a preference for systems that are useful, clear, and grounded in real problems.",
  about:
    "I am an Electronics and Telecommunication Engineering student at RUET. My work sits between product building and research, with experience in full-stack development, machine learning, engineering projects, and communication-focused leadership roles.",
  socialLinks: [
    { label: "Facebook", href: "#" },
    { label: "Instagram", href: "#" },
    { label: "LinkedIn", href: "https://linkedin.com/in/antu-roy-chow" },
    { label: "Google Scholar", href: "#" },
    { label: "ResearchGate", href: "#" },
    { label: "X", href: "#" },
    { label: "Codeforces", href: "#" },
    { label: "Reddit", href: "#" },
    { label: "GitHub", href: "https://github.com/Antu-Roy-Chowdhury" },
  ],
}

export const navigationLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Skills", href: "/skills" },
  { label: "Research", href: "/research" },
]

export const highlightStats = [
  { value: "6+", label: "Featured projects" },
  { value: "4", label: "Leadership roles" },
  { value: "2024", label: "Research publication track" },
  { value: "RUET", label: "Engineering base" },
]

export const strengths = [
  {
    title: "Research-aware product thinking",
    description: "I care about practical interfaces and systems, but I also value technical depth where it meaningfully improves the work.",
  },
  {
    title: "Design with restraint",
    description: "I prefer clean visual language, measured motion, and layouts that feel considered rather than decorative.",
  },
  {
    title: "Versatility across domains",
    description: "My work moves between software, machine learning, engineering projects, and communication-oriented roles.",
  },
]

export const projects = [
  {
    id: "ukil-chamber",
    title: "Ukil Chamber",
    category: "Web Platform",
    summary: "A legal services platform designed to connect clients and lawyers through a clearer digital workflow.",
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
    summary: "A real-time Bangla sign language translation system with an accessibility-oriented focus.",
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
    summary: "A multipurpose API for extracting structured and media-rich data from the web.",
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
    summary: "A Flask scraping workflow for collecting structured content from websites.",
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
    summary: "A dominoes implementation exploring simple game logic and real-time interaction.",
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
    summary: "A rover initiative where I contribute communication-focused leadership and systems thinking.",
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
    kind: "Conference",
    year: "2024",
    summary:
      "A deep learning research effort focused on white blood cell classification for more reliable medical analysis.",
    tags: ["Machine Learning", "CNN", "Medical Imaging", "Healthcare"],
  },
  {
    title: "Machine Learning in Telecommunications",
    venue: "Ongoing research",
    kind: "Journal",
    year: "2025",
    summary:
      "Exploring machine learning approaches for telecommunication efficiency and signal-focused analysis.",
    tags: ["Machine Learning", "Telecommunications", "Signal Processing"],
  },
  {
    title: "Sign Language Translation Systems",
    venue: "Ongoing research",
    kind: "Conference",
    year: "2025",
    summary:
      "Studying sign language interpretation systems with an emphasis on accessibility and real-time use.",
    tags: ["Computer Vision", "Accessibility", "NLP"],
  },
]

export const achievementItems = [
  {
    title: "Champion in Programming Contest",
    meta: "Department of ETE, RUET",
    text: "Won an inter-department programming contest organized by the Department of Electronics and Telecommunication Engineering.",
  },
  {
    title: "Mars Rover Project",
    meta: "Communication Team Leader",
    text: "Working on communication-focused responsibilities while contributing to coordination and system-level planning.",
  },
]
