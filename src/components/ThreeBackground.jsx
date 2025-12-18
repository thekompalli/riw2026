import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const ParticleHelix = () => {
    const pointsRef1 = useRef();
    const pointsRef2 = useRef();

    // DNA Helix Parameters
    const count = 4000; // Total particles
    const radius = 2.5;
    const length = 20;
    const turns = 5;

    // Generate separate data for two strands
    const [strand1, strand2] = useMemo(() => {
        const countPerStrand = count / 2;

        // Data for Strand 1
        const pos1 = new Float32Array(countPerStrand * 3);
        const col1 = new Float32Array(countPerStrand * 3);
        const siz1 = new Float32Array(countPerStrand);

        // Data for Strand 2
        const pos2 = new Float32Array(countPerStrand * 3);
        const col2 = new Float32Array(countPerStrand * 3);
        const siz2 = new Float32Array(countPerStrand);

        const color1 = new THREE.Color('#FFD700'); // Gold
        const color2 = new THREE.Color('#ffffff'); // White

        for (let i = 0; i < countPerStrand; i++) {
            const i3 = i * 3;
            const ratio = i / countPerStrand;
            const z = (ratio - 0.5) * length;
            const angle = ratio * Math.PI * 2 * turns;

            // Common scatter calc
            const randomX = (Math.random() - 0.5) * 0.5;
            const randomY = (Math.random() - 0.5) * 0.5;
            const randomZ = (Math.random() - 0.5) * 0.5;

            // --- Strand 1 (Offset 0) ---
            pos1[i3] = Math.cos(angle) * radius + randomX;
            pos1[i3 + 1] = Math.sin(angle) * radius + randomY;
            pos1[i3 + 2] = z + randomZ;

            const mixedColor1 = color1.clone().lerp(color2, Math.random());
            col1[i3] = mixedColor1.r;
            col1[i3 + 1] = mixedColor1.g;
            col1[i3 + 2] = mixedColor1.b;
            siz1[i] = Math.random() * 0.05 + 0.01;

            // --- Strand 2 (Offset PI) ---
            pos2[i3] = Math.cos(angle + Math.PI) * radius + randomX;
            pos2[i3 + 1] = Math.sin(angle + Math.PI) * radius + randomY;
            pos2[i3 + 2] = z + randomZ;

            const mixedColor2 = color1.clone().lerp(color2, Math.random());
            col2[i3] = mixedColor2.r;
            col2[i3 + 1] = mixedColor2.g;
            col2[i3 + 2] = mixedColor2.b;
            siz2[i] = Math.random() * 0.05 + 0.01;
        }

        return [
            { positions: pos1, colors: col1, sizes: siz1 },
            { positions: pos2, colors: col2, sizes: siz2 }
        ];
    }, []);

    useFrame((state) => {
        const time = state.clock.elapsedTime;

        // Strand 1 Animation
        if (pointsRef1.current) {
            pointsRef1.current.rotation.x = 0;
            // Rotate Clockwise
            pointsRef1.current.rotation.z = time * 0.05 + (Math.sin(time * 0.2) * 0.05);
        }

        // Strand 2 Animation
        if (pointsRef2.current) {
            pointsRef2.current.rotation.x = 0;
            // Rotate Counter-Clockwise (Separately) or just different speed
            // "Rotate separately" -> Let's do different speeds to create a phasing effect
            pointsRef2.current.rotation.z = time * 0.08 + (Math.cos(time * 0.15) * 0.05);
        }
    });

    return (
        <group>
            {/* Strand 1 */}
            <points ref={pointsRef1}>
                <bufferGeometry>
                    <bufferAttribute attach="attributes-position" count={count / 2} array={strand1.positions} itemSize={3} />
                    <bufferAttribute attach="attributes-color" count={count / 2} array={strand1.colors} itemSize={3} />
                    <bufferAttribute attach="attributes-size" count={count / 2} array={strand1.sizes} itemSize={1} />
                </bufferGeometry>
                <pointsMaterial size={0.05} vertexColors transparent opacity={0.4} sizeAttenuation depthWrite={false} blending={THREE.AdditiveBlending} />
            </points>

            {/* Strand 2 */}
            <points ref={pointsRef2}>
                <bufferGeometry>
                    <bufferAttribute attach="attributes-position" count={count / 2} array={strand2.positions} itemSize={3} />
                    <bufferAttribute attach="attributes-color" count={count / 2} array={strand2.colors} itemSize={3} />
                    <bufferAttribute attach="attributes-size" count={count / 2} array={strand2.sizes} itemSize={1} />
                </bufferGeometry>
                <pointsMaterial size={0.05} vertexColors transparent opacity={0.4} sizeAttenuation depthWrite={false} blending={THREE.AdditiveBlending} />
            </points>
        </group>
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
