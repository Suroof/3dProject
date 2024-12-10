import React from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, OrbitControls } from '@react-three/drei';

function Model() {
const { scene } = useGLTF('/assets/portal.glb');
return <primitive object={scene} />;
}

export default function NewComponent() {
console.log('Navigated to NewComponent');
return (
<Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
<ambientLight intensity={0.5} />
<directionalLight position={[0, 5, 5]} />
<Model />
<OrbitControls />
</Canvas>
);
}