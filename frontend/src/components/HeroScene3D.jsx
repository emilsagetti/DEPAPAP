import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

// --- GEOMETRIES ---

// Classic Flat Shield Shape
const ShieldShape = () => {
    const shape = new THREE.Shape();
    const w = 3.2;
    const h = 4.5;

    // Symmetrical Shield Outline
    shape.moveTo(0, h);           // Top Center
    shape.lineTo(w, h);           // Top Right
    shape.lineTo(w, 0);           // Right Vertical
    shape.quadraticCurveTo(w, -h * 1.2, 0, -h * 1.6); // Curve to tip
    shape.quadraticCurveTo(-w, -h * 1.2, -w, 0);      // Curve from tip
    shape.lineTo(-w, h);          // Left Vertical
    shape.lineTo(0, h);           // Close loop

    return shape;
};

// Checkmark Shape
const CheckmarkShape = () => {
    const shape = new THREE.Shape();

    // Draw Checkmark
    shape.moveTo(-1.5, 0);
    shape.lineTo(-0.5, -1);
    shape.lineTo(2, 2);
    shape.lineTo(1.5, 2.5);
    shape.lineTo(-0.5, 0);
    shape.lineTo(-1, 0.5);

    return shape;
};

const ClassicShield = (props) => {
    const meshRef = useRef();
    // Use a Set to store all shader instances (Shield, Check1, Check2)
    const materialsRef = useRef(new Set());

    // Animation state
    const revealProgress = useRef(0);

    const shieldSetting = useMemo(() => ({
        steps: 1,
        depth: 0.4,
        bevelEnabled: true,
        bevelThickness: 0.2,
        bevelSize: 0.1,
        bevelSegments: 3,
        curveSegments: 24
    }), []);

    const checkSetting = useMemo(() => ({
        steps: 1,
        depth: 0.1,
        bevelEnabled: true,
        bevelThickness: 0.05,
        bevelSize: 0.05,
        bevelSegments: 2
    }), []);

    const shieldShape = useMemo(() => ShieldShape(), []);
    const checkShape = useMemo(() => CheckmarkShape(), []);

    // SHADER INJECTION
    const onBeforeCompile = useMemo(() => (shader) => {
        // Add uniforms
        shader.uniforms.uProgress = { value: -1 }; // Start fully hidden
        shader.uniforms.uTime = { value: 0 };

        // Add this shader instance to our Set
        materialsRef.current.add(shader);

        // Vertex definitions
        shader.vertexShader = `
            varying vec3 vPos;
            ${shader.vertexShader}
        `.replace(
            '#include <begin_vertex>',
            `
            #include <begin_vertex>
            vPos = transformed;
            `
        );

        // Fragment logic
        shader.fragmentShader = `
            varying vec3 vPos;
            uniform float uProgress;
            uniform float uTime;
            
            float grid(vec3 pos, float scale) {
                vec2 coord = pos.xy * scale;
                vec2 grid = abs(fract(coord - 0.5) - 0.5) / fwidth(coord);
                float line = min(grid.x, grid.y);
                return 1.0 - min(line, 1.0);
            }

            ${shader.fragmentShader}
        `.replace(
            '#include <dithering_fragment>',
            `
            #include <dithering_fragment>
            
            // Map progress to local Y (-4.5 to 4.5 is rough shield height)
            float limit = mix(-6.0, 6.0, uProgress);
            
            // SCANLINE GLOW (The "Printer" Beam)
            float scanlineWidth = 0.3;
            float dist = limit - vPos.y;
            // Hot white core
            float beam = smoothstep(0.0, 0.05, dist) - smoothstep(0.05, 0.1, dist);
            // Cyan glow tail
            float glow = smoothstep(0.0, scanlineWidth, dist) - smoothstep(scanlineWidth, scanlineWidth * 2.5, dist);
            glow = max(0.0, glow);
            
            // HOLOGRAM EFFECT (Unbuilt part)
            if (vPos.y > limit) {
                // Fade out top
                if (vPos.y > limit + 2.0) discard;

                float g = grid(vPos, 8.0); // Tighter grid
                
                // Holographic flicker
                float flicker = 0.8 + 0.2 * sin(uTime * 20.0);
                float alpha = mix(0.0, 0.15, g) * flicker;
                
                // Fade alpha with distance from beam
                alpha *= (1.0 - (vPos.y - limit) / 2.0);
                
                vec3 holoColor = vec3(0.0, 0.8, 1.0);
                gl_FragColor = vec4(holoColor, alpha);
            } else {
                // SOLID PART
                // Add the beam glow to the physical material color
                gl_FragColor.rgb += vec3(0.8, 1.0, 1.0) * beam * 4.0; // White hot beam
                gl_FragColor.rgb += vec3(0.0, 0.6, 1.0) * glow * 1.5; // Cyan glow
            }
            `
        );
    }, []);

    useFrame((state, delta) => {
        const time = state.clock.getElapsedTime();

        // 1. Reveal Animation (Slower, more dramatic Lerp)
        revealProgress.current = THREE.MathUtils.lerp(revealProgress.current, 1.2, delta * 0.8);

        // 2. Premium Rotation Logic
        if (meshRef.current) {
            // Spin fast initially (during reveal), then settle to idle
            // 1.0 is full reveal. We want extra spin while progress < 1.0
            const isRevealing = revealProgress.current < 1.0;
            const spinSpeed = isRevealing ? 1.0 : 0.1; // Fast spin -> Slow idle

            // Smoothly interpolate rotation speed could be complex, 
            // instead we combine a base rotation with a "reveal spin"

            // Base idle rotation
            const idleRotation = time * 0.15;

            // Entry spin (decays as progress increases)
            // (1.0 - progress) is large at start, 0 at end
            const entrySpin = Math.max(0, (1.0 - revealProgress.current) * 2.0);

            meshRef.current.rotation.y = idleRotation - entrySpin;

            // Levitating Bobbing (Sine wave)
            meshRef.current.position.y = Math.sin(time * 0.5) * 0.15;

            // Subtle tilt
            meshRef.current.rotation.z = Math.sin(time * 0.25) * 0.05;
            meshRef.current.rotation.x = Math.sin(time * 0.3) * 0.05;
        }

        // Update ALL shaders (Shield + Checkmarks)
        materialsRef.current.forEach(shader => {
            shader.uniforms.uProgress.value = revealProgress.current;
            shader.uniforms.uTime.value = time;
        });
    });

    return (
        <group ref={meshRef} {...props}>
            {/* Shield Base */}
            <mesh position={[0, 0, -0.2]}>
                <extrudeGeometry args={[shieldShape, shieldSetting]} />
                <meshPhysicalMaterial
                    onBeforeCompile={onBeforeCompile}
                    color="#011A2C"
                    roughness={0.15}
                    metalness={0.95}
                    clearcoat={1.0}
                    clearcoatRoughness={0.05}
                    emissive="#023A55"
                    emissiveIntensity={0.3}
                    side={THREE.DoubleSide}
                />
            </mesh>

            {/* FRONT Checkmark */}
            <mesh position={[0, -0.5, 0.44]} rotation={[0, 0, 0]} scale={1.2}>
                <extrudeGeometry args={[checkShape, checkSetting]} />
                <meshPhysicalMaterial
                    onBeforeCompile={onBeforeCompile}
                    color="#ffffff"
                    roughness={0.1}
                    metalness={0.8}
                    emissive="#ffffff"
                    emissiveIntensity={0.5}
                />
            </mesh>

            {/* BACK Checkmark */}
            <mesh position={[0, -0.5, -0.44]} rotation={[0, Math.PI, 0]} scale={1.2}>
                <extrudeGeometry args={[checkShape, checkSetting]} />
                <meshPhysicalMaterial
                    onBeforeCompile={onBeforeCompile}
                    color="#ffffff"
                    roughness={0.1}
                    metalness={0.8}
                    emissive="#ffffff"
                    emissiveIntensity={0.5}
                />
            </mesh>
        </group>
    );
};

const HeroScene3D = () => {
    return (
        <div className="w-full h-full relative cursor-pointer" >
            {/* Added fade-in canvas to hide init flash */}
            <Canvas shadows dpr={[1, 2]} className="animate-fade-in-slow">
                <PerspectiveCamera makeDefault position={[0, 0, 16]} fov={40} />

                <ambientLight intensity={0.5} />
                <spotLight position={[20, 20, 20]} angle={0.3} penumbra={1} intensity={2} castShadow />
                <pointLight position={[-10, 0, -10]} intensity={1.5} color="#00C2FF" distance={30} />
                <pointLight position={[5, -10, 5]} intensity={1} color="#ffffff" />

                <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
                    <ClassicShield position={[0, 0.5, 0]} scale={0.7} />
                </Float>

                <Environment preset="city" />
            </Canvas>
        </div>
    );
};

export default HeroScene3D;
