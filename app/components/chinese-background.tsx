"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

const chineseCharacters = "创新设计开发艺术技术未来前卫动态交互用户体验"

export function ChineseBackground() {
  const [characters, setCharacters] = useState<string[]>([])

  useEffect(() => {
    const chars = Array.from(
      { length: 50 },
      () => chineseCharacters[Math.floor(Math.random() * chineseCharacters.length)],
    )
    setCharacters(chars)
  }, [])

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {characters.map((char, index) => (
        <motion.div
          key={index}
          className="absolute text-4xl font-bold text-black/5"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            opacity: 0,
          }}
          animate={{
            opacity: [0, 0.2, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 10 + Math.random() * 10,
            repeat: Number.POSITIVE_INFINITY,
            delay: Math.random() * 10,
          }}
        >
          {char}
        </motion.div>
      ))}
    </div>
  )
}

