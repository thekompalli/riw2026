import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

const biotechWords = [
    'Vaccine', 'Immunology', 'Research', 'Innovation', 'Science',
    'Antibodies', 'Clinical Trials', 'Biotechnology', 'Pharmaceutical',
    'mRNA', 'Virology', 'Pathology', 'Genomics', 'Therapeutics',
    'Epidemiology', 'Biomarkers', 'Drug Development', 'Precision Medicine',
    'Stem Cells', 'Translational', 'Global Health', 'Vaccinology',
    'Immunotherapy', 'Protein Science', 'Gene Therapy', 'Bioinformatics'
];

const FloatingWord = ({ word, position, speed }) => {
    const textRef = useRef();

    useFrame((state) => {
        if (textRef.current) {
            // Move towards camera (z-axis)
            textRef.current.position.z += speed;

            // Reset position when it gets too close
            if (textRef.current.position.z > 5) {
                textRef.current.position.z = -50;
            }

            // Gentle rotation and sway
            textRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3 + position[0]) * 0.1;
            textRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.2 + position[1]) * 0.05;

            // Fade in/out based on distance
            const distance = textRef.current.position.z;
            const opacity = THREE.MathUtils.clamp((distance + 50) / 55 * 0.2, 0, 0.2);
            if (textRef.current.material) {
                textRef.current.material.opacity = opacity;
            }
        }
    });

    return (
        <Text
            ref={textRef}
            position={position}
            fontSize={0.35}
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
            maxWidth={10}
            textAlign="center"
        >
            {word}
        </Text>
    );
};

const Scene = () => {
    const words = useMemo(() => {
        return biotechWords.map((word, i) => ({
            word,
            position: [
                (Math.random() - 0.5) * 30,
                (Math.random() - 0.5) * 20,
                -Math.random() * 50 - 10
            ],
            speed: 0.02 + Math.random() * 0.03
        }));
    }, []);

    return (
        <>
            <ambientLight intensity={0.5} />
            {words.map((item, i) => (
                <FloatingWord
                    key={i}
                    word={item.word}
                    position={item.position}
                    speed={item.speed}
                />
            ))}
        </>
    );
};

const ThreeBackground = () => {
    return (
        <div className="absolute inset-0 opacity-100">
            <Canvas
                camera={{ position: [0, 0, 5], fov: 75 }}
                gl={{ alpha: true, antialias: true }}
                style={{ background: 'transparent' }}
            >
                <Scene />
            </Canvas>
        </div>
    );
};

export default ThreeBackground;
