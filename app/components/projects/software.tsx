"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { ExplodingLetters } from "../exploding-letters"

interface Project {
  id: number
  title: string
  description: string
  category: string
  technologies: string[]
  shape: "circle" | "square" | "triangle"
  color: string
}

const categories = ["All", "Web Development", "Mobile Apps", "AI/Machine Learning", "Backend Systems"]

const projects: Project[] = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "Full-stack web application with real-time inventory",
    category: "Web Development",
    technologies: ["React", "Node.js", "MongoDB"],
    shape: "circle",
    color: "#2B50AA",
  },
  {
    id: 2,
    title: "AI Image Generator",
    description: "Machine learning model for creating artwork",
    category: "AI/Machine Learning",
    technologies: ["Python", "TensorFlow", "AWS"],
    shape: "triangle",
    color: "#FF4B4B",
  },
  {
    id: 3,
    title: "Mobile Banking App",
    description: "Secure financial transactions on mobile",
    category: "Mobile Apps",
    technologies: ["React Native", "Firebase", "Redux"],
    shape: "square",
    color: "#FFB800",
  },
  {
    id: 4,
    title: "Microservices API",
    description: "Scalable backend architecture",
    category: "Backend Systems",
    technologies: ["Go", "Docker", "Kubernetes"],
    shape: "circle",
    color: "#2B50AA",
  },
  {
    id: 5,
    title: "Social Network",
    description: "Real-time social platform",
    category: "Web Development",
    technologies: ["Next.js", "GraphQL", "PostgreSQL"],
    shape: "square",
    color: "#FF4B4B",
  },
]

function ProjectShape({
  project,
  isSelected,
  onClick,
}: {
  project: Project
  isSelected: boolean
  onClick: () => void
}) {
  const shapeStyles = "w-full h-full transition-all duration-500 cursor-pointer"

  const shapes = {
    circle: "rounded-full",
    square: "rotate-45",
    triangle: "clip-path-triangle",
  }

  return (
    <motion.div
      className={`relative aspect-square ${isSelected ? "z-10" : "z-0"}`}
      whileHover={{ scale: 1.1 }}
      onClick={onClick}
    >
      <motion.div
        className={`${shapeStyles} ${shapes[project.shape]}`}
        style={{ backgroundColor: project.color }}
        animate={{
          scale: isSelected ? 1.1 : 1,
          opacity: isSelected ? 1 : 0.7,
        }}
      >
        {isSelected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 flex flex-col items-center justify-center p-4 text-white"
            style={{
              backgroundColor: "rgba(0,0,0,0.8)",
              transform: project.shape === "square" ? "rotate(-45deg)" : "none",
            }}
          >
            <h3 className="text-lg font-bold mb-2 text-center">{project.title}</h3>
            <p className="text-sm mb-2 text-center">{project.description}</p>
            <div className="flex flex-wrap justify-center gap-2">
              {project.technologies.map((tech) => (
                <span key={tech} className="text-xs px-2 py-1 bg-white/20 rounded-full">
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  )
}

export function SoftwareProjects() {
  const [activeCategory, setActiveCategory] = useState("All")
  const [selectedProject, setSelectedProject] = useState<number | null>(null)

  const filteredProjects = projects.filter((project) => activeCategory === "All" || project.category === activeCategory)

  return (
    <div className="h-full relative overflow-hidden p-8 bg-[#f5f0e6]">
      {/* Technical Grid Background */}
      <div className="absolute inset-0 grid grid-cols-[repeat(20,1fr)] grid-rows-[repeat(20,1fr)] opacity-5">
        {Array.from({ length: 400 }).map((_, i) => (
          <div key={i} className="border-[0.5px] border-black" />
        ))}
      </div>

      {/* Measurement Lines */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="absolute w-full h-px bg-black/10" style={{ top: `${25 * (i + 1)}%` }}>
            <div className="absolute -left-4 -top-3 text-xs font-mono opacity-30">{25 * (i + 1)}%</div>
          </div>
        ))}
      </div>

      {/* Header with Category Filters */}
      <div className="relative z-10 mb-12">
        <h2 className="text-4xl font-black mb-8">
          <ExplodingLetters text="SOFTWARE PROJECTS" />
        </h2>

        <div className="flex flex-wrap gap-6">
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => {
                setActiveCategory(category)
                setSelectedProject(null)
              }}
              className="relative"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="absolute inset-0 bg-black"
                initial={false}
                animate={{
                  opacity: activeCategory === category ? 1 : 0,
                }}
              />
              <span
                className={`relative z-10 px-4 py-2 font-bold ${
                  activeCategory === category ? "text-[#f5f0e6]" : "text-black"
                }`}
              >
                {category}
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="relative grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        <AnimatePresence>
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5 }}
            >
              <ProjectShape
                project={project}
                isSelected={selectedProject === project.id}
                onClick={() => setSelectedProject(selectedProject === project.id ? null : project.id)}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Technical Details */}
      <div className="absolute bottom-4 left-4 text-xs font-mono opacity-30">
        <div>GRID: 20 × 20</div>
        <div>SCALE: 1:100</div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-4 right-4 text-6xl font-black opacity-10 pointer-events-none">+</div>
    </div>
  )
}

