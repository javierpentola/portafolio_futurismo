interface ProjectCardProps {
  title: string
  description: string
  angle: number
}

export function ProjectCard({ title, description, angle }: ProjectCardProps) {
  return (
    <div
      className="border-2 border-black p-6 hover:bg-black hover:text-[#f5f0e6] transition-colors duration-300"
      style={{ transform: `rotate(${angle}deg)` }}
    >
      <h3 className="text-2xl font-bold mb-2">{title}</h3>
      <p className="font-mono">{description}</p>
      <div className="mt-4 flex items-center gap-2">
        <span className="text-2xl">+</span>
        <span className="text-sm font-mono">View Project</span>
      </div>
    </div>
  )
}

