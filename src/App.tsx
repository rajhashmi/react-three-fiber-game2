import './App.css';
import { useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Physics } from '@react-three/rapier';
import CustomCollider from './components/CustomColider';
import Player from './components/Player';
import { KeyboardControls } from '@react-three/drei';
import Level from './components/Level1';
import Level2 from './components/Level2';
import Level3 from './components/Level3';
import GameState from './Store/GameState';
import { useState } from 'react';

function App() {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const gamePhase = GameState((state) => state.phase);

  useFrame(() => {
    if (gamePhase === 'playing') {
      setIsGameStarted(true);
    }
  });

  return (
    <>
      <KeyboardControls
        map={[
          { name: 'leftward', keys: ['ArrowLeft', 'KeyA'] },
          { name: 'rightward', keys: ['ArrowRight', 'KeyD'] },
        ]}
      >
        <directionalLight
          position={[1, 1, 0]}
          intensity={1}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        
        <OrbitControls />
        <Physics>
          <CustomCollider />
          {isGameStarted && (
            <>
              <Level2 />
              <Level3 />
            </>
          )}
          <Level />
          <Player />
        </Physics>
        <mesh rotation={[-1.5, 0, 0]} position={[0, -5, 0]}>
          <planeGeometry args={[10, 10, 10]} />
          <meshNormalMaterial />
        </mesh>
      </KeyboardControls>
    </>
  );
}

export default App;
