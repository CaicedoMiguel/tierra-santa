import React, { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, useGLTF, Sky } from '@react-three/drei';
import * as THREE from 'three';

/**
 * Model component that loads, renders, and animates a 3D model.
 *
 * This component uses the `useGLTF` hook to load a GLTF model, applies custom 
 * material properties, and supports user interaction for rotation. It also 
 * animates the model's position and rotation.
 *
 * @component
 */
function Model() {
  const modelRef = useRef();
  const { scene } = useGLTF('/models/Low_Poly_Forest.glb');
  const [isDragging, setIsDragging] = useState(false);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  // Modify material properties of the model
  scene.traverse((child) => {
    if (child.isMesh) {
      const originalMaterial = child.material.clone();
      child.material = new THREE.MeshPhongMaterial({
        map: originalMaterial.map,
        color: originalMaterial.color,
        flatShading: true,
        shininess: 50,
        specular: new THREE.Color(0x111111)
      });
      child.material.needsUpdate = true;
    }
  });

  // Handle mouse drag to rotate the model
  useEffect(() => {
    const handleMouseDown = () => setIsDragging(true);
    const handleMouseUp = () => setIsDragging(false);
    const handleMouseMove = (event) => {
      if (isDragging) {
        setRotation((prev) => ({
          x: prev.x + event.movementY * 0.01,
          y: prev.y + event.movementX * 0.01
        }));
      }
    };

    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isDragging]);

  // Animate the model's position and rotation
  let direction = 1;
  let positionX = 0;

  useFrame(({ clock }) => {
    if (positionX > 3 || positionX < -3) {
      direction *= -1;
    }
    const t = clock.getElapsedTime();
    if (modelRef.current) {
      positionX += 0.01 * direction;
      modelRef.current.position.x = positionX; // Cosine animation on X-axis
      modelRef.current.position.y = Math.sin(t * 0.8) * 1.5; // Sine animation on Y-axis
      modelRef.current.rotation.x = rotation.x;
      modelRef.current.rotation.y = rotation.y;
    }
  });

  return <primitive ref={modelRef} object={scene} scale={2} position={[0, 0, 0]} />;
}

/**
 * SkyBackground component that renders a sky background in the scene.
 *
 * This component uses the `Sky` component from `@react-three/drei` to create
 * a sky with specified properties.
 *
 * @component
 */
function SkyBackground() {
  return (
    <Sky
      distance={100}
      sunPosition={[0, 1, 0]}
      inclination={0.6}
      azimuth={0.1}
    />
  );
}

/**
 * ModelViewer component that sets up the 3D scene with camera, lighting, 
 * and background.
 *
 * This component uses the `Canvas` component from `@react-three/fiber` to 
 * render the 3D scene. It includes ambient light, directional light, and 
 * an environment preset.
 *
 * @component
 */
export default function ModelViewer() {
  return (
    <Canvas
      camera={{ position: [0, 10, 20], fov: 50 }}
      style={{ width: '100vw', height: '100vh' }}
    >
      <SkyBackground />
      <ambientLight intensity={0.5} />
      <directionalLight intensity={0.8} position={[5, 5, 5]} castShadow />
      <Suspense fallback={null}>
        <Model />
        <Environment preset="sunset" />
      </Suspense>
    </Canvas>
  );
}

// Preload the GLTF model for improved performance
useGLTF.preload('/models/Low_Poly_Forest.glb');