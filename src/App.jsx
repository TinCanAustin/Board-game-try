import './App.css'

import { Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber'
import { 
  OrbitControls,
  GizmoHelper,
  GizmoViewport,
  useGLTF
} from '@react-three/drei';

import { useControls } from 'leva';

function HexTile({ position = [0, 0, 0], scale = 0.0022}){
  const { scene } = useGLTF("/models/scene.gltf");
  return(
    <group position={position} scale={scale} rotation={[Math.PI / 1, 0.52, 0]}>
      <primitive object={scene.clone()} />
    </group>
  );
}

function HexBoard(){
  const tiles = [];

  const {row, col, spacing} = useControls({
    row: {
      value: 5,
      min: 2,
      max: 20,
      step: 1
    },
    col: {
      value: 5,
      min: 2,
      max: 20,
      step: 1
    },
    spacing: {
      value: 1,
      min: 1,
      max: 5,
      step: 1
    }
  });

  const xSpacing = spacing * Math.sqrt(3);
  const ySpacing = spacing * 1.5;

  for (let q=0; q < col; q++){
    for(let r=0; r < row; r++){
      const x = xSpacing * (q + r / 2);
      const z = ySpacing * r;
      tiles.push(<HexTile key={`${q},${r}`} position={[x, 0, z]} />);
    }
  }

  return <>{tiles}</>
}

function App() {

  return (
    <div id='canvas-container'>
      <Canvas>

        <GizmoHelper alignment="bottom-right">
          <GizmoViewport/>
        </GizmoHelper>

        <axesHelper args={[10]}/>
        <gridHelper args={[20, 20]}/>
        <OrbitControls/>
        
        <Suspense fallback={null}>
          <HexBoard/>
        </Suspense>

        <ambientLight color={0xfcfcfc} intensity={1} />
      </Canvas>
    </div>
  )
}

export default App