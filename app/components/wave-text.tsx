"use client"

import { motion } from "framer-motion"

interface WaveTextProps {
  text: string
  className?: string
}

export function WaveText({ text, className = "" }: WaveTextProps) {
  return (
    <div className={className}>
      {text.split("").map((char, i) => (
        <motion.span
          key={`${char}-${i}`}
          className="inline-block"
          animate={{
            y: [0, -5, 0],
          }}
          transition={{
            duration: 1,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            delay: i * 0.1,
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </div>
  )
}

