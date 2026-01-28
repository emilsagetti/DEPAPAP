import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, PerspectiveCamera } from '@react-three/drei';

const Diamond = () => {
    const meshRef = useRef();

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        meshRef.current.rotation.y = t * 0.1;
        meshRef.current.rotation.z = Math.sin(t * 0.2) * 0.05;
    });

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
            <mesh ref={meshRef}>
                <icosahedronGeometry args={[1.8, 5]} />
                <meshPhysicalMaterial
                    color="#ffffff"
                    roughness={0}
                    metalness={0.1}
                    transmission={0.95}
                    thickness={2}
                    ior={2.4}
                    dispersion={0.2}
                    clearcoat={1}
                    attenuationDistance={5}
                />
            </mesh>
        </Float>
    );
};

const Scene3D = () => {
    return (
        <div className="fixed inset-0 -z-10 pointer-events-none">
            <Canvas gl={{ antialias: true, alpha: true }}>
                <PerspectiveCamera makeDefault position={[0, 0, 6]} />
                <Environment preset="studio" />
                <ambientLight intensity={1} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2.5} color="#fff" />
                <pointLight position={[-10, -10, -10]} intensity={2} color="#1E40AF" /> {/* Blue Light */}
                <Diamond />
            </Canvas>
        </div>
    );
};

export default Scene3D;
