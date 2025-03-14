"use client"

import { DesignProjects } from "./projects/design"
import { SoftwareProjects } from "./projects/software"
import { StudiesProjects } from "./projects/studies"

interface ProjectsProps {
  activeSubSection: string | null
}

export function Projects({ activeSubSection }: ProjectsProps) {
  // If no subsection is active, default to "design"
  const currentSubSection = activeSubSection || "design"

  return (
    <div className="h-full relative">
      {currentSubSection === "design" && <DesignProjects />}
      {currentSubSection === "software" && <SoftwareProjects />}
      {currentSubSection === "studies" && <StudiesProjects />}
    </div>
  )
}

