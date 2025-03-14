"use client"

import { motion } from "framer-motion"

interface DiagonalTextProps {
  text: string
}

export function DiagonalText({ text }: DiagonalTextProps) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 10 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-8xl font-black text-black/5 whitespace-nowrap"
          style={{
            top: `${i * 15}%`,
            left: "-10%",
            transform: "rotate(-30deg)",
          }}
          animate={{
            x: ["0%", "100%"],
          }}
          transition={{
            duration: 20 + i * 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        >
          {text}
        </motion.div>
      ))}
    </div>
  )
}

