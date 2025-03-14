"use client"

import { motion } from "framer-motion"
import { DiagonalBox } from "./diagonal-box"
import { ExplodingLetters } from "./exploding-letters"
import { Download } from "lucide-react"
import { CurvedText } from "./curved-text"
import { useLanguage } from "../contexts/LanguageContext"
import { resumeTranslations } from "../translations/resume"

export function Resume() {
  const { language } = useLanguage()
  const {
    title,
    downloadButton,
    experienceOverview,
    experienceItems,
    education,
    educationItems,
    technicalSkills,
    skills,
    languages,
    languageItems,
    curvedText,
  } = resumeTranslations[language as keyof typeof resumeTranslations]

  const downloadResume = () => {
    // This would be replaced with actual PDF download logic
    console.log("Downloading resume...")
  }

  return (
    <div className="h-full flex items-center justify-center relative p-8">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-black/5 font-mono whitespace-nowrap"
            style={{
              fontSize: `${Math.random() * 40 + 20}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              transform: `rotate(${Math.random() * 90 - 45}deg)`,
            }}
          >
            {["×", "+", "=", "÷"][Math.floor(Math.random() * 4)]}
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 max-w-4xl w-full">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h2 className="text-6xl font-black transform -rotate-3 mb-6">
            <ExplodingLetters text={title} />
          </h2>

          <motion.button
            onClick={downloadResume}
            className="group relative inline-flex items-center gap-2 bg-black text-[#f5f0e6] px-6 py-3 text-lg font-bold"
            whileHover={{ scale: 1.05, rotate: -3 }}
            whileTap={{ scale: 0.95 }}
          >
            <Download className="w-5 h-5" />
            {downloadButton}
            <div className="absolute inset-0 border-2 border-black transform translate-x-1 translate-y-1 -z-10 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform" />
          </motion.button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <DiagonalBox className="p-6 bg-black text-[#f5f0e6] -rotate-3">
              <h3 className="text-2xl font-bold mb-4">{experienceOverview}</h3>
              <ul className="space-y-4">
                {experienceItems.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-xl">{["+", "×", "="][index % 3]}</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </DiagonalBox>

            <div className="mt-8">
              <DiagonalBox className="p-6 rotate-3">
                <h3 className="text-2xl font-bold mb-4">{education}</h3>
                <ul className="space-y-4">
                  {educationItems.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-xl">→</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </DiagonalBox>
            </div>
          </motion.div>

          {/* Right Column */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <DiagonalBox className="p-6 rotate-3">
              <h3 className="text-2xl font-bold mb-4">{technicalSkills}</h3>
              <div className="flex flex-wrap gap-3">
                {skills.map((skill, index) => (
                  <motion.span
                    key={skill}
                    className="inline-block px-3 py-1 bg-black text-[#f5f0e6] text-sm font-bold"
                    initial={{ rotate: 0 }}
                    whileHover={{ rotate: -3, scale: 1.1 }}
                    style={{
                      transform: `rotate(${index % 2 ? 3 : -3}deg)`,
                    }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </DiagonalBox>

            <div className="mt-8">
              <DiagonalBox className="p-6 bg-black text-[#f5f0e6] -rotate-3">
                <h3 className="text-2xl font-bold mb-4">{languages}</h3>
                <div className="space-y-3">
                  {languageItems.map((lang, index) => (
                    <div key={index}>
                      {lang.name} ({lang.level})
                    </div>
                  ))}
                </div>
              </DiagonalBox>
            </div>
          </motion.div>
        </div>

        {/* Footer Quote */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <CurvedText text={curvedText} radius={150} className="mx-auto opacity-20" />
        </motion.div>
      </div>
    </div>
  )
}

