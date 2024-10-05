// src/components/GlobeScene.js
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Loader, useGLTF } from '@react-three/drei';

// Componente que carga el modelo GLB del globo
function GlobeModel() {
  const { scene } = useGLTF('/path/to/your/model.glb'); // Asegúrate de reemplazar con la ruta correcta
  return <primitive object={scene} scale={0.5} />;
}

const GlobeScene = () => {
  return (
    <div style={{ height: '500px', width: '100%' }}> {/* Ajusta el tamaño del canvas aquí */}
      <Canvas>
        {/* Luces para iluminar el modelo 3D */}
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />
        {/* Suspense para manejar la carga del modelo */}
        <Suspense fallback={null}>
          <GlobeModel />
        </Suspense>
        {/* Controles para rotar y hacer zoom en el modelo */}
        <OrbitControls />
      </Canvas>
      {/* Loader que aparece mientras se carga el modelo */}
      <Loader />
    </div>
  );
};

export default GlobeScene;
