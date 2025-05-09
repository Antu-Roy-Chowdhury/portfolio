import Image from "next/image"
import { Calendar, MapPin, Briefcase, GraduationCap, Award } from "lucide-react"

export default function AboutEnhanced() {
  return (
    <div className="space-y-16">
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold gradient-text">ABOUT ME</h2>
        <div className="w-24 h-1 bg-[#1e9fab] mx-auto mt-4"></div>
      </div>

      {/* Bio Section */}
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="relative">
          <div className="relative w-full h-[400px] rounded-lg overflow-hidden glow">
            <Image src="/placeholder-user.jpg?height=500&width=400" alt="Antu Roy Chowdhury" fill className="object-cover" />
          </div>
          <div className="absolute -bottom-6 -right-6 glass-card p-4 rounded-lg border border-[#1e9fab] max-w-[200px]">
            <p className="text-sm text-gray-300">
              "I believe in creating elegant solutions to complex problems through code and design."
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-2xl font-semibold neon-text">My Story</h3>
          <div className="glass-card p-6 rounded-lg space-y-4">
            <p className="text-gray-300 leading-relaxed">
              I'm a highly motivated and results-oriented student with a strong passion for digital technologies.
              Currently pursuing Electronics & Telecommunication Engineering at Rajshahi University of Engineering &
              Technology with a CGPA of 3.36.
            </p>
            <p className="text-gray-300 leading-relaxed">
              My unique combination of skills spans development, design, and engineering. I'm passionate about creating
              innovative solutions that solve real-world problems, whether it's through code, design, or a combination
              of both.
            </p>
            <p className="text-gray-300 leading-relaxed">
              When I'm not coding or designing, you can find me participating in programming contests, working on
              research projects, or creating memes that make people laugh.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 pt-4">
            <div className="flex items-center gap-2 glass-card px-4 py-2 rounded-full">
              <Calendar size={16} className="text-[#1e9fab]" />
              <span className="text-sm">Born in 2001</span>
            </div>
            <div className="flex items-center gap-2 glass-card px-4 py-2 rounded-full">
              <MapPin size={16} className="text-[#1e9fab]" />
              <span className="text-sm">Rajshahi, Bangladesh</span>
            </div>
            <div className="flex items-center gap-2 glass-card px-4 py-2 rounded-full">
              <Briefcase size={16} className="text-[#1e9fab]" />
              <span className="text-sm">Open to Opportunities</span>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="space-y-8">
        <h3 className="text-2xl font-semibold neon-text">Experience Timeline</h3>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-[#1e9fab] to-transparent"></div>

          {/* Timeline items */}
          <div className="space-y-12">
            {/* Item 1 */}
            <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              <div className="md:text-right order-2 md:order-1">
                <div className="glass-card p-6 rounded-lg space-y-2 transform hover:scale-105 transition-transform duration-300">
                  <h4 className="font-semibold text-xl">Co-Founder</h4>
                  <p className="text-sm text-[#1e9fab]">Ukil Chamber • Jan 2025 - Present</p>
                  <p className="text-gray-300">
                    Building a modern web application that connects clients with legal professionals through an
                    intuitive platform.
                  </p>
                </div>
              </div>
              <div className="relative order-1 md:order-2">
                <div className="absolute left-0 md:left-auto md:right-full top-4 w-4 h-4 rounded-full bg-[#1e9fab] transform md:translate-x-1/2 -translate-x-1/2 glow"></div>
                <div className="pl-8 md:pl-0">
                  <div className="text-sm text-gray-400 mb-2">2025</div>
                  <div className="flex items-center gap-2">
                    <Briefcase size={20} className="text-[#1e9fab]" />
                    <span className="font-semibold">Leadership & Development</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Item 2 */}
            <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              <div className="relative">
                <div className="absolute left-0 md:left-auto md:left-full top-4 w-4 h-4 rounded-full bg-[#1e9fab] transform md:-translate-x-1/2 -translate-x-1/2 glow"></div>
                <div className="pl-8 md:pl-0 md:text-right">
                  <div className="text-sm text-gray-400 mb-2">2024</div>
                  <div className="flex items-center gap-2 md:justify-end">
                    <Briefcase size={20} className="text-[#1e9fab]" />
                    <span className="font-semibold">Management</span>
                  </div>
                </div>
              </div>
              <div>
                <div className="glass-card p-6 rounded-lg space-y-2 transform hover:scale-105 transition-transform duration-300">
                  <h4 className="font-semibold text-xl">HUB Manager</h4>
                  <p className="text-sm text-[#1e9fab]">
                    University Innovation Hub Program (UIHP) • Dec 2024 - Present
                  </p>
                  <p className="text-gray-300">
                    Developing operational plans, ensuring compliance with policies, managing budget, and ensuring
                    smooth classes.
                  </p>
                </div>
              </div>
            </div>

            {/* Item 3 */}
            <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              <div className="md:text-right order-2 md:order-1">
                <div className="glass-card p-6 rounded-lg space-y-2 transform hover:scale-105 transition-transform duration-300">
                  <h4 className="font-semibold text-xl">Assistant ICT Secretary</h4>
                  <p className="text-sm text-[#1e9fab]">RUET Career Forum • May 2024 - Present</p>
                  <p className="text-gray-300">
                    Developing the website of the club and handling promotional activities.
                  </p>
                </div>
              </div>
              <div className="relative order-1 md:order-2">
                <div className="absolute left-0 md:left-auto md:right-full top-4 w-4 h-4 rounded-full bg-[#1e9fab] transform md:translate-x-1/2 -translate-x-1/2 glow"></div>
                <div className="pl-8 md:pl-0">
                  <div className="text-sm text-gray-400 mb-2">2024</div>
                  <div className="flex items-center gap-2">
                    <Briefcase size={20} className="text-[#1e9fab]" />
                    <span className="font-semibold">Web Development</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Item 4 */}
            <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              <div className="relative">
                <div className="absolute left-0 md:left-auto md:left-full top-4 w-4 h-4 rounded-full bg-[#1e9fab] transform md:-translate-x-1/2 -translate-x-1/2 glow"></div>
                <div className="pl-8 md:pl-0 md:text-right">
                  <div className="text-sm text-gray-400 mb-2">2025</div>
                  <div className="flex items-center gap-2 md:justify-end">
                    <Briefcase size={20} className="text-[#1e9fab]" />
                    <span className="font-semibold">Industry Experience</span>
                  </div>
                </div>
              </div>
              <div>
                <div className="glass-card p-6 rounded-lg space-y-2 transform hover:scale-105 transition-transform duration-300">
                  <h4 className="font-semibold text-xl">Industrial Trainee</h4>
                  <p className="text-sm text-[#1e9fab]">Brain Station 23 • Mar 2025</p>
                  <p className="text-gray-300">Gained hands-on experience in software infrastructure and design.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Education Section */}
      <div className="space-y-8">
        <h3 className="text-2xl font-semibold neon-text">Education</h3>

        <div className="glass-card p-8 rounded-lg">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="p-4 bg-[#1e9fab]/20 rounded-lg">
              <GraduationCap size={48} className="text-[#1e9fab]" />
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="text-xl font-semibold">
                  Bachelor of Science in Electronics & Telecommunication Engineering
                </h4>
                <p className="text-[#1e9fab]">Rajshahi University of Engineering & Technology</p>
                <p className="text-gray-400">2022–Present</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="px-4 py-2 bg-[#1e9fab]/20 rounded-lg">
                  <span className="text-xl font-bold">Electronics</span>
                </div>
                <div className="px-4 py-2 bg-[#1e9fab]/20 rounded-lg">
                  <span className="text-xl font-bold">Machine Learning</span>
                </div>
                <div className="px-4 py-2 bg-[#1e9fab]/20 rounded-lg">
                  <span className="text-xl font-bold">Communication</span>
                </div>
                </div>
              {/* <div className="flex items-center gap-4">
                <div className="px-4 py-2 bg-[#1e9fab]/20 rounded-lg">
                  <span className="text-xl font-bold">3.36</span>
                  <span className="text-sm ml-1">CGPA</span>
                </div>

                <div className="px-4 py-2 bg-[#1e9fab]/20 rounded-lg">
                  <span className="text-xl font-bold">7</span>
                  <span className="text-sm ml-1">Semesters</span>
                </div>
              </div> */}

              <p className="text-gray-300">
                Focusing on telecommunications, electronics, and programming. Participating in various extracurricular
                activities and research projects to enhance my practical knowledge and skills.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Certificates Section */}
      <div className="space-y-8">
        <h3 className="text-2xl font-semibold neon-text">Certifications</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="glass-card p-6 rounded-lg transform hover:scale-105 transition-transform duration-300 border border-[#1e9fab]/30">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-[#1e9fab]/20 rounded-lg">
                <Award size={24} className="text-[#1e9fab]" />
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold">Supervised Machine Learning: Regression and Classification</h4>
                <p className="text-sm text-[#1e9fab]">Stanford | DeepLearning.AI • Apr 2024</p>
                <p className="text-gray-300 text-sm">Credential ID: XXSJUB68VF4Q</p>
                <a
                  href="https://www.coursera.org/account/accomplishments/verify/XXSJUB68VF4Q"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#1e9fab] text-sm hover:underline inline-block mt-2"
                >
                  Verify Certificate
                </a>
              </div>
            </div>
          </div>

          <div className="glass-card p-6 rounded-lg transform hover:scale-105 transition-transform duration-300 border border-[#1e9fab]/30">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-[#1e9fab]/20 rounded-lg">
                <Award size={24} className="text-[#1e9fab]" />
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold">Advanced Learning Algorithms</h4>
                <p className="text-sm text-[#1e9fab]">Stanford | DeepLearning.AI • Jul 2024</p>
                <p className="text-gray-300 text-sm">Credential ID: 7VFMARJWZYZN</p>
                <a
                  href="https://www.coursera.org/account/accomplishments/verify/7VFMARJWZYZN"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#1e9fab] text-sm hover:underline inline-block mt-2"
                >
                  Verify Certificate
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="glass-card p-6 rounded-lg transform hover:scale-105 transition-transform duration-300 border border-[#1e9fab]/30">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-[#1e9fab]/20 rounded-lg">
                <Award size={24} className="text-[#1e9fab]" />
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold">GitHub</h4>
                <p className="text-sm text-[#1e9fab]">Stanford | DeepLearning.AI • Apr 2024</p>
                <p className="text-gray-300 text-sm">Credential ID: XXSJUB68VF4Q</p>
                <a
                  href="https://www.coursera.org/account/accomplishments/verify/XXSJUB68VF4Q"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#1e9fab] text-sm hover:underline inline-block mt-2"
                >
                  Verify Certificate
                </a>
              </div>
            </div>
          </div>

          <div className="glass-card p-6 rounded-lg transform hover:scale-105 transition-transform duration-300 border border-[#1e9fab]/30">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-[#1e9fab]/20 rounded-lg">
                <Award size={24} className="text-[#1e9fab]" />
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold">JIRA</h4>
                <p className="text-sm text-[#1e9fab]">Stanford | DeepLearning.AI • Jul 2024</p>
                <p className="text-gray-300 text-sm">Credential ID: 7VFMARJWZYZN</p>
                <a
                  href="https://www.coursera.org/account/accomplishments/verify/7VFMARJWZYZN"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#1e9fab] text-sm hover:underline inline-block mt-2"
                >
                  Verify Certificate
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
