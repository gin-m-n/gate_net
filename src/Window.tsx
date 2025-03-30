import { useThree } from "@react-three/fiber"
import { useRef } from "react"
import { Mesh } from "three"

type Props = {
  x: number,
  y: number,
  z: number,
  calcZ: () => number
}

export const Win = (props: Props) => {
  const isDragged = useRef<boolean>(false)
  const diffCenterAndPointer = useRef<{ x: number, y: number }>({ x: 0, y: 0 })

  const winRef = useRef<Mesh>(null)
  const { size, pointer } = useThree()

  return (
    <>
      <mesh
        onPointerDown={(e) => {
          e.stopPropagation()
          if (winRef.current == null) return
          const x = pointer.x * size.width / 2
          const y = pointer.y * size.height / 2

          const { position } = winRef.current
          const diffX = position.x - x
          const diffY = position.y - y
          diffCenterAndPointer.current = { x: diffX, y: diffY }

          winRef.current.position.z = props.calcZ()

          isDragged.current = true
        }}
        onPointerUp={(e) => {
          e.stopPropagation()
          isDragged.current = false
        }}
        onPointerLeave={(e) => {
          e.stopPropagation()
          isDragged.current = false
        }}
        onPointerMove={() => {
          if (winRef.current == null) return
          if (isDragged.current) {
            const x = pointer.x * size.width / 2
            const y = pointer.y * size.height / 2

            winRef.current.position.x = x + diffCenterAndPointer.current.x
            winRef.current.position.y = y + diffCenterAndPointer.current.y
          }
        }}
        position={[props.x, props.y, props.z]}
        ref={winRef}
      >
        <planeGeometry args={[300, 200, 1,]} />
        <meshBasicMaterial color="white" />
        <mesh>
          <planeGeometry args={[300 - 10, 200 - 10, 1,]} />
          <meshBasicMaterial color="black" />
        </mesh>
      </mesh>
    </>
  )
}
