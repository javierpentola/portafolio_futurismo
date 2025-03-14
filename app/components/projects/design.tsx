"use client"

import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion"
import { useState } from "react"
import { DiagonalBox } from "../diagonal-box"
import { ExplodingLetters } from "../exploding-letters"
import { Star, GitFork } from "lucide-react"

interface Project {
  id: number
  title: string
  description: string
  category: string
  image: string
  stars: number
  forks: number
  position: {
    x: number
    y: number
    rotate: number
  }
}

const categories = ["All", "Graphic Design", "Interior Design", "Exhibition Design", "Digital Design"]

const projects: Project[] = [
  {
    id: 1,
    title: "Modernist Café",
    description: "Interior design for a Bauhaus-inspired coffee shop",
    category: "Interior Design",
    image: "/placeholder.svg?height=200&width=300",
    stars: 12,
    forks: 3,
    position: { x: 20, y: 10, rotate: -15 },
  },
  {
    id: 2,
    title: "Tech Conference",
    description: "Brand identity and collateral for tech event",
    category: "Graphic Design",
    image: "/placeholder.svg?height=200&width=300",
    stars: 8,
    forks: 2,
    position: { x: 60, y: 30, rotate: 10 },
  },
  {
    id: 3,
    title: "Art Gallery",
    description: "Exhibition design for contemporary art show",
    category: "Exhibition Design",
    image: "/placeholder.svg?height=200&width=300",
    stars: 15,
    forks: 5,
    position: { x: 30, y: 50, rotate: -5 },
  },
  {
    id: 4,
    title: "Fashion App",
    description: "UI/UX design for fashion e-commerce",
    category: "Digital Design",
    image: "/placeholder.svg?height=200&width=300",
    stars: 20,
    forks: 7,
    position: { x: 70, y: 60, rotate: 8 },
  },
  {
    id: 5,
    title: "Magazine Layout",
    description: "Editorial design for art magazine",
    category: "Graphic Design",
    image: "/placeholder.svg?height=200&width=300",
    stars: 10,
    forks: 1,
    position: { x: 40, y: 20, rotate: -12 },
  },
]

function ProjectCard({
  project,
  isHovered,
  onHover,
}: {
  project: Project
  isHovered: boolean
  onHover: (id: number | null) => void
}) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotate = useMotionValue(project.position.rotate)

  const scale = useTransform([x, y], ([latestX, latestY]) => {
    const distance = Math.sqrt(latestX ** 2 + latestY ** 2)
    return 1 - Math.min(distance / 1000, 0.1)
  })

  return (
    <motion.div
      drag
      dragMomentum={false}
      dragElastic={0.1}
      dragConstraints={{
        top: -200,
        left: -200,
        right: 200,
        bottom: 200,
      }}
      style={{
        x,
        y,
        rotate,
        scale,
        position: "absolute",
        left: `${project.position.x}%`,
        top: `${project.position.y}%`,
      }}
      whileDrag={{ cursor: "grabbing" }}
      className="w-64 cursor-grab active:cursor-grabbing"
      onMouseEnter={() => onHover(project.id)}
      onMouseLeave={() => onHover(null)}
    >
      <DiagonalBox
        className={`
          overflow-hidden bg-[#f5f0e6] transition-all duration-200
          ${isHovered ? "border-black shadow-lg" : "border-black/50"}
        `}
      >
        <div className="relative">
          <img src={project.image || "/placeholder.svg"} alt={project.title} className="w-full h-32 object-cover" />
          <motion.div
            className="absolute inset-0 bg-black"
            initial={false}
            animate={{ opacity: isHovered ? 0 : 0.1 }}
          />
        </div>
        <div className="p-3">
          <h3 className="text-xl font-bold mb-2 transform -rotate-3">{project.title}</h3>
          <p className="text-sm mb-3">{project.description}</p>
          <div className="flex items-center justify-between text-sm">
            <span className="font-mono transform -rotate-3">{project.category}</span>
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                <Star className="w-4 h-4 mr-1" />
                {project.stars}
              </div>
              <div className="flex items-center">
                <GitFork className="w-4 h-4 mr-1" />
                {project.forks}
              </div>
            </div>
          </div>
        </div>
      </DiagonalBox>
    </motion.div>
  )
}

export function DesignProjects() {
  const [activeCategory, setActiveCategory] = useState("All")
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)

  const filteredProjects = projects.filter((project) => activeCategory === "All" || project.category === activeCategory)

  return (
    <div className="h-full relative overflow-hidden p-8 bg-[#f5f0e6]">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-[20%] left-[30%] w-40 h-40 border-8 border-black/5 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />
        <motion.div
          className="absolute top-[60%] left-[70%] w-32 h-32 bg-black/5"
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />
        <motion.div
          className="absolute top-[40%] left-[20%] w-24 h-24 bg-black/5"
          animate={{ rotate: 360 }}
          transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />
      </div>

      {/* Header with Category Filters */}
      <div className="relative z-10 mb-8">
        <h2 className="text-4xl font-black mb-6 transform -rotate-3">
          <ExplodingLetters text="DESIGN PROJECTS" />
        </h2>

        <div className="flex flex-wrap gap-4">
          {categories.map((category, index) => (
            <motion.button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 font-bold relative ${
                activeCategory === category ? "text-[#f5f0e6]" : "text-black"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="absolute inset-0 bg-black"
                initial={false}
                animate={{
                  opacity: activeCategory === category ? 1 : 0,
                  rotate: activeCategory === category ? -3 : 0,
                }}
              />
              <span className="relative z-10">{category}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="relative h-[calc(100vh-240px)]">
        <AnimatePresence>
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              isHovered={hoveredProject === project.id}
              onHover={setHoveredProject}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Instructions */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-sm text-black/50 font-mono"
      >
        Drag projects to rearrange • Click category to filter
      </motion.div>

      {/* Decorative Elements */}
      <div className="absolute bottom-4 right-4 text-6xl font-black opacity-10 pointer-events-none">+</div>
      <div className="absolute top-4 left-4 text-6xl font-black opacity-10 pointer-events-none">×</div>
    </div>
  )
}

