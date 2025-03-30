import { Text } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber"
import { useRef } from "react";
import { Mesh } from "three";
import { CloseButton } from "./CloseButton";

const padding = 2
const rectSize = {
  w: 300,
  h: 200,
}
const headerSize = {
  w: rectSize.w - padding * 2,
  h: 30
}
const bodySize = {
  w: rectSize.w - padding * 2,
  h: rectSize.h - headerSize.h - padding * 2
}
const fontSize = 16

type Props = {
  position: {
    x: number,
    y: number,
    z: number,
  }
  calcZ: () => number
  content: string
  onClose: () => void
}

export const Win = (props: Props) => {
  const isDragged = useRef<boolean>(false)
  const diffCenterAndPointer = useRef<{ x: number, y: number }>({ x: 0, y: 0 })

  const winRef = useRef<Mesh>(null)
  const { size, pointer } = useThree()

  useFrame(() => {
    if (winRef.current == null) return
    if (isDragged.current) {
      const x = pointer.x * size.width / 2
      const y = pointer.y * size.height / 2

      winRef.current.position.x = x + diffCenterAndPointer.current.x
      winRef.current.position.y = y + diffCenterAndPointer.current.y
    }
  })

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
        position={[props.position.x, props.position.y, props.position.z]}
        ref={winRef}
      >
        <planeGeometry args={[rectSize.w, rectSize.h, 1]} />
        <meshBasicMaterial color="white" />

        {/* Header */}
        <mesh position={[0, rectSize.h / 2 - headerSize.h / 2 - padding, 0]}>
          <planeGeometry
            args={[headerSize.w, headerSize.h, 1]}
          />
          <meshBasicMaterial color="blue" />
          <Text
            position={[-rectSize.w / 2 + padding * 2, 0, 0]}
            font='/NotoSansJP-Regular.ttf'
            anchorX="left"
            fontSize={20}
            color='white'
          >
            タイトル
          </Text>
          <CloseButton size={10} position={[rectSize.w / 2 - 10 - padding - 5, 0, 0]} onClick={props.onClose} />
        </mesh>

        {/* Body */}
        <mesh position={[0, rectSize.h / 2 - bodySize.h / 2 - padding - headerSize.h - padding / 2, 0]}>
          <planeGeometry args={[bodySize.w, bodySize.h, 1]} />
          <meshBasicMaterial color="black" />
          <Text
            position={[
              -(rectSize.w / 2) + padding * 2,
              bodySize.h / 2 - padding * 2,
              0
            ]}
            font='/NotoSansJP-Regular.ttf'
            fontSize={fontSize}
            color='white'
            anchorX="left"
            anchorY="top"
            overflowWrap="break-word"
            maxWidth={rectSize.w - padding * 4}
          >
            {props.content}
          </Text>
        </mesh>
      </mesh >
    </>
  )
}
