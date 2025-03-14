"use client"

import { motion } from "framer-motion"

export function DiagonalLines() {
  return (
    <div className="fixed inset-0 pointer-events-none">
      {Array.from({ length: 10 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-screen w-[1px] bg-black/10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: i * 0.1 }}
          style={{
            left: `${i * 10}%`,
            transform: `rotate(${45 + Math.random() * 10}deg)`,
          }}
        />
      ))}
    </div>
  )
}

