import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function GearMesh({ 
  position = [0, 0, 0], 
  rotation = [0, 0, 0], 
  scale = 1, 
  color = "#ffffff", 
  metalness = 0.8,
  roughness = 0.2,
  speed = 0.005,
  numTeeth = 16,
  spokes = 6
}) {
  const meshRef = useRef();

  const geometry = useMemo(() => {
    const shape = new THREE.Shape();
    const outerRadius = 3.0;
    const innerRadius = 2.6;
    
    // 1. Draw outer teeth
    for (let i = 0; i < numTeeth; i++) {
      const angle = (i / numTeeth) * Math.PI * 2;
      const nextAngle = ((i + 1) / numTeeth) * Math.PI * 2;
      const step = (nextAngle - angle) / 4;
      
      const a0 = angle;
      const a1 = angle + step;
      const a2 = angle + step * 2;
      const a3 = angle + step * 3;
      
      if (i === 0) {
        shape.moveTo(Math.cos(a0) * innerRadius, Math.sin(a0) * innerRadius);
      } else {
        shape.lineTo(Math.cos(a0) * innerRadius, Math.sin(a0) * innerRadius);
      }
      
      shape.lineTo(Math.cos(a1) * outerRadius, Math.sin(a1) * outerRadius);
      shape.lineTo(Math.cos(a2) * outerRadius, Math.sin(a2) * outerRadius);
      shape.lineTo(Math.cos(a3) * innerRadius, Math.sin(a3) * innerRadius);
    }
    shape.closePath();

    // 2. Add wedge holes for spokes
    const rimInnerRadius = 2.0;
    const hubOuterRadius = 0.9;
    const spokeHalfAngle = Math.PI / (spokes * 4); // Adaptive spoke width

    for (let i = 0; i < spokes; i++) {
      const hole = new THREE.Path();
      const startAngle = i * (Math.PI * 2 / spokes) + spokeHalfAngle;
      const endAngle = (i + 1) * (Math.PI * 2 / spokes) - spokeHalfAngle;
      
      hole.absarc(0, 0, rimInnerRadius, startAngle, endAngle, false);
      hole.absarc(0, 0, hubOuterRadius, endAngle, startAngle, true);
      hole.closePath();
      
      shape.holes.push(hole);
    }

    // 3. Add center hole
    const centerHole = new THREE.Path();
    centerHole.absarc(0, 0, 0.4, 0, Math.PI * 2, false);
    shape.holes.push(centerHole);

    // 4. Extrude geometry
    const extrudeSettings = {
      depth: 0.5,
      bevelEnabled: true,
      bevelSegments: 4,
      steps: 1,
      bevelSize: 0.05,
      bevelThickness: 0.05,
      curveSegments: 24
    };

    const geom = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    geom.center();
    return geom;
  }, [numTeeth, spokes]);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.z += speed;
    }
  });

  return (
    <mesh ref={meshRef} position={position} rotation={rotation} scale={scale} geometry={geometry} castShadow receiveShadow>
      <meshStandardMaterial 
        color={color} 
        metalness={metalness} 
        roughness={roughness} 
      />
    </mesh>
  );
}

export default function Gears() {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      // Gentle floating animation for the whole system
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.3;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1 + 0.2;
      groupRef.current.rotation.y = Math.cos(state.clock.elapsedTime * 0.3) * 0.1 - 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Main Large Gear (Silver) */}
      <GearMesh 
        position={[0, 0, 0]}
        scale={0.8} 
        color="#e2e8f0" 
        metalness={0.9} 
        roughness={0.15} 
        speed={0.004} 
        numTeeth={16} 
        spokes={6} 
      />
      {/* Secondary Gear (Brand Blue accent) */}
      <GearMesh 
        position={[2.8, -2.4, -0.3]} 
        scale={0.55} 
        color="#4f6ef7" 
        metalness={0.7} 
        roughness={0.3} 
        speed={-0.004 * (0.8/0.55)} 
        numTeeth={12} 
        spokes={5}
        rotation={[0, 0, 0.2]} 
      />
      {/* Tertiary small gear (Dark metallic) */}
      <GearMesh 
        position={[-2.4, 2.2, 0.4]} 
        scale={0.4} 
        color="#1a202c" 
        metalness={0.8} 
        roughness={0.4} 
        speed={-0.004 * (0.8/0.4)} 
        numTeeth={8} 
        spokes={4}
        rotation={[0, 0, 0.4]} 
      />
    </group>
  );
}
