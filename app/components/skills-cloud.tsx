"use client"

import { motion } from "framer-motion"

const skills = [
  { name: "REACT", level: 90 },
  { name: "NEXT.JS", level: 85 },
  { name: "TYPESCRIPT", level: 88 },
  { name: "CSS/SASS", level: 92 },
  { name: "UI/UX", level: 85 },
  { name: "API", level: 87 },
  { name: "GIT", level: 89 },
  { name: "AWS", level: 82 },
]

export function SkillsCloud() {
  return (
    <div className="relative">
      <h2 className="text-6xl font-bold transform -rotate-12 mb-16 relative">
        SKILLS
        <span className="absolute -right-8 top-0 text-2xl">×</span>
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
        {skills.map((skill, index) => (
          <motion.div
            key={skill.name}
            initial={{ rotate: 0, scale: 0.8 }}
            whileHover={{ rotate: [-5, 5], scale: 1.1 }}
            transition={{
              rotate: {
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                duration: 0.5,
              },
            }}
            className="relative"
          >
            <div
              className="absolute inset-0 bg-black opacity-5"
              style={{
                transform: `rotate(${Math.random() * 20 - 10}deg)`,
              }}
            />
            <div className="relative z-10 text-center transform">
              <span className="font-bold text-2xl block mb-2">{skill.name}</span>
              <div className="font-mono text-sm">
                {Array.from({ length: 3 }).map((_, i) => (
                  <span key={i} className="inline-block mx-1">
                    +
                  </span>
                ))}
              </div>
              <div className="h-1 bg-black mt-2" style={{ width: `${skill.level}%` }} />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

