"use client"

import { motion } from "framer-motion"
import { useState } from "react"

const letterAnimations = {
  G: {
    hover: { rotate: 360, scale: 1.2 },
    tap: { rotate: -360, scale: 0.8 },
  },
  R: {
    hover: { y: [-20, 0, -20], color: ["#000", "#ff0000", "#000"] },
    tap: { y: 20, color: "#00ff00" },
  },
  A: {
    hover: { rotateY: 180, filter: "blur(4px)" },
    tap: { rotateX: 180, filter: "blur(0px)" },
  },
  C: {
    hover: {
      x: [0, -5, 5, -5, 5, 0],
      borderRadius: ["0%", "50%", "0%", "50%", "0%"],
    },
    tap: { scale: 0.5, borderRadius: "50%" },
  },
  I: {
    hover: { scaleY: 1.5, rotateZ: 15 },
    tap: { scaleY: 0.5, rotateZ: -15 },
  },
}

interface InteractiveTitleProps {
  text: string
}

export function InteractiveTitle({ text }: InteractiveTitleProps) {
  const [hoveredLetter, setHoveredLetter] = useState<string | null>(null)

  return (
    <div className="flex flex-wrap justify-center md:justify-start">
      {text.split("").map((letter, index) => {
        const animation = letterAnimations[letter as keyof typeof letterAnimations] || {}
        return (
          <motion.span
            key={index}
            className="text-[15vw] md:text-[10vw] font-black leading-none tracking-tighter cursor-pointer"
            onHoverStart={() => setHoveredLetter(letter)}
            onHoverEnd={() => setHoveredLetter(null)}
            animate={hoveredLetter === letter ? "hover" : "initial"}
            whileTap="tap"
            variants={animation}
          >
            {letter}
          </motion.span>
        )
      })}
    </div>
  )
}

