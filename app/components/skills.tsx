export function Skills() {
  return (
    <div className="relative">
      <h2 className="text-4xl font-bold transform -rotate-12 mb-16">++ SKILLS ++</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {[
          { name: "REACT", angle: -12 },
          { name: "NEXT.JS", angle: 6 },
          { name: "TypeScript", angle: -6 },
          { name: "CSS", angle: 12 },
          { name: "UI/UX", angle: 6 },
          { name: "API", angle: -12 },
          { name: "Git", angle: -6 },
          { name: "AWS", angle: 12 },
        ].map((skill, index) => (
          <div
            key={skill.name}
            className="text-center"
            style={{
              transform: `rotate(${skill.angle}deg)`,
              animation: `float ${2 + index * 0.5}s infinite alternate ease-in-out`,
            }}
          >
            <span className="font-bold text-xl">{skill.name}</span>
            <div className="mt-2 font-mono text-sm">+ + +</div>
          </div>
        ))}
      </div>
    </div>
  )
}

