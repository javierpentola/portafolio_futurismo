"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { useLanguage } from "../contexts/LanguageContext"

interface Language {
  code: string
  name: string
  nativeName: string
  angle: number
  scale: number
}

const languages: Language[] = [
  {
    code: "en",
    name: "English",
    nativeName: "ENGLISH",
    angle: -15,
    scale: 1.2,
  },
  {
    code: "es",
    name: "Español",
    nativeName: "ESPAÑOL",
    angle: 12,
    scale: 0.9,
  },
  {
    code: "fr",
    name: "Français",
    nativeName: "FRANÇAIS",
    angle: -8,
    scale: 1.1,
  },
  {
    code: "it",
    name: "Italiano",
    nativeName: "ITALIANO",
    angle: 20,
    scale: 1,
  },
  {
    code: "zh",
    name: "中文",
    nativeName: "中文",
    angle: -10,
    scale: 1.1,
  },
]

export function LanguageSelector() {
  const [isOpen, setIsOpen] = useState(false)
  const [hoveredLang, setHoveredLang] = useState<string | null>(null)
  const { language, setLanguage } = useLanguage()

  const selectedLanguage = languages.find((lang) => lang.code === language) || languages[0]

  return (
    <div className="relative">
      {/* Selected Language Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full h-20 bg-black text-[#f5f0e6] relative overflow-hidden group"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={false}
          animate={{
            rotate: isOpen ? [0, -5, 5, 0] : 0,
          }}
          transition={{
            duration: 0.5,
            repeat: isOpen ? Number.POSITIVE_INFINITY : 0,
          }}
        >
          <span className="text-2xl font-black">{selectedLanguage.nativeName}</span>
        </motion.div>

        {/* Decorative Elements */}
        <motion.div
          className="absolute top-2 right-2 text-2xl opacity-20"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        >
          +
        </motion.div>
        <motion.div
          className="absolute bottom-2 left-2 text-2xl opacity-20"
          animate={{ rotate: [360, 0] }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        >
          ×
        </motion.div>
      </motion.button>

      {/* Language Options */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="absolute bottom-full left-0 right-0 bg-[#f5f0e6] border-2 border-black overflow-hidden"
          >
            <div className="relative p-4 space-y-4">
              {languages.map((lang, index) => (
                <motion.button
                  key={lang.code}
                  className="block w-full text-left relative py-3"
                  onHoverStart={() => setHoveredLang(lang.code)}
                  onHoverEnd={() => setHoveredLang(null)}
                  onClick={() => {
                    setLanguage(lang.code)
                    setIsOpen(false)
                  }}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{
                    x: 0,
                    opacity: 1,
                    rotate: hoveredLang === lang.code ? [lang.angle, -lang.angle] : lang.angle,
                    scale: hoveredLang === lang.code ? [lang.scale, lang.scale * 1.1] : lang.scale,
                  }}
                  transition={{
                    delay: index * 0.1,
                    rotate: {
                      duration: 0.3,
                      repeat: hoveredLang === lang.code ? Number.POSITIVE_INFINITY : 0,
                      repeatType: "reverse",
                    },
                  }}
                >
                  <div className="relative">
                    {/* Background Line */}
                    <motion.div
                      className="absolute inset-0 bg-black"
                      initial={{ scaleX: 0 }}
                      animate={{
                        scaleX: hoveredLang === lang.code ? 1 : 0,
                        originX: index % 2 === 0 ? 0 : 1,
                      }}
                      transition={{ duration: 0.3 }}
                    />

                    {/* Language Text */}
                    <div className="relative z-10 flex items-center justify-between px-4">
                      <span
                        className={`text-2xl font-bold transition-colors ${
                          hoveredLang === lang.code ? "text-[#f5f0e6]" : "text-black"
                        }`}
                      >
                        {lang.nativeName}
                      </span>

                      {/* Decorative Symbol */}
                      <motion.span
                        className="text-lg opacity-0"
                        animate={{
                          opacity: hoveredLang === lang.code ? 1 : 0,
                          x: hoveredLang === lang.code ? [0, 10, 0] : 0,
                        }}
                        transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY }}
                      >
                        {index % 2 === 0 ? "→" : "↗"}
                      </motion.span>
                    </div>

                    {/* Scattered Letters */}
                    {hoveredLang === lang.code && (
                      <div className="absolute -right-4 top-1/2 -translate-y-1/2">
                        {Array.from(lang.code).map((char, i) => (
                          <motion.span
                            key={i}
                            className="absolute text-xs font-mono opacity-10"
                            initial={{ opacity: 0, x: 0, y: 0 }}
                            animate={{
                              opacity: [0, 0.1, 0],
                              x: [0, (i + 1) * 8],
                              y: [0, (i % 2 === 0 ? -1 : 1) * 8],
                            }}
                            transition={{
                              duration: 1,
                              repeat: Number.POSITIVE_INFINITY,
                              delay: i * 0.2,
                            }}
                          >
                            {char}
                          </motion.span>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.button>
              ))}

              {/* Background Pattern */}
              <div className="absolute inset-0 pointer-events-none opacity-[0.01]">
                {Array.from({ length: 2 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute text-[80px] font-black whitespace-nowrap"
                    animate={{
                      x: [-100, 100],
                      y: i * 60,
                    }}
                    transition={{
                      duration: 10 + i * 2,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "reverse",
                      ease: "linear",
                    }}
                  >
                    LANG
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

