"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { DiagonalBox } from "./diagonal-box"
import { LanguageSelector } from "./language-selector"
import { Menu, X } from "lucide-react"
import { useLanguage } from "../contexts/LanguageContext"
import { navigationTranslations } from "../translations/navigation"

interface NavigationProps {
  activeSection: string
  activeSubSection: string | null
  onSectionChange: (section: string) => void
  onSubSectionChange: (subsection: string | null) => void
  isMenuOpen: boolean
  setIsMenuOpen: (isOpen: boolean) => void
}

export function Navigation({
  activeSection,
  activeSubSection,
  onSectionChange,
  onSubSectionChange,
  isMenuOpen,
  setIsMenuOpen,
}: NavigationProps) {
  const [hoveredSection, setHoveredSection] = useState<string | null>(null)
  const [isMounted, setIsMounted] = useState(false)
  const { language } = useLanguage()
  const { sections, projectSubsections } = navigationTranslations[language as keyof typeof navigationTranslations]

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const handleSectionClick = (sectionId: string) => {
    onSectionChange(sectionId)
    if (sectionId === "projects" && !activeSubSection) {
      onSubSectionChange("design") // Set default subsection for projects
    }
  }

  if (!isMounted) {
    return null // or a loading indicator
  }

  return (
    <>
      {/* Mobile menu button */}
      <button className="fixed top-4 right-4 z-50 md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        {isMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
      </button>

      {/* Navigation content */}
      <AnimatePresence>
        {(isMenuOpen || (typeof window !== "undefined" && window.innerWidth >= 768)) && (
          <motion.nav
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed md:sticky top-0 right-0 w-full md:w-72 h-screen border-l-2 border-black bg-[#f5f0e6] overflow-hidden flex flex-col justify-between z-40"
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              {Array.from({ length: 10 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute text-4xl font-bold whitespace-nowrap"
                  style={{
                    top: `${i * 10}%`,
                    left: "50%",
                    transform: "translateX(-50%) rotate(45deg)",
                  }}
                  animate={{
                    x: [-20, 20, -20],
                  }}
                  transition={{
                    duration: 10,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: i * 0.5,
                  }}
                >
                  DADA FUTURA
                </motion.div>
              ))}
            </div>

            {/* Navigation Items */}
            <div className="flex-grow overflow-y-auto">
              <div className="space-y-6 p-8">
                {sections.map((section) => (
                  <div key={section.id} className="relative group">
                    {/* Section Symbol */}
                    <motion.div
                      className="absolute -left-4 text-lg opacity-20"
                      animate={{
                        x: hoveredSection === section.id ? [0, 4, 0] : 0,
                        opacity: hoveredSection === section.id ? 1 : 0.2,
                      }}
                    >
                      {section.symbol}
                    </motion.div>

                    {/* Pattern */}
                    <motion.div
                      className="absolute -right-4 text-xs opacity-0 font-mono"
                      animate={{
                        opacity: hoveredSection === section.id ? 1 : 0,
                      }}
                    >
                      {section.pattern}
                    </motion.div>

                    {/* Main Button */}
                    <motion.button
                      onHoverStart={() => setHoveredSection(section.id)}
                      onHoverEnd={() => setHoveredSection(null)}
                      onClick={() => handleSectionClick(section.id)}
                      className="w-full text-left"
                      whileHover={{ x: 20 }}
                    >
                      <DiagonalBox
                        className={`px-3 py-2 inline-block
                          ${activeSection === section.id ? "bg-black text-[#f5f0e6] -rotate-6" : "hover:-rotate-3"}`}
                      >
                        <motion.span
                          className="inline-block text-lg font-bold tracking-wider"
                          animate={
                            hoveredSection === section.id
                              ? {
                                  y: [0, -2, 0],
                                }
                              : {}
                          }
                          transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY }}
                        >
                          {section.label}
                        </motion.span>
                      </DiagonalBox>
                    </motion.button>

                    {/* Subsections */}
                    <AnimatePresence>
                      {section.id === "projects" && activeSection === section.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="pl-8 mt-4 space-y-3">
                            {projectSubsections.map((subsection, index) => (
                              <motion.button
                                key={subsection.id}
                                onClick={() => onSubSectionChange(subsection.id)}
                                className="group/item relative block"
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: index * 0.1 }}
                              >
                                <motion.span
                                  className="absolute -left-4 opacity-0 text-sm"
                                  animate={{ opacity: activeSubSection === subsection.id ? 1 : 0 }}
                                >
                                  {subsection.symbol}
                                </motion.span>
                                <motion.div
                                  className={`text-base transform transition-all
                                    ${
                                      activeSubSection === subsection.id
                                        ? "font-bold -rotate-6 text-black"
                                        : "text-black/60"
                                    }`}
                                  whileHover={{
                                    x: 10,
                                    rotate: -3,
                                    transition: { duration: 0.2 },
                                  }}
                                >
                                  {subsection.label}
                                </motion.div>
                              </motion.button>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>

            {/* Language Selector */}
            <div className="border-t-2 border-black">
              <LanguageSelector />
            </div>

            {/* Decorative Corner */}
            <div className="absolute bottom-0 right-0 p-4 opacity-20">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                className="text-4xl"
              >
                ✧
              </motion.div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  )
}

