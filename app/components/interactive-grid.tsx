"use client"

import { motion } from "framer-motion"
import { useState } from "react"

export function InteractiveGrid() {
  const [hoveredCell, setHoveredCell] = useState<number | null>(null)

  return (
    <div className="fixed inset-0 grid grid-cols-[repeat(20,1fr)] grid-rows-[repeat(20,1fr)] pointer-events-none">
      {Array.from({ length: 400 }).map((_, i) => (
        <motion.div
          key={i}
          className="border-[0.5px] border-black/5"
          animate={{
            scale: hoveredCell === i ? 1.2 : 1,
            opacity: hoveredCell === i ? 0.2 : 0.05,
          }}
          style={{
            transform: `rotate(${Math.random() * 45}deg)`,
          }}
        />
      ))}
    </div>
  )
}

