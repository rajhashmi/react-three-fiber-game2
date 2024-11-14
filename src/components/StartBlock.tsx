// import { StyleSheet, Text, View } from 'react-native'
import { RigidBody } from '@react-three/rapier'
// import useGameStore from '@/store/Game';  
import GameState from '../Store/GameState';
import { useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
// import React, { useEffect, useRef } from 'react'

const StartBlock = () => {
    const ref = useRef();
    const savedLand = GameState((state)=> state.setLand);  // need to check this if the rigit is saving in global state
    const getData = GameState((state)=> state.getLand);
    useEffect(()=>{
        if(ref.current){
            savedLand(ref.current)
            console.log(getData());
            
        }
    },[])
    
  return (
    <RigidBody ref={ref} position={[0,-2.4,0.5]}  colliders="cuboid" type="dynamic">
    <mesh >
        <boxGeometry  args={[4,0.2,4]}/>
        <meshBasicMaterial/>
    </mesh>
    </RigidBody>
  )
}

export default StartBlock

