"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import type React from "react"

interface DiagonalBoxProps {
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children?: React.ReactNode;
}

export const DiagonalBox = ({ 
  className,
  onClick,
  children 
}: DiagonalBoxProps) => {
  return (
    <motion.div
      className={cn("relative", className)}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {children}
    </motion.div>
  )
}

