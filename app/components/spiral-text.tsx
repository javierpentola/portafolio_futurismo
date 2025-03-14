"use client"

import { motion } from "framer-motion"

interface SpiralTextProps {
  text: string
}

export function SpiralText({ text }: SpiralTextProps) {
  const characters = text.split("")

  return (
    <div className="relative w-[400px] h-[400px]">
      {characters.map((char, i) => {
        const angle = (i / characters.length) * Math.PI * 2
        const radius = 150 + i * 2
        const x = Math.cos(angle) * radius
        const y = Math.sin(angle) * radius

        return (
          <motion.div
            key={i}
            className="absolute font-bold text-xl"
            style={{
              left: "50%",
              top: "50%",
              transform: `translate(${x}px, ${y}px) rotate(${(angle * 180) / Math.PI}deg)`,
            }}
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 0.1,
            }}
          >
            {char}
          </motion.div>
        )
      })}
    </div>
  )
}

