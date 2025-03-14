"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import type React from "react"

interface DiagonalBoxProps {
  children: React.ReactNode
  className?: string
}

export function DiagonalBox({ children, className }: DiagonalBoxProps) {
  return (
    <motion.div
      className={cn("relative border-2 border-black p-4", className)}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className="absolute -right-2 -top-2 w-4 h-4 border-r-2 border-t-2 border-black" />
      <div className="absolute -left-2 -bottom-2 w-4 h-4 border-l-2 border-b-2 border-black" />
      {children}
    </motion.div>
  )
}

