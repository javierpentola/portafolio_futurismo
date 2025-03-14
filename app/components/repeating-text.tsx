"use client"

import { motion } from "framer-motion"

interface RepeatingTextProps {
  text: string
  className?: string
}

export function RepeatingText({ text, className = "" }: RepeatingTextProps) {
  return (
    <div className={className}>
      <motion.div
        animate={{
          x: [0, -100],
        }}
        transition={{
          repeat: Number.POSITIVE_INFINITY,
          duration: 20,
          ease: "linear",
        }}
        className="whitespace-nowrap"
      >
        {Array.from({ length: 10 }).map((_, i) => (
          <span key={i} className="inline-block mx-4">
            {text}
          </span>
        ))}
      </motion.div>
    </div>
  )
}

