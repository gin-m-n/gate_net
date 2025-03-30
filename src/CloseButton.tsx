type Props = {
  size: number
  position: [x: number, y: number, z: number]
  onClick?: () => void
}
export const CloseButton = ({ position, size, onClick }: Props) => {
  return (
    <mesh position={position} onClick={onClick}>
      <circleGeometry args={[size, 32]} />
      <meshBasicMaterial color="white" />
    </mesh>
  )
}
