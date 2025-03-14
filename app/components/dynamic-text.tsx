"use client"

import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

interface DynamicTextProps {
  text: string
  className?: string
}

export function DynamicText({ text, className }: DynamicTextProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleMouseMove = (e: MouseEvent) => {
      const { left, top, width, height } = container.getBoundingClientRect()
      const x = (e.clientX - left) / width - 0.5
      const y = (e.clientY - top) / height - 0.5

      container.style.transform = `
        rotate(${-12 + x * 5}deg)
        translateX(${x * 20}px)
        translateY(${y * 20}px)
      `
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div ref={containerRef} className={cn("transition-transform duration-100 ease-out whitespace-nowrap", className)}>
      {text}
    </div>
  )
}

