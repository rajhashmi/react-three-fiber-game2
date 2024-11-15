import { RigidBody } from '@react-three/rapier';
import { useEffect, useRef, useState } from 'react';
import GameState from '../Store/GameState';
import { useFrame } from '@react-three/fiber';

function Level1() {
  const bodyRef = useRef(null);
  const setBlock = GameState((state) => state.setLand);
  const removeBlock = GameState((state) => state.removeFirstLand);
  const blockInfoGetter = GameState((state) => state.getLand);
  const [renderKey, setRenderKey] = useState(1);
  const [blockColor, setBlockColor] = useState("");
  const [blockPosition, setBlockPosition] = useState(0);
  
  useEffect(() => {
    if (bodyRef.current) {
      removeBlock();
      setBlock(bodyRef.current);
    }
  }, [renderKey]);

  const getRandomColor = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
  };

  const changeBlock = () => {
    const blockInfo = blockInfoGetter();
    const lastBlockPosition = blockInfo[blockInfo.length - 1]?.translation()?.z || 0;

    setBlockPosition(lastBlockPosition + 3.58);
    setBlockColor(getRandomColor());
  };

  useFrame(() => {
    if (bodyRef.current) {
      const bodyPosition = bodyRef.current.translation(); // Corrected usage
      if (bodyPosition.z < -5) {
        console.log("please remove this ");
        changeBlock();
        setRenderKey((prev) => prev + 1);
      }
    }
  });

  return (
    <RigidBody key={renderKey} ref={bodyRef} position={[0, -2.25, blockPosition]}>
      <mesh receiveShadow>
        <boxGeometry args={[4, 0.5, 4]} />
        <meshStandardMaterial color={blockColor} />
      </mesh>
    </RigidBody>
  );
}

export default Level1;
