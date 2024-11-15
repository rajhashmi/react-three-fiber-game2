import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { Canvas } from '@react-three/fiber'


ReactDOM.createRoot(document.getElementById('root')!).render(
    <Canvas shadows
      camera={{
        position: [0,0.8,-4]
      }}
    >
    <App />
    </Canvas>
)
