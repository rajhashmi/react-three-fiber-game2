import { RigidBody } from '@react-three/rapier'
import React, { useEffect, useRef, useState } from 'react'
import GameState from '../Store/GameState';
import { useFrame } from '@react-three/fiber';

function Level2() {
  const bodyRef = useRef();
  const setBlock = GameState((state)=> state.setLand)
  const removeBlock = GameState((state) => state.removeFirstLand);
  const blockInfoGetter = GameState((state) => state.getLand);

  const [renderKey, setRenderKey] = useState(1);
  const [blockColor, setBlockColor] = useState("");
  const [blockSize, setBlockSize] = useState(4);
  const [blockPosition, setBlockPosition] = useState(4);
  useEffect(()=>{
    if(bodyRef.current){
      removeBlock()
      setBlock(bodyRef.current)
    }
  }, [renderKey]);

  const changeBlock = () => {
    // const newSize = Math.random() * 1.5 + 1.5 ; 
    const blockInfo = blockInfoGetter();
    const lastBlockPosition = blockInfo[blockInfo.length - 1]?.translation()?.z || 0;
    
    // setBlockSize(newSize);
    console.log(lastBlockPosition);
    
    setBlockPosition(lastBlockPosition + 3.58);
    setBlockColor(getRandomColor());
  };


  
  const getRandomColor = () => {
    // Generate a random RGB color
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
  };


  useFrame(() => {
    if (bodyRef.current) {
      const bodyPosition = bodyRef.current.translation();
      if (bodyPosition.z < -5) {
       console.log("please remove this ");
       changeBlock();
       setRenderKey((prev) => prev + 1);
      }
    }

   
  });
  return (
    <RigidBody key={renderKey} ref={bodyRef} position={[0,-2.25,blockPosition]}>
    <mesh receiveShadow >
        <boxGeometry args={[4,0.5,4]}/>
        <meshStandardMaterial color={blockColor} />
    </mesh>
    </RigidBody>
  )
}

export default Level2