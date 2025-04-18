import { useFrame } from "@react-three/fiber"
import { useRef } from "react";
import { Mesh } from "three";

const BOX_SIZE = 100
const MOVING_DURATION_SEC = 3
const REST_DURATION_SEC = 1

function easeInOutBack(x: number): number {
  const c1 = 1.70158;
  const c2 = c1 * 1.525;

  return x < 0.5
    ? (Math.pow(2 * x, 2) * ((c2 + 1) * 2 * x - c2)) / 2
    : (Math.pow(2 * x - 2, 2) * ((c2 + 1) * (x * 2 - 2) + c2) + 2) / 2;
}

export const AnimatedBox = () => {
  const isMoving = useRef(true)
  const lastToggleTime = useRef(-1)
  const meshRef = useRef<Mesh>(null)


  useFrame(({ clock }) => {
    if (meshRef.current == null) return

    if (lastToggleTime.current === -1) {
      lastToggleTime.current = clock.elapsedTime
    }

    const delta = clock.elapsedTime - lastToggleTime.current;
    if (isMoving.current) {
      const rate = (clock.elapsedTime - lastToggleTime.current) / MOVING_DURATION_SEC
      const rateValue = easeInOutBack(rate)

      meshRef.current.rotation.x = Math.PI / 180 * 30
      meshRef.current.rotation.y = Math.PI / 180 * 45 + 2 * Math.PI * rateValue
      meshRef.current.rotation.z = 2 * Math.PI * rateValue

      if (delta >= MOVING_DURATION_SEC) {
        isMoving.current = false
        lastToggleTime.current = clock.elapsedTime
      }
    } else {
      if (delta >= REST_DURATION_SEC) {
        isMoving.current = true
        lastToggleTime.current = clock.elapsedTime
      }
    }
  })


  return (
    <mesh
      position={[0, 0, -100]}
      ref={meshRef}>
      <boxGeometry args={[BOX_SIZE, BOX_SIZE, BOX_SIZE]} />
      <meshBasicMaterial color="royalblue" />
    </mesh>
  )
}
