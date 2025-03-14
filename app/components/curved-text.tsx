"use client"

interface CurvedTextProps {
  text: string
  radius?: number
  className?: string
}

export function CurvedText({ text, radius = 200, className = "" }: CurvedTextProps) {
  const characters = text.split("")
  const degree = 360 / characters.length

  return (
    <div className={className}>
      <div
        className="relative"
        style={{
          width: `${radius * 2}px`,
          height: `${radius * 2}px`,
        }}
      >
        {characters.map((char, i) => (
          <div
            key={`${char}-${i}`}
            className="absolute left-1/2 -translate-x-1/2 font-mono"
            style={{
              height: `${radius}px`,
              transform: `rotate(${degree * i}deg)`,
              transformOrigin: `bottom center`,
              width: "20px",
              textAlign: "center",
            }}
          >
            {char}
          </div>
        ))}
      </div>
    </div>
  )
}

