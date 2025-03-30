import { useRef, useState } from "react"
import { Win } from "./Window"

export const WindowManager = () => {
  const maxZ = useRef(1)
  const handleClick = () => {
    maxZ.current = maxZ.current + 1
    return maxZ.current
  }

  const [windows, setWindows] = useState([
    {
      id: 0,
      position: { x: -300, y: 200, z: 0 }
    },
    {
      id: 1,
      position: { x: -250, y: 150, z: 1 }
    },
  ])

  const deletePosition = (id: number) => {
    setWindows(wins => {
      return wins.filter((w) => w.id !== id)
    })
  }

  return (
    <group>
      {windows.map(((w) =>
        <Win
          key={w.id}
          position={w.position}
          calcZ={handleClick}
          text="あいうえお"
          onClose={() => deletePosition(w.id)}
        />
      ))}
    </group>
  )
}
