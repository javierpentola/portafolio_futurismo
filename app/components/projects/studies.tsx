"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

interface Study {
  id: number
  title: string
  year: string
  institution: string
  description: string
  category: string
}

const allStudies: Study[] = [
  {
    id: 1,
    title: "Advanced Typography Workshop",
    year: "2023",
    institution: "Basel School of Design",
    description: "Experimental approaches to digital and analog type design",
    category: "Typography",
  },
  {
    id: 2,
    title: "Computational Art",
    year: "2022",
    institution: "Royal College of Art",
    description: "Generative art and creative coding",
    category: "Digital",
  },
  {
    id: 3,
    title: "Design Systems",
    year: "2023",
    institution: "Parsons School of Design",
    description: "Creating scalable design systems for digital products",
    category: "Systems",
  },
  {
    id: 4,
    title: "Motion Design Principles",
    year: "2022",
    institution: "California Institute of the Arts",
    description: "Animation and interaction design",
    category: "Motion",
  },
  {
    id: 5,
    title: "Design Theory",
    year: "2021",
    institution: "ÉCAL",
    description: "Contemporary design theory and criticism",
    category: "Theory",
  },
  {
    id: 6,
    title: "Experimental UI/UX",
    year: "2023",
    institution: "Aalto University",
    description: "Pushing boundaries in user interface design",
    category: "Digital",
  },
  {
    id: 7,
    title: "Data Visualization Masterclass",
    year: "2022",
    institution: "MIT Media Lab",
    description: "Advanced techniques for visualizing complex data sets",
    category: "Data",
  },
  {
    id: 8,
    title: "Sustainable Design Practices",
    year: "2023",
    institution: "Design Academy Eindhoven",
    description: "Integrating sustainability into design processes",
    category: "Sustainability",
  },
  {
    id: 9,
    title: "AR/VR Design Fundamentals",
    year: "2022",
    institution: "Ravensbourne University London",
    description: "Designing for augmented and virtual reality experiences",
    category: "Digital",
  },
  {
    id: 10,
    title: "Critical Design Thinking",
    year: "2021",
    institution: "Royal College of Art",
    description: "Applying critical theory to design practice",
    category: "Theory",
  },
]

function StudyItem({
  study,
  index,
  searchQuery,
  isVisible,
}: {
  study: Study
  index: number
  searchQuery: string
  isVisible: boolean
}) {
  const [isHovered, setIsHovered] = useState(false)

  const highlightText = (text: string) => {
    if (!searchQuery) return text
    const parts = text.split(new RegExp(`(${searchQuery})`, "gi"))
    return parts.map((part, i) =>
      part.toLowerCase() === searchQuery.toLowerCase() ? (
        <span key={i} className="bg-black text-[#f5f0e6] px-1">
          {part}
        </span>
      ) : (
        part
      ),
    )
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{
            opacity: 1,
            x: 0,
            rotate: isHovered ? [-1, 1] : 0,
          }}
          exit={{ opacity: 0, x: 50 }}
          transition={{
            duration: 0.5,
            delay: index * 0.1,
            rotate: {
              duration: 0.2,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            },
          }}
          className="relative group"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Red Line */}
          <motion.div
            className="absolute left-0 top-1/2 h-px bg-red-600"
            initial={{ width: 0 }}
            animate={{ width: isHovered ? "100%" : 0 }}
            transition={{ duration: 0.3 }}
          />

          {/* Study Item Content */}
          <div className="border-b-2 border-black py-6 relative overflow-hidden">
            <div className="grid grid-cols-[1fr,auto] gap-8">
              {/* Left Column */}
              <div>
                <motion.h3 className="text-2xl font-bold mb-2" animate={{ x: isHovered ? 20 : 0 }}>
                  {highlightText(study.title)}
                </motion.h3>
                <motion.p
                  className="text-sm opacity-70 mb-2"
                  animate={{ x: isHovered ? 10 : 0 }}
                  transition={{ delay: 0.1 }}
                >
                  {highlightText(study.description)}
                </motion.p>
                <motion.div
                  className="text-sm font-mono"
                  animate={{ x: isHovered ? 15 : 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {highlightText(study.institution)}
                </motion.div>
              </div>

              {/* Right Column */}
              <div className="text-right">
                <motion.div
                  className="text-4xl font-black"
                  animate={{
                    scale: isHovered ? 1.2 : 1,
                    rotate: isHovered ? -15 : 0,
                  }}
                >
                  {study.year}
                </motion.div>
                <motion.div className="text-sm font-mono mt-2 opacity-50" animate={{ y: isHovered ? -5 : 0 }}>
                  {study.category}
                </motion.div>
              </div>
            </div>

            {/* Geometric Decorations */}
            <motion.div
              className="absolute right-0 top-0 text-4xl opacity-0 group-hover:opacity-20"
              animate={{
                rotate: [0, 360],
                scale: isHovered ? 1.2 : 1,
              }}
              transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            >
              ×
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export function StudiesProjects() {
  const [searchQuery, setSearchQuery] = useState("")
  const [visibleStudies, setVisibleStudies] = useState(5)

  const isVisible = (study: Study, index: number) => {
    if (index >= visibleStudies) return false
    if (!searchQuery) return true
    const searchLower = searchQuery.toLowerCase()
    return (
      study.title.toLowerCase().includes(searchLower) ||
      study.institution.toLowerCase().includes(searchLower) ||
      study.description.toLowerCase().includes(searchLower) ||
      study.category.toLowerCase().includes(searchLower)
    )
  }

  const filteredStudies = allStudies.filter((study, index) => isVisible(study, index))

  const handleShowMore = () => {
    setVisibleStudies((prev) => Math.min(prev + 5, allStudies.length))
  }

  return (
    <div className="h-full overflow-auto bg-[#f5f0e6] px-8 py-12">
      {/* Background Pattern */}
      <div className="fixed inset-0 pointer-events-none">
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-[400px] font-black opacity-[0.02] whitespace-nowrap"
            animate={{
              x: [-1000, 1000],
              y: i * 200,
            }}
            transition={{
              duration: 20 + i * 5,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              ease: "linear",
            }}
          >
            STUDIES STUDIES STUDIES
          </motion.div>
        ))}
      </div>

      <div className="max-w-4xl mx-auto relative">
        {/* Search Bar */}
        <div className="sticky top-0 z-20 bg-[#f5f0e6] pt-4 pb-8">
          <div className="relative max-w-md mx-auto">
            <Input
              type="text"
              placeholder="Search studies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-transparent border-2 border-black text-lg font-bold placeholder:text-black/50"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5" />
          </div>
        </div>

        {/* Studies List */}
        <div className="relative">
          {allStudies.map((study, index) => (
            <StudyItem
              key={study.id}
              study={study}
              index={index}
              searchQuery={searchQuery}
              isVisible={isVisible(study, index)}
            />
          ))}
        </div>

        {/* Show More Button */}
        {visibleStudies < allStudies.length && filteredStudies.length >= visibleStudies && (
          <motion.button
            onClick={handleShowMore}
            className="mt-8 w-full py-4 bg-black text-[#f5f0e6] text-2xl font-bold"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            SHOW MORE
          </motion.button>
        )}

        {/* No Results Message */}
        {filteredStudies.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12 text-black/50">
            No studies found
          </motion.div>
        )}
      </div>
    </div>
  )
}

