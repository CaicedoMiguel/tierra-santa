import React, { useRef } from 'react'; // Import React and useRef hook
import { useGLTF } from '@react-three/drei'; // Import useGLTF for loading GLTF models
import { useFrame } from '@react-three/fiber'; // Import useFrame for animation updates
import * as THREE from 'three'; // Import all of Three.js functionalities

/**
 * Model Component
 * 
 * This component loads and renders a 3D model in a Three.js scene. It applies material properties
 * to the model and animates it using the useFrame hook.
 * 
 * @returns {JSX.Element} The 3D model rendered in the scene.
 */
export default function Model() {
  // Create a reference to the model object
  const modelRef = useRef();

  // Load the GLTF model from the specified path
  const { scene } = useGLTF('../../public/models/Low_Poly_Forest.glb');

  // Traverse through the model's scene graph to apply custom material properties
  scene.traverse((child) => {
    if (child.isMesh) { // Check if the child is a mesh
      // Set material properties for better visual effect
      child.material.metalness = 0.9; // Set metalness to 0.9 (more metallic)
      child.material.roughness = 0.2; // Set roughness to 0.2 (less rough, smoother surface)
      child.material.envMapIntensity = 1; // Set environment map intensity to 1
    }
  });

  // Use the useFrame hook to update the model's properties on each frame
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime(); // Get the elapsed time since the clock started

    // Update the model's position and rotation
    modelRef.current.position.y = Math.cos(t * 0.5) * 0.5; // Apply a vertical oscillation based on a cosine function
    modelRef.current.rotation.y += 0.005; // Apply a continuous rotation around the Y-axis
  });

  // Return the primitive component with the loaded model
  // Apply a scale of 0.5 and set initial position to [0, 0, 0]
  return <primitive ref={modelRef} object={scene} scale={0.5} position={[0, 0, 0]} />;
}
