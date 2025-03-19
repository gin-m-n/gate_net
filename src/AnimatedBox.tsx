import { useFrame } from "@react-three/fiber"
import { useRef } from "react";
import { Mesh } from "three";


const size = 100

export const AnimatedBox = () => {
  const meshRef = useRef<Mesh>(null)

  useFrame(({ clock }) => {
    if (meshRef.current == null) return
    meshRef.current.position.y += 0.3
    console.log(meshRef.current.position.y);
    meshRef.current.rotation.y = clock.elapsedTime * 0.3
    meshRef.current.rotation.z = clock.elapsedTime * 0.2
  })

  return (
    <mesh ref={meshRef} onClick={(e) => {
      if (meshRef.current == null) return
      meshRef.current.position.x = e.x
      meshRef.current.position.y = e.y
    }}>
      <boxGeometry args={[size, size, size]} />
      <meshStandardMaterial color="royalblue" />
    </mesh>
  )
}
