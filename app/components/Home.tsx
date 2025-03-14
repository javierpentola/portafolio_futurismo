"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Navigation } from "./navigation"
import { About } from "./about"
import { Projects } from "./projects"
import { Experience } from "./experience"
import { Contact } from "./contact"
import { Education } from "./education"
import { Resume } from "./resume"
import { PointerHand } from "./pointer-hand"
import { GitHub } from "./github"

export default function Home() {
  const [activeSection, setActiveSection] = useState("about")
  const [activeSubSection, setActiveSubSection] = useState<string | null>(null)
  const [pointerPosition, setPointerPosition] = useState({ x: 0, y: 0 })
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const handleMouseMove = (e: React.MouseEvent) => {
    setPointerPosition({ x: e.clientX, y: e.clientY })
  }

  const handleSectionChange = (section: string) => {
    setActiveSection(section)
    if (section === "projects") {
      setActiveSubSection("design") // Set default subsection for projects
    } else {
      setActiveSubSection(null)
    }
  }

  const renderContent = () => {
    switch (activeSection) {
      case "about":
        return <About />
      case "projects":
        return <Projects activeSubSection={activeSubSection} />
      case "experience":
        return <Experience />
      case "contact":
        return <Contact />
      case "education":
        return <Education />
      case "resume":
        return <Resume />
      case "github":
        return <GitHub />
      default:
        return <About />
    }
  }

  if (!isMounted) {
    return null // or a loading indicator
  }

  return (
    <main className="min-h-screen w-full bg-[#f5f0e6] relative overflow-x-hidden" onMouseMove={handleMouseMove}>
      {/* Background Pattern */}
      <div className="fixed inset-0 grid grid-cols-[repeat(10,1fr)] md:grid-cols-[repeat(20,1fr)] grid-rows-[repeat(10,1fr)] md:grid-rows-[repeat(20,1fr)] opacity-10 pointer-events-none">
        {Array.from({ length: 200 }).map((_, i) => (
          <div
            key={i}
            className="border-[0.5px] border-black"
            style={{
              transform: `rotate(${Math.random() * 45}deg)`,
            }}
          />
        ))}
      </div>

      {/* Pointer Hand (hidden on mobile) */}
      <div className="hidden md:block">
        <PointerHand position={pointerPosition} />
      </div>

      {/* Content Area */}
      <div className="relative min-h-screen flex flex-col md:flex-row">
        <div className="flex-1 p-4 md:p-8">{renderContent()}</div>

        {/* Navigation */}
        <Navigation
          activeSection={activeSection}
          activeSubSection={activeSubSection}
          onSectionChange={handleSectionChange}
          onSubSectionChange={setActiveSubSection}
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
        />
      </div>
    </main>
  )
}

