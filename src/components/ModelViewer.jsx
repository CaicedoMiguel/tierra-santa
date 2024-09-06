import React, { useRef, useState, useEffect, Suspense } from 'react'; // Import React, useRef, useState, useEffect, and Suspense
import { Canvas, useFrame } from '@react-three/fiber'; // Import Canvas and useFrame from @react-three/fiber
import { Environment, useGLTF, Sky } from '@react-three/drei'; // Import Environment, useGLTF, and Sky from @react-three/drei
import * as THREE from 'three'; // Import all of Three.js functionalities

/**
 * Model Component
 * 
 * This component loads a 3D model, applies custom material properties, and handles user interactions
 * for rotating the model. It also animates the model's position and rotation.
 * 
 * @returns {JSX.Element} The 3D model rendered in the scene.
 */
function Model() {
  const modelRef = useRef(); // Create a reference to the 3D model
  const { scene } = useGLTF('/models/Low_Poly_Forest.glb'); // Load the GLTF model from the specified path
  const [isDragging, setIsDragging] = useState(false); // State to track dragging state
  const [rotation, setRotation] = useState({ x: 0, y: 0 }); // State to track model rotation

  // Change the material of the model
  scene.traverse((child) => {
    if (child.isMesh) { // Check if the child is a mesh
      const originalMaterial = child.material.clone(); // Clone the original material
      // Create a new MeshPhongMaterial with customized properties
      child.material = new THREE.MeshPhongMaterial({
        map: originalMaterial.map, // Use the original texture map
        color: originalMaterial.color, // Use the original color
        flatShading: true, // Enable flat shading
        shininess: 50, // Set shininess
        specular: new THREE.Color(0x111111) // Set specular color
      });
      child.material.needsUpdate = true; // Mark the material as needing an update
    }
  });

  // Detect mouse drag to rotate the model
  useEffect(() => {
    const handleMouseDown = () => setIsDragging(true); // Set dragging state to true
    const handleMouseUp = () => setIsDragging(false); // Set dragging state to false
    const handleMouseMove = (event) => {
      if (isDragging) { // Update rotation if dragging
        setRotation((prev) => ({
          x: prev.x + event.movementY * 0.01, // Update X rotation
          y: prev.y + event.movementX * 0.01 // Update Y rotation
        }));
      }
    };

    // Add event listeners for mouse actions
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mousemove', handleMouseMove);

    // Clean up event listeners
    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isDragging]);

  // Animate the model's position and rotation
  let direction = 1; // Direction for horizontal movement
  let positionX = 0; // Initial horizontal position

  useFrame(({ clock }) => {
    if (positionX > 3 || positionX < -3) {
      direction *= -1; // Reverse direction when limits are reached
    }
    const t = clock.getElapsedTime(); // Get the elapsed time since the clock started
    if (modelRef.current) {
      positionX += 0.01 * direction; // Update horizontal position
      modelRef.current.position.x = positionX; // Apply horizontal position
      modelRef.current.position.y = Math.sin(t * 0.8) * 1.5; // Apply vertical oscillation
      modelRef.current.rotation.x = rotation.x; // Apply X rotation
      modelRef.current.rotation.y = rotation.y; // Apply Y rotation
    }
  });

  // Render the model with specified scale and position
  return <primitive ref={modelRef} object={scene} scale={2} position={[0, 0, 0]} />;
}

/**
 * SkyBackground Component
 * 
 * This component sets up the background sky with specific properties.
 * 
 * @returns {JSX.Element} The sky background element.
 */
function SkyBackground() {
  return (
    <Sky
      distance={100} // Distance to the sky
      sunPosition={[0, 1, 0]} // Position of the sun
      inclination={0.6} // Inclination of the sun
      azimuth={0.1} // Azimuth of the sun
    />
  );
}

/**
 * ModelViewer Component
 * 
 * This component sets up the scene with the camera, lighting, and 3D model.
 * 
 * @returns {JSX.Element} The Canvas element containing the 3D scene.
 */
export default function ModelViewer() {
  return (
    <Canvas
      camera={{ position: [0, 10, 20], fov: 50 }} // Set up the camera position and field of view
      style={{ width: '100vw', height: '100vh' }} // Set the Canvas size to fill the viewport
    >
      <SkyBackground /> // Render the sky background
      <ambientLight intensity={0.5} /> // Add ambient light
      <directionalLight intensity={0.8} position={[5, 5, 5]} castShadow /> // Add directional light with shadows
      <Suspense fallback={null}> // Suspense to handle lazy loading of the model
        <Model /> // Render the 3D model
        <Environment preset="sunset" /> // Add an environment with sunset preset
      </Suspense>
    </Canvas>
  );
}

// Preload the GLTF model to improve loading performance
useGLTF.preload('/models/Low_Poly_Forest.glb');
