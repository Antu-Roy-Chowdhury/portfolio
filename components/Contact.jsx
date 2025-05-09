"use client"

import { useState } from "react"
import { Mail, Phone, MapPin, Linkedin, Github, Send } from "lucide-react"

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitStatus("success")

      // Reset form after successful submission
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      })

      // Clear success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus(null)
      }, 5000)
    }, 1500)
  }

  return (
    <div className="space-y-12">
      <div className="text-center">
        <h2 className="text-3xl font-bold">GET IN TOUCH</h2>
        <div className="w-20 h-1 bg-[#1e9fab] mx-auto mt-2"></div>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        <div className="space-y-8">
          <h3 className="text-2xl font-semibold neon-text">Contact Information</h3>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-[#1e9fab]/20 rounded-lg">
                <Mail size={24} className="text-[#1e9fab]" />
              </div>
              <div>
                <h4 className="font-semibold">Email</h4>
                <a href="mailto:anturoychowdhury3@gmail.com" className="text-gray-300 hover:text-[#1e9fab]">
                  anturoychowdhury3@gmail.com
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-[#1e9fab]/20 rounded-lg">
                <MapPin size={24} className="text-[#1e9fab]" />
              </div>
              <div>
                <h4 className="font-semibold">Location</h4>
                <p className="text-gray-300">
                  225, Bongobondhu Hall, Rajshahi University of Engineering & Technology
                  <br />
                  Kazla - 6204, Rajshahi, Bangladesh
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-[#1e9fab]/20 rounded-lg">
                <Phone size={24} className="text-[#1e9fab]" />
              </div>
              <div>
                <h4 className="font-semibold">Phone</h4>
                <p className="text-gray-300">+8801710907476</p>
              </div>
            </div>
          </div>

          <div className="pt-6">
            <h4 className="font-semibold mb-4">Connect With Me</h4>
            <div className="flex gap-4">
              <a
                href="https://linkedin.com/in/antu-roy-chow"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-[#1e9fab]/20 rounded-lg hover:bg-[#1e9fab]/30 transition-colors"
              >
                <Linkedin size={24} className="text-[#1e9fab]" />
              </a>
              <a
                href="https://github.com/Antu-Roy-Chowdhury"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-[#1e9fab]/20 rounded-lg hover:bg-[#1e9fab]/30 transition-colors"
              >
                <Github size={24} className="text-[#1e9fab]" />
              </a>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-2xl font-semibold neon-text">Send Me a Message</h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1e9fab] focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1e9fab] focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium mb-1">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1e9fab] focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-1">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1e9fab] focus:border-transparent"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-3 bg-[#1e9fab] text-white rounded-md flex items-center gap-2 hover:bg-[#1e9fab]/80 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Sending..." : "Send Message"} <Send size={16} />
            </button>

            {submitStatus === "success" && (
              <div className="mt-4 p-3 bg-green-500/20 border border-green-500 rounded-md text-green-400">
                Your message has been sent successfully! I'll get back to you soon.
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}
