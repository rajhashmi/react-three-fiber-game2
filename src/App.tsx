import './App.css'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Physics } from '@react-three/rapier'
import CustomCollider from './components/CustomColider'
import StartBlock from './components/StartBlock'
import Player from './components/Player'
import { KeyboardControls } from '@react-three/drei'
// import GameState from './Store/GameState'
function App() {
  // x: -0.019075738981704917, y: 0.9493480467304479, z: -2.8527836234722606
  // const startGame = GameState((state)=> state.start)
  // console.log(startGame);

  
  // console.log(startGame);
  
  return (
    <>
     <KeyboardControls
    map={ [
        { name: 'leftward', keys: [ 'ArrowLeft', 'KeyA' ] },
        { name: 'rightward', keys: [ 'ArrowRight', 'KeyD' ] },
    ] }   
    >
    <Canvas
      camera={{
        position: [0,0.8,-4]
      }}
    >
      <OrbitControls/>
      <Physics debug>
        <CustomCollider/>
        <StartBlock/>
        <Player/>
      </Physics>
    
    </Canvas>
    </KeyboardControls>
    </>
  )
}

export default App
