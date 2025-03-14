"use client"

import { motion } from "framer-motion"
import { DiagonalBox } from "./diagonal-box"
import { ExplodingLetters } from "./exploding-letters"
import { Star, GitFork, ExternalLink, Github } from "lucide-react"
import { useLanguage } from "../contexts/LanguageContext"
import { githubTranslations } from "../translations/github"

export function GitHub() {
  const { language } = useLanguage()
  const { title, viewProfile, quote, projects } = githubTranslations[language as keyof typeof githubTranslations]

  return (
    <div className="h-full flex items-center justify-center relative p-8">
      {/* Mechanical Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-40 h-40 border-8 border-black/5 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 20 + i * 5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-6xl w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 flex items-center justify-between"
        >
          <h2 className="text-6xl font-black transform -rotate-6">
            <ExplodingLetters text={title} />
          </h2>

          <motion.a
            href="https://github.com/javierpentola"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-2 bg-black text-[#f5f0e6] px-6 py-3 text-lg font-bold"
            whileHover={{ scale: 1.05, rotate: -3 }}
            whileTap={{ scale: 0.95 }}
          >
            <Github className="w-5 h-5" />
            {viewProfile}
            <div className="absolute inset-0 border-2 border-black transform translate-x-1 translate-y-1 -z-10 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform" />
          </motion.a>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <DiagonalBox
                className={`
                  relative p-6 
                  ${index % 2 === 0 ? "-rotate-3 bg-[#e6f3ff]" : "rotate-3 bg-black text-[#f5f0e6]"}
                `}
              >
                {/* Mechanical Details */}
                <div className="absolute -left-2 -top-2 w-4 h-4 bg-black rounded-full border-4 border-[#f5f0e6]" />
                <div className="absolute -right-2 -bottom-2 w-4 h-4 bg-black rounded-full border-4 border-[#f5f0e6]" />

                <div className="relative">
                  <h3 className="text-xl font-bold mb-3 pr-8">{project.name}</h3>
                  <a
                    href={`https://github.com/javierpentola/${project.name}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute top-0 right-0 opacity-50 hover:opacity-100 transition-opacity"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
                  <p className="text-sm mb-4">{project.description}</p>

                  <div className="flex items-center gap-4 mb-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4" />
                      {Math.floor(Math.random() * 20)}
                    </div>
                    <div className="flex items-center gap-1">
                      <GitFork className="w-4 h-4" />
                      {Math.floor(Math.random() * 10)}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className={`
                          px-2 py-1 text-xs font-bold
                          ${index % 2 === 0 ? "bg-black text-[#f5f0e6]" : "bg-[#f5f0e6] text-black"}
                        `}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </DiagonalBox>
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <p className="text-xl font-bold transform -rotate-3 inline-block opacity-60">"{quote}"</p>
        </motion.div>
      </div>
    </div>
  )
}

