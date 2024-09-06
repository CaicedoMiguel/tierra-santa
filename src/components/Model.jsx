import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Model component that loads and animates a 3D model.
 *
 * This component uses the `useGLTF` hook to load a GLTF model and applies 
 * material properties to the model's mesh. It also animates the model by
 * adjusting its position and rotation over time.
 *
 * @component
 * @example
 * return <Model />;
 */
export default function Model() {
  // Reference to the 3D model
  const modelRef = useRef();

  // Load the GLTF model using the `useGLTF` hook
  const { scene } = useGLTF('../../public/models/Low_Poly_Forest.glb');

  // Traverse through all children of the model's scene and adjust material properties
  scene.traverse((child) => {
    if (child.isMesh) {
      child.material.metalness = 0.9; // Set the metalness of the material
      child.material.roughness = 0.2; // Set the roughness of the material
      child.material.envMapIntensity = 1; // Set the environment map intensity
    }
  });

  // Animation loop that updates the model's position and rotation
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    // Animate the vertical position of the model
    modelRef.current.position.y = Math.cos(t * 0.5) * 0.5;
    // Apply a smooth rotation to the model
    modelRef.current.rotation.y += 0.005;
  });

  // Render the model using a primitive object with specified scale and position
  return <primitive ref={modelRef} object={scene} scale={0.5} position={[0, 0, 0]} />;
}