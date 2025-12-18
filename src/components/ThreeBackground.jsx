import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const ParticleHelix = () => {
    const pointsRef = useRef();

    // DNA Helix Parameters
    const count = 4000; // Number of particles
    const radius = 2.5; // Radius of the helix
    const length = 20; // Tunnel length
    const turns = 5; // Number of turns

    const particles = useMemo(() => {
        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);
        const sizes = new Float32Array(count);

        const color1 = new THREE.Color('#FFD700'); // Gold
        const color2 = new THREE.Color('#ffffff'); // White

        for (let i = 0; i < count; i++) {
            const i3 = i * 3;
            // Linear position along the helix length (Z-axis for tunnel effect)
            const ratio = i / count;
            const z = (ratio - 0.5) * length;

            // Angle for the helix
            const angle = ratio * Math.PI * 2 * turns;

            // Two strands: offset by PI
            const strandOffset = i % 2 === 0 ? 0 : Math.PI;

            // Random scatter
            const randomX = (Math.random() - 0.5) * 0.5;
            const randomY = (Math.random() - 0.5) * 0.5;
            const randomZ = (Math.random() - 0.5) * 0.5;

            // Helix along Z-axis (Tunnel facing camera)
            positions[i3] = Math.cos(angle + strandOffset) * radius + randomX;
            positions[i3 + 1] = Math.sin(angle + strandOffset) * radius + randomY;
            positions[i3 + 2] = z + randomZ;

            // Mix colors
            const mixedColor = color1.clone().lerp(color2, Math.random());
            colors[i3] = mixedColor.r;
            colors[i3 + 1] = mixedColor.g;
            colors[i3 + 2] = mixedColor.b;

            // Random sizes
            sizes[i] = Math.random() * 0.05 + 0.01;
        }

        return { positions, colors, sizes };
    }, []);

    useFrame((state) => {
        if (pointsRef.current) {
            // Fixed orientation - no continuous X/Y tumbling
            pointsRef.current.rotation.x = 0;

            // Continuous circular rotation around Z-axis (Tunnel spin) PLUS gentle undulation
            pointsRef.current.rotation.z = (state.clock.elapsedTime * 0.1) + (Math.sin(state.clock.elapsedTime * 0.2) * 0.05);
        }
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={count}
                    array={particles.positions}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="attributes-color"
                    count={count}
                    array={particles.colors}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="attributes-size"
                    count={count}
                    array={particles.sizes}
                    itemSize={1}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.05}
                vertexColors
                transparent
                opacity={0.4} // Reduced brightness
                sizeAttenuation
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
};

const ThreeBackground = () => {
    return (
        <div className="absolute inset-0 z-0">
            <Canvas
                camera={{ position: [0, 0, 8], fov: 60 }}
                gl={{ alpha: true, antialias: true }}
                dpr={[1, 2]} // Optimize for high DPI screens
            >
                <ParticleHelix />
            </Canvas>
        </div>
    );
};

export default ThreeBackground;
