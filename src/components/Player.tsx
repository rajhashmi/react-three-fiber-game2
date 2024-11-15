import { useFrame } from '@react-three/fiber';
import { RigidBody } from '@react-three/rapier';
import { useKeyboardControls } from "@react-three/drei";
import GameState from '../Store/GameState';
import { useEffect, useRef, useState } from 'react';

const Player = () => {
  const body = useRef(null);

  const [subscribeKeys, getKeys] = useKeyboardControls();
  const [isGameStarted, setIsGameStarted] = useState(false);

  const startGame = GameState((state) => state.start);
  const setPlayerRef = GameState((state) => state.setPlayerRef);

  useEffect(() => {
    if (body.current) {
      setPlayerRef(body.current); 
    }
  }, [setPlayerRef]);
  useEffect(() => {
    subscribeKeys((key) => {
      console.log(`Key pressed: ${key}`);
    });
  }, [subscribeKeys]);

  useFrame((_, delta) => {
    if (body.current) {
      const playerTranslation = body.current.translation(); // Get the current position
      body.current.setTranslation({ x: playerTranslation.x, y: playerTranslation.y, z: 0 });

      const { leftward, rightward } = getKeys();
      const impulse = { x: 0, y: 0, z: 0 };
      const impulseStrength = 0.29 * delta;

      if (leftward) {
        impulse.x += impulseStrength;
        if (!isGameStarted) {
          setIsGameStarted(true);
          startGame();
        }
      }

      if (rightward) {
        if (!isGameStarted) {
          setIsGameStarted(true);
          startGame();
        }
        impulse.x -= impulseStrength;
      }

      body.current.applyImpulse(impulse);
    }
  });

  return (
    <>
      <RigidBody
        ref={body}
        linearDamping={0.5}
        angularDamping={0.5}
        position={[0, 0, -0.3]}
        colliders="cuboid"
        type="dynamic"
        canSleep={false}
      >
        <mesh castShadow>
          <boxGeometry args={[0.3, 0.3, 0.3]} />
          <meshNormalMaterial />
        </mesh>
      </RigidBody>
    </>
  );
};

export default Player;
