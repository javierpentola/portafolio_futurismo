"use client"

import { motion, useAnimation } from "framer-motion"
import { useState } from "react"

interface ExplodingLettersProps {
  text: string
  className?: string
}

export function ExplodingLetters({ text, className = "" }: ExplodingLettersProps) {
  const [isExploded, setIsExploded] = useState(false)
  const controls = useAnimation()

  const handleHover = async () => {
    if (!isExploded) {
      setIsExploded(true)
      await controls.start((i) => ({
        x: (Math.random() - 0.5) * 50,
        y: (Math.random() - 0.5) * 50,
        rotate: Math.random() * 30 - 15,
        transition: { duration: 0.3, delay: i * 0.02 },
      }))
      await controls.start((i) => ({
        x: 0,
        y: 0,
        rotate: 0,
        transition: { type: "spring", stiffness: 300, damping: 10, delay: i * 0.02 },
      }))
      setIsExploded(false)
    }
  }

  return (
    <div className={className} onMouseEnter={handleHover} onFocus={handleHover}>
      {text.split("").map((char, i) => (
        <motion.span
          key={`${char}-${i}`}
          custom={i}
          animate={controls}
          className="inline-block"
          style={{ transformOrigin: "center" }}
          whileHover={{ scale: 1.2 }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </div>
  )
}

