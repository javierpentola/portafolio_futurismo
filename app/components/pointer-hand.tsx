"use client"

import { motion } from "framer-motion"

interface PointerHandProps {
  position: { x: number; y: number }
}

export function PointerHand({ position }: PointerHandProps) {
  return (
    <motion.div
      className="fixed pointer-events-none z-50 text-4xl opacity-10"
      animate={{
        x: position.x,
        y: position.y,
        rotate: [0, -10, 0],
      }}
      transition={{
        x: { type: "spring", stiffness: 300, damping: 30 },
        y: { type: "spring", stiffness: 300, damping: 30 },
        rotate: { duration: 1, repeat: Number.POSITIVE_INFINITY },
      }}
    >
      ☞
    </motion.div>
  )
}

