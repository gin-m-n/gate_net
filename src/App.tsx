import { Canvas, } from '@react-three/fiber'
import { AnimatedBox } from './AnimatedBox'
import { WindowManager } from './WindowManager'

function App() {
  return (
    <div id="canvas-container">
      <Canvas orthographic camera={{ position: [0, 0, 1000], far: 2000 }} >
        <AnimatedBox />
        <WindowManager />
      </Canvas>
    </div>
  )
}

export default App
