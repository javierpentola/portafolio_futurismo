"use client"

import { motion } from "framer-motion"
import { DiagonalBox } from "./diagonal-box"
import { ExplodingLetters } from "./exploding-letters"
import { Copy } from "lucide-react"
import { useState } from "react"
import { useLanguage } from "../contexts/LanguageContext"
import { contactTranslations } from "../translations/contact"

export function Contact() {
  const [copiedField, setCopiedField] = useState<string | null>(null)
  const { language } = useLanguage()
  const { title, quote, contactInfo, copyMessage } = contactTranslations[language as keyof typeof contactTranslations]

  const handleCopy = async (value: string, type: string) => {
    await navigator.clipboard.writeText(value)
    setCopiedField(type)
    setTimeout(() => setCopiedField(null), 2000)
  }

  return (
    <div className="h-full flex items-center justify-center relative p-8">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-5"
          style={{
            backgroundImage: `url(${process.env.NEXT_PUBLIC_VERCEL_URL}/CJ4Wm.jpeg)`,
            transform: "rotate(-15deg) scale(1.5)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-4xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-6xl font-black transform -rotate-6">
            <ExplodingLetters text={title} />
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {contactInfo.map((contact, index) => (
            <motion.div
              key={contact.type}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <DiagonalBox
                className={`
                  ${index % 2 === 0 ? "-rotate-3" : "rotate-3"}
                  ${index < 2 ? "bg-black text-[#f5f0e6]" : "bg-[#f5f0e6] border-black"}
                  p-6 hover:scale-105 transition-transform cursor-pointer
                `}
                onClick={() => handleCopy(contact.value, contact.type)}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-3xl mb-2">{contact.icon}</div>
                    <h3 className="text-xl font-bold mb-1">{contact.type}</h3>
                    <p className="font-mono">{contact.value}</p>
                  </div>
                  <motion.div
                    animate={{
                      scale: copiedField === contact.type ? [1, 1.2, 1] : 1,
                      rotate: copiedField === contact.type ? [0, 10, -10, 0] : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className="text-sm"
                  >
                    {copiedField === contact.type ? copyMessage : <Copy className="w-4 h-4" />}
                  </motion.div>
                </div>
              </DiagonalBox>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <p className="text-xl font-bold transform -rotate-3 inline-block">"{quote}"</p>
        </motion.div>

        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 transform rotate-45 opacity-20 text-6xl">+</div>
        <div className="absolute bottom-0 left-0 transform -rotate-45 opacity-20 text-6xl">×</div>
      </div>
    </div>
  )
}
