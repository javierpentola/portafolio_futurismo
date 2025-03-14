"use client"

import { motion } from "framer-motion"
import { DiagonalBox } from "./diagonal-box"
import { ExplodingLetters } from "./exploding-letters"
import { WaveText } from "./wave-text"
import { useLanguage } from "../contexts/LanguageContext"
import { educationTranslations } from "../translations/education"

export function Education() {
  const { language } = useLanguage()
  const { title, languageCertifications, quote, diplomas, languages } =
    educationTranslations[language as keyof typeof educationTranslations]

  return (
    <div className="h-full flex items-center justify-center relative p-8">
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-black/5 font-bold whitespace-nowrap"
            style={{
              fontSize: `${Math.random() * 50 + 20}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              transform: `rotate(${Math.random() * 90 - 45}deg)`,
            }}
            animate={{
              x: [0, 50, 0],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 10,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 0.5,
            }}
          >
            EDUCATION
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h2 className="text-4xl font-black mb-6 transform -rotate-3">
            <ExplodingLetters text={title} />
          </h2>
        </motion.div>

        {diplomas.map((diploma, index) => (
          <motion.div
            key={diploma.title}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
            className="mb-6"
          >
            <DiagonalBox className={`${index % 2 === 0 ? "-rotate-3" : "rotate-3"} bg-black text-[#f5f0e6] p-6`}>
              <h3 className="text-2xl font-bold mb-2">{diploma.title}</h3>
              <p className="text-lg italic">{diploma.institution}</p>
            </DiagonalBox>
          </motion.div>
        ))}

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12"
        >
          <h3 className="text-3xl font-bold mb-6 transform -rotate-3">
            <ExplodingLetters text={languageCertifications} />
          </h3>
        </motion.div>

        <div className="grid grid-cols-2 gap-6">
          {languages.map((lang, index) => (
            <motion.div
              key={lang.name}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
            >
              <DiagonalBox className={`rotate-${index % 2 ? "3" : "-3"} bg-black/5 p-4`}>
                <h4 className="text-2xl font-bold mb-2">
                  <WaveText text={lang.name.toUpperCase()} />
                </h4>
                <p className="text-lg">
                  <span className="font-semibold">{lang.level}</span>
                  {lang.cert && <span className="ml-2 text-sm">({lang.cert})</span>}
                </p>
              </DiagonalBox>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <p className="text-xl font-bold italic transform -rotate-3 inline-block">"{quote}"</p>
        </motion.div>
      </div>
    </div>
  )
}

