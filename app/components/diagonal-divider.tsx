import { cn } from "@/lib/utils"

interface DiagonalDividerProps {
  className?: string
}

export function DiagonalDivider({ className }: DiagonalDividerProps) {
  return (
    <div className={cn("h-32 relative overflow-hidden", className)}>
      <div className="absolute inset-0 flex items-center justify-center">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="h-32 border-l border-black opacity-20"
            style={{
              transform: `rotate(${45 + Math.random() * 10}deg)`,
              marginLeft: `${i * 5}%`,
            }}
          />
        ))}
      </div>
    </div>
  )
}

