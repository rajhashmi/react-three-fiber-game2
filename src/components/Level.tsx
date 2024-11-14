import { RigidBody } from "@react-three/rapier";
import { BoxGeometry, MeshNormalMaterial } from "three";
import GameState from "../Store/GameState";
import { useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from 'three'
const Level = () => {
  const rigidBodyRef = useRef();
  const setLand = GameState((state) => state.setLand);
  const getLand = GameState((state) => state.getLand);
  const getPlayerFromStore = GameState(state => state.getPlayerRef);
  const removeFirstLand = GameState((state)=> state.removeFirstLand);
  const geometry = new BoxGeometry(1.5, 0.2, 2.5);
  const material = new MeshNormalMaterial();
  
  useEffect(() => {
      if (rigidBodyRef.current) {
      setLand(rigidBodyRef.current);
     
      
    }
  }, [setLand]);

  useFrame(()=>{
    const getLandData = getLand();
    const playerRef = getPlayerFromStore();
    
    
    if(getLandData.length && playerRef){
      const firstLand = getLandData[0];

      // removing part
      if(firstLand){
        const firstLandPosition = firstLand.translation();
        
        console.log(firstLand);
        
        

      }

      const currentPlayerPosition = playerRef.translation();
      firstLand.applyImpulse({x:0,y:0, z: - 0.4});
      playerRef.setTranslation({ x: currentPlayerPosition.x,y: currentPlayerPosition.y, z: 0 }, true);
      
      for(let i = 0; i < getLandData.length; i++){
        if(i===0) continue;
        const previousLandPosition = getLandData[i -1].translation();
        const newPosition = new THREE.Vector3(previousLandPosition.x, previousLandPosition.y, previousLandPosition.z + 3.18);
        getLandData[i].setTranslation(newPosition, true)
        

      }
      
    }
    
  })

  return (
    <RigidBody ref={rigidBodyRef} position={[0, 0, 3.7]} colliders="cuboid">
      <mesh  geometry={geometry} material={material} />
    </RigidBody>
  );
};

export default Level;
