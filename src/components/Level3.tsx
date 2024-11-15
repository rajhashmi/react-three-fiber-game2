import { RigidBody } from "@react-three/rapier";
import { useEffect, useRef, useState } from "react";
import GameState from "../Store/GameState";
import { useFrame } from "@react-three/fiber";

function Level3() {
  const bodyRef = useRef();
  const setBlock = GameState((state) => state.setLand);
  const removeBlock = GameState((state) => state.removeFirstLand);
  const blockInfoGetter = GameState((state) => state.getLand);
  const [renderKey, setRenderKey] = useState(1);
  const [blockColor, setBlockColor] = useState("");
  const [blockSize, setBlockSize] = useState(4);
  const [blockPosition, setBlockPosition] = useState(8);

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

    setBlockPosition(lastBlockPosition +  3.58);
    setBlockColor(getRandomColor());  
  };

  useFrame(() => {
    const blockInfo = blockInfoGetter();
    if (bodyRef.current) {
      const bodyPosition = bodyRef.current.translation();
      if (bodyPosition.z < -5) {
        changeBlock();
        setRenderKey((prev) => prev + 1);  
      }
    }

    const lastLand = blockInfo[blockInfo.length - 1];
    if (lastLand) {
      lastLand.applyImpulse({ x: 0, y: 0, z: -2.7 });
    }
  });

  return (
    <>
      <RigidBody
        ref={bodyRef}
        key={renderKey}
        position={[0, -2.25, blockPosition]}
      >
        <mesh receiveShadow>
          <boxGeometry args={[blockSize, 0.5, 4]} />
          <meshStandardMaterial color={blockColor} />
        </mesh>
      </RigidBody>
    </>
  );
}

export default Level3;
