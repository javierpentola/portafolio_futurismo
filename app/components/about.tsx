"use client"

import { motion } from "framer-motion"
import { DiagonalBox } from "./diagonal-box"
import { InteractiveTitle } from "./interactive-title"
import { InteractiveParagraph } from "./interactive-paragraph"
import { useLanguage } from "../contexts/LanguageContext"
import { aboutTranslations } from "../translations/about"

export function About() {
  const { language } = useLanguage()
  const { title, description } = aboutTranslations[language as keyof typeof aboutTranslations]

  return (
    <div className="min-h-screen flex items-center justify-center relative p-4 md:p-8">
      {/* Background Text Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-black/5 font-bold whitespace-nowrap"
            style={{
              fontSize: `${Math.random() * 100 + 50}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              transform: `rotate(${Math.random() * 90 - 45}deg)`,
            }}
            animate={{
              x: [0, 50, 0],
              opacity: [0.05, 0.1, 0.05],
            }}
            transition={{
              duration: 15 + i * 2,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          >
            DADA × FUTURA
          </motion.div>
        ))}
      </div>

      {/* Floating Symbols */}
      <div className="absolute inset-0 pointer-events-none">
        {["SI", "NO", "×", "+", "→"].map((symbol, i) => (
          <motion.div
            key={i}
            className="absolute text-4xl font-black text-black/10"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, symbol === "×" ? 360 : 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          >
            {symbol}
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 max-w-4xl">
        {/* Main Title */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <DiagonalBox className="-rotate-6 md:-rotate-12">
            <InteractiveTitle text={title} />
          </DiagonalBox>
        </motion.div>

        {/* Description */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
          className="mt-8 md:mt-12"
        >
          <DiagonalBox className="rotate-2 md:rotate-3">
            <InteractiveParagraph text={description} />
          </DiagonalBox>
        </motion.div>

        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 transform rotate-12">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            className="text-6xl opacity-20"
          >
            ×
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 transform -rotate-45">
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            className="text-6xl opacity-20"
          >
            +
          </motion.div>
        </div>

        {/* Dynamic Text Elements */}
        <div className="absolute -left-20 top-1/2 transform -translate-y-1/2">
          {["S", "I", "!", "S", "I", "!"].map((char, i) => (
            <motion.div
              key={i}
              className="text-2xl font-bold text-black/10"
              animate={{
                y: [0, -20 * (i + 1), 0],
                x: [0, 10, 0],
                rotate: [-10, 0, -10],
              }}
              transition={{
                duration: 10,
                delay: i * 0.5,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
            >
              {char}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

