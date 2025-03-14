"use client"

import { motion } from "framer-motion"
import { DiagonalBox } from "./diagonal-box"
import { ExplodingLetters } from "./exploding-letters"
import { WaveText } from "./wave-text"
import { DiagonalText } from "./diagonal-text"
import { useLanguage } from "../contexts/LanguageContext"
import { experienceTranslations } from "../translations/experience"

export function Experience() {
  const { language } = useLanguage()
  const { title, quote, experiences } = experienceTranslations[language as keyof typeof experienceTranslations]

  return (
    <div className="h-full flex items-center justify-center relative p-8 overflow-hidden">
      <DiagonalText text={title} />

      <div className="relative z-10 max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h2 className="text-5xl font-black mb-12 transform -rotate-3">
            <ExplodingLetters text={title} />
          </h2>
        </motion.div>

        {experiences.map((exp, index) => (
          <motion.div
            key={exp.company}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
            className="mb-16"
          >
            <DiagonalBox className={`${index % 2 === 0 ? "-rotate-3" : "rotate-3"} bg-black text-[#f5f0e6] p-6`}>
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-3xl font-bold">
                  <WaveText text={exp.company} />
                </h3>
                <span className="text-lg font-semibold bg-[#f5f0e6] text-black px-2 py-1 rounded-full transform rotate-3">
                  {exp.period}
                </span>
              </div>
              <h4 className="text-xl font-semibold mb-4">{exp.position}</h4>
              <p className="text-lg mb-4">{exp.description}</p>
              <ul className="list-disc list-inside space-y-2">
                {exp.achievements.map((achievement, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className="text-md"
                  >
                    {achievement}
                  </motion.li>
                ))}
              </ul>
            </DiagonalBox>
          </motion.div>
        ))}

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <p className="text-xl font-bold italic transform -rotate-3 inline-block">"{quote}" - Steve Jobs</p>
        </motion.div>
      </div>
    </div>
  )
}

