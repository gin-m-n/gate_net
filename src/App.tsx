import { Canvas, } from '@react-three/fiber'
import { AnimatedBox } from './AnimatedBox'
import { WindowManager } from './WindowManager'


const toRad = (deg: number) => deg * Math.PI / 180
const fov = 60
const dist = (window.innerHeight / 2) / Math.tan(toRad(fov / 2))

function App() {
  return (
    <div id="canvas-container">
      <Canvas camera={{ fov: fov, position: [0, 0, dist], far: 10000 }} >
        <AnimatedBox />
        <WindowManager />
      </Canvas>
    </div>
  )
}

export default App
