"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"

interface ExplodingTextProps {
  text: string
}

export function ExplodingText({ text }: ExplodingTextProps) {
  const [positions, setPositions] = useState<Array<{ x: number; y: number }>>([])

  useEffect(() => {
    setPositions(
      Array.from({ length: text.length }).map(() => ({
        x: (Math.random() - 0.5) * 100,
        y: (Math.random() - 0.5) * 100,
      })),
    )
  }, [text])

  return (
    <div className="relative h-[20vw]">
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          className="absolute text-[20vw] font-black"
          initial={{ x: 0, y: 0, opacity: 1 }}
          animate={{
            x: positions[i]?.x || 0,
            y: positions[i]?.y || 0,
            opacity: [1, 0.8, 1],
            scale: [1, 1.2, 1],
            rotate: [0, (Math.random() - 0.5) * 45, 0],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        >
          {char}
        </motion.span>
      ))}
    </div>
  )
}

