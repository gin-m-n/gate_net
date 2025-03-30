import { useRef } from "react"
import { Win } from "./Window"

export const WindowManager = () => {
  const maxZ = useRef(10)
  const handleClick = () => {
    maxZ.current = maxZ.current + 1
    return maxZ.current
  }

  return (
    <>
      <Win x={-300} y={200} z={0} calcZ={handleClick} />
      <Win x={-250} y={150} z={0} calcZ={handleClick} />
    </>
  )
}
