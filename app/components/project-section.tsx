"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

const projects = [
  {
    title: "E-Commerce",
    description: "Dynamic shopping platform with real-time updates",
    angle: -6,
  },
  {
    title: "Analytics",
    description: "Data visualization dashboard",
    angle: 6,
  },
  {
    title: "Web App",
    description: "Progressive web application with offline support",
    angle: -3,
  },
  {
    title: "AI Platform",
    description: "Machine learning interface for data processing",
    angle: 3,
  },
]

export function ProjectSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8])

  return (
    <div ref={containerRef} className="relative">
      <h2 className="text-6xl font-bold transform -rotate-12 mb-16 relative">
        PROJECTS
        <span className="absolute -right-8 top-0 text-2xl">÷</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {projects.map((project, index) => (
          <motion.div
            key={project.title}
            style={{
              scale: scale,
              rotate: project.angle,
            }}
            className="border-2 border-black p-8 hover:bg-black hover:text-[#f5f0e6] transition-colors duration-300 relative group"
          >
            <div className="absolute -right-2 -top-2 text-2xl opacity-0 group-hover:opacity-100 transition-opacity">
              +
            </div>
            <h3 className="text-3xl font-bold mb-4">{project.title}</h3>
            <p className="font-mono text-lg">{project.description}</p>
            <div className="mt-8 flex items-center gap-2 font-mono">
              <span>VIEW</span>
              <span className="text-2xl">→</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

