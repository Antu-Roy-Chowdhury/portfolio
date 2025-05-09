import Image from "next/image"
import { BookOpen, Award, FileText, Users, Calendar, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function ResearchEnhanced() {
  return (
    <div className="space-y-16">
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold gradient-text">RESEARCH & ACHIEVEMENTS</h2>
        <div className="w-24 h-1 bg-[#1e9fab] mx-auto mt-4"></div>
      </div>

      {/* Research Overview */}
      <div className="glass-card p-8 rounded-lg">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl font-semibold neon-text mb-4">Research Focus</h3>
            <p className="text-gray-300 leading-relaxed">
              My research interests lie at the intersection of machine learning, image processing, and
              telecommunications. I'm particularly interested in developing innovative solutions that can have
              real-world impact in healthcare and accessibility.
            </p>
            <p className="text-gray-300 leading-relaxed mt-4">
              Currently, I'm working on research papers focused on machine learning applications in telecommunications
              and sign language translation, building upon my previous work in medical image analysis.
            </p>

            <div className="flex flex-wrap gap-4 mt-6">
              <div className="flex items-center gap-2 glass-card px-4 py-2 rounded-full">
                <FileText size={16} className="text-[#1e9fab]" />
                <span className="text-sm">1 Conference Paper</span>
              </div>
              <div className="flex items-center gap-2 glass-card px-4 py-2 rounded-full">
                <Users size={16} className="text-[#1e9fab]" />
                <span className="text-sm">3 Collaborators</span>
              </div>
              <div className="flex items-center gap-2 glass-card px-4 py-2 rounded-full">
                <Calendar size={16} className="text-[#1e9fab]" />
                <span className="text-sm">Since 2024</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative h-[300px] rounded-lg overflow-hidden glow">
              <Image src="/ml.png?height=400&width=600" alt="Research" fill className="object-cover" />
            </div>
            <div className="absolute -bottom-6 -left-6 glass-card p-4 rounded-lg border border-[#1e9fab] max-w-[200px]">
              <p className="text-sm text-gray-300">
                "Research is formalized curiosity. It is poking and prying with a purpose."
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Publications */}
      <div className="space-y-8">
        <h3 className="text-2xl font-semibold neon-text flex items-center gap-2">
          <BookOpen size={24} />
          Publications
        </h3>

        <div className="glass-card p-8 rounded-lg border border-[#1e9fab]/30 transform hover:scale-[1.02] transition-transform duration-300">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="relative h-[200px] md:h-full rounded-lg overflow-hidden">
              <Image
                src="/iee.png?height=400&width=300"
                alt="White Blood Cell Classification"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent"></div>
              <div className="absolute bottom-4 left-4">
                <span className="text-xs bg-[#1e9fab] px-2 py-1 rounded">ICCIT 2024</span>
              </div>
            </div>

            <div className="md:col-span-2 space-y-4">
              <h4 className="text-xl font-semibold">
                Residual Block-Driven CNN for Accurate White Blood Cell Image Analysis and Classification
              </h4>
              <p className="text-sm text-[#1e9fab]">Presented at ICCIT 2024 Conference, Cox's Bazar</p>

              <p className="text-gray-300">
                Built a Residual Block-Driven CNN machine learning model that can accurately analyze each white blood
                cell, classify and calculate the total number. The model achieved high accuracy in distinguishing
                between different types of white blood cells, which is crucial for diagnosing various blood disorders
                and diseases.
              </p>

              <div className="pt-4">
                <h5 className="font-semibold mb-2">Abstract</h5>
                <p className="text-gray-400 text-sm">
                  White blood cell (WBC) classification plays a vital role in diagnosing various blood disorders and
                  diseases. Traditional manual counting and classification methods are time-consuming and prone to human
                  error. This paper presents a novel approach using a Residual Block-Driven Convolutional Neural Network
                  (CNN) for automated WBC image analysis and classification. Our model leverages residual connections to
                  mitigate the vanishing gradient problem and enable deeper network training, resulting in improved
                  feature extraction and classification accuracy.
                </p>
              </div>

              <div className="flex flex-wrap gap-2 pt-4">
                <span className="px-3 py-1 bg-gray-800/50 backdrop-blur-sm rounded-full text-sm">Machine Learning</span>
                <span className="px-3 py-1 bg-gray-800/50 backdrop-blur-sm rounded-full text-sm">Deep Learning</span>
                <span className="px-3 py-1 bg-gray-800/50 backdrop-blur-sm rounded-full text-sm">CNN</span>
                <span className="px-3 py-1 bg-gray-800/50 backdrop-blur-sm rounded-full text-sm">Medical Imaging</span>
                <span className="px-3 py-1 bg-gray-800/50 backdrop-blur-sm rounded-full text-sm">Healthcare</span>
              </div>

              <div className="pt-4">
                <Link href="#" className="inline-flex items-center gap-2 text-[#1e9fab] hover:underline">
                  Read full paper <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="glass-card p-8 rounded-lg border border-[#1e9fab]/30 transform hover:scale-[1.02] transition-transform duration-300">
          <div className="space-y-4">
            <h4 className="text-xl font-semibold">Current Research Projects</h4>
            <p className="text-[#1e9fab]">Working on journal publications</p>

            <div className="grid md:grid-cols-2 gap-8 mt-6">
              <div className="glass-card p-6 rounded-lg bg-[#1e9fab]/5">
                <h5 className="font-semibold mb-2">Machine Learning in Telecommunications</h5>
                <p className="text-gray-300 text-sm">
                  Exploring applications of machine learning algorithms to optimize telecommunication networks and
                  improve signal processing. This research aims to enhance network efficiency and reliability through
                  intelligent data analysis and predictive modeling.
                </p>
                <div className="flex flex-wrap gap-2 pt-4">
                  <span className="px-3 py-1 bg-gray-800/50 backdrop-blur-sm rounded-full text-xs">
                    Machine Learning
                  </span>
                  <span className="px-3 py-1 bg-gray-800/50 backdrop-blur-sm rounded-full text-xs">
                    Telecommunications
                  </span>
                  <span className="px-3 py-1 bg-gray-800/50 backdrop-blur-sm rounded-full text-xs">
                    Signal Processing
                  </span>
                </div>
              </div>

              <div className="glass-card p-6 rounded-lg bg-[#1e9fab]/5">
                <h5 className="font-semibold mb-2">Sign Language Translation Systems</h5>
                <p className="text-gray-300 text-sm">
                  Building upon my Bangla Sign Language Translator project, this research focuses on improving the
                  accuracy and real-time capabilities of sign language translation systems. The goal is to create more
                  accessible communication tools for the deaf and hard-of-hearing community.
                </p>
                <div className="flex flex-wrap gap-2 pt-4">
                  <span className="px-3 py-1 bg-gray-800/50 backdrop-blur-sm rounded-full text-xs">
                    Computer Vision
                  </span>
                  <span className="px-3 py-1 bg-gray-800/50 backdrop-blur-sm rounded-full text-xs">NLP</span>
                  <span className="px-3 py-1 bg-gray-800/50 backdrop-blur-sm rounded-full text-xs">Accessibility</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Awards & Recognition */}
      <div className="space-y-8">
        <h3 className="text-2xl font-semibold neon-text flex items-center gap-2">
          <Award size={24} />
          Awards & Recognition
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="glass-card p-6 rounded-lg transform hover:scale-105 transition-transform duration-300 border border-[#1e9fab]/30">
            <div className="flex items-start gap-4">
              <div className="p-4 bg-[#1e9fab]/20 rounded-full">
                <Award size={32} className="text-[#1e9fab]" />
              </div>
              <div className="space-y-2">
                <h4 className="text-xl font-semibold">Champion in Programming Contest</h4>
                <p className="text-sm text-[#1e9fab]">Department of ETE, RUET</p>
                <p className="text-gray-300">
                  Became the champion in an inter-department programming competition held by the Department of
                  Electronics & Telecommunication Engineering.
                </p>
              </div>
            </div>
          </div>

          <div className="glass-card p-6 rounded-lg transform hover:scale-105 transition-transform duration-300 border border-[#1e9fab]/30">
            <div className="flex items-start gap-4">
              <div className="p-4 bg-[#1e9fab]/20 rounded-full">
                <Users size={32} className="text-[#1e9fab]" />
              </div>
              <div className="space-y-2">
                <h4 className="text-xl font-semibold">Mars Rover Project</h4>
                <p className="text-sm text-[#1e9fab]">Communication Team Leader</p>
                <p className="text-gray-300">
                  Currently leading the communication team for the Mars Rover project. Participated in the National
                  Rover Challenge (NRC) with the design.
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  <span className="px-3 py-1 bg-gray-800/50 backdrop-blur-sm rounded-full text-xs">Python</span>
                  <span className="px-3 py-1 bg-gray-800/50 backdrop-blur-sm rounded-full text-xs">
                    Machine Learning
                  </span>
                  <span className="px-3 py-1 bg-gray-800/50 backdrop-blur-sm rounded-full text-xs">
                    Telecommunication
                  </span>
                  <span className="px-3 py-1 bg-gray-800/50 backdrop-blur-sm rounded-full text-xs">Leadership</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Research Methodology */}
      <div className="glass-card p-8 rounded-lg">
        <h3 className="text-2xl font-semibold neon-text mb-6">My Research Approach</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="glass-card p-6 rounded-lg bg-[#1e9fab]/5 transform hover:scale-105 transition-transform duration-300">
            <div className="text-center mb-4">
              <div className="w-12 h-12 rounded-full bg-[#1e9fab]/20 flex items-center justify-center mx-auto">
                <span className="text-xl font-bold text-[#1e9fab]">1</span>
              </div>
            </div>
            <h4 className="text-lg font-semibold text-center mb-2">Problem Identification</h4>
            <p className="text-gray-300 text-sm text-center">
              I start by identifying real-world problems that can be addressed through technology and research. This
              involves literature review and understanding the current state of the art.
            </p>
          </div>

          <div className="glass-card p-6 rounded-lg bg-[#1e9fab]/5 transform hover:scale-105 transition-transform duration-300">
            <div className="text-center mb-4">
              <div className="w-12 h-12 rounded-full bg-[#1e9fab]/20 flex items-center justify-center mx-auto">
                <span className="text-xl font-bold text-[#1e9fab]">2</span>
              </div>
            </div>
            <h4 className="text-lg font-semibold text-center mb-2">Methodology Development</h4>
            <p className="text-gray-300 text-sm text-center">
              I design and implement innovative methodologies, often leveraging machine learning and data analysis
              techniques to address the identified problems.
            </p>
          </div>

          <div className="glass-card p-6 rounded-lg bg-[#1e9fab]/5 transform hover:scale-105 transition-transform duration-300">
            <div className="text-center mb-4">
              <div className="w-12 h-12 rounded-full bg-[#1e9fab]/20 flex items-center justify-center mx-auto">
                <span className="text-xl font-bold text-[#1e9fab]">3</span>
              </div>
            </div>
            <h4 className="text-lg font-semibold text-center mb-2">Validation & Publication</h4>
            <p className="text-gray-300 text-sm text-center">
              I rigorously validate my approaches through experiments and analysis, then share the findings through
              conferences, journals, and open-source implementations.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
