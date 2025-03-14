"use client"

import { motion } from "framer-motion"

interface DancingTextProps {
  text: string
  className?: string
}

export function DancingText({ text, className = "" }: DancingTextProps) {
  return (
    <div className={className}>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          animate={{
            y: [0, -10, 0],
            rotate: [0, 10, -10, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            delay: i * 0.1,
          }}
        >
          {char}
        </motion.span>
      ))}
    </div>
  )
}

