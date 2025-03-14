"use client"

import { motion } from "framer-motion"
import { useState } from "react"

const wordAnimations = {
  default: {
    hover: { scale: 1.1, rotate: 5, transition: { duration: 0.3 } },
    tap: { scale: 0.9, rotate: -5, transition: { duration: 0.3 } },
  },
}

interface InteractiveParagraphProps {
  text: string
}

export function InteractiveParagraph({ text }: InteractiveParagraphProps) {
  const [hoveredWord, setHoveredWord] = useState<string | null>(null)

  const words = text.split(" ")

  return (
    <p className="text-lg md:text-xl lg:text-2xl font-semibold max-w-2xl leading-relaxed">
      {words.map((word, index) => (
        <motion.span
          key={index}
          className="inline-block mr-1 md:mr-2 cursor-pointer"
          onHoverStart={() => setHoveredWord(word)}
          onHoverEnd={() => setHoveredWord(null)}
          animate={hoveredWord === word ? "hover" : "initial"}
          whileTap="tap"
          variants={wordAnimations.default}
        >
          {word}
        </motion.span>
      ))}
    </p>
  )
}

