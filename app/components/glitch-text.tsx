"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import type React from "react" // Added import for React

interface GlitchTextProps {
  children: React.ReactNode
}

export function GlitchText({ children }: GlitchTextProps) {
  const [isGlitching, setIsGlitching] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsGlitching(true)
      setTimeout(() => setIsGlitching(false), 100)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative">
      {/* Original */}
      <motion.div
        animate={{
          x: isGlitching ? [-2, 2, -2, 0] : 0,
          opacity: isGlitching ? [1, 0.8, 1] : 1,
        }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.div>

      {/* Glitch layers */}
      {isGlitching && (
        <>
          <motion.div
            className="absolute inset-0 text-[#ff0000] mix-blend-multiply"
            animate={{ x: [-2, 2, -2, 0], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 0.2 }}
          >
            {children}
          </motion.div>
          <motion.div
            className="absolute inset-0 text-[#00ff00] mix-blend-multiply"
            animate={{ x: [2, -2, 2, 0], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 0.2 }}
          >
            {children}
          </motion.div>
        </>
      )}
    </div>
  )
}

