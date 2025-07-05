import { useRef, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useGameStore } from "../lib/stores/useGameStore";
import { Pet } from "../lib/stores/usePetStore";

interface Pet3DProps {
  pet: Pet;
}

export default function Pet3D({ pet }: Pet3DProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const { setCameraTarget } = useGameStore();
  const [position, setPosition] = useState(new THREE.Vector3(0, 1, 0));
  const [targetPosition, setTargetPosition] = useState(new THREE.Vector3(0, 1, 0));
  const [isMoving, setIsMoving] = useState(false);

  // Set camera target to follow pet
  useEffect(() => {
    setCameraTarget(position);
  }, [position, setCameraTarget]);

  // Pet AI movement
  useEffect(() => {
    const moveInterval = setInterval(() => {
      if (!isMoving) {
        const newTarget = new THREE.Vector3(
          (Math.random() - 0.5) * 10,
          1,
          (Math.random() - 0.5) * 10
        );
        setTargetPosition(newTarget);
        setIsMoving(true);
      }
    }, 3000 + Math.random() * 2000); // Move every 3-5 seconds

    return () => clearInterval(moveInterval);
  }, [isMoving]);

  // Animate pet movement
  useFrame(() => {
    if (meshRef.current && isMoving) {
      const currentPos = position.clone();
      const direction = targetPosition.clone().sub(currentPos);
      const distance = direction.length();

      if (distance > 0.1) {
        direction.normalize();
        const newPos = currentPos.add(direction.multiplyScalar(0.02));
        setPosition(newPos);
        
        // Rotate pet to face movement direction
        if (meshRef.current) {
          meshRef.current.lookAt(targetPosition);
        }
      } else {
        setIsMoving(false);
      }
    }
  });

  // Pet appearance based on species
  const getPetGeometry = () => {
    switch (pet.species) {
      case 'cat':
        return (
          <group>
            {/* Body */}
            <mesh position={[0, 0, 0]} castShadow>
              <boxGeometry args={[1.2, 0.8, 2]} />
              <meshStandardMaterial color="#FFA500" />
            </mesh>
            {/* Head */}
            <mesh position={[0, 0.6, 0.8]} castShadow>
              <boxGeometry args={[0.8, 0.8, 0.8]} />
              <meshStandardMaterial color="#FFA500" />
            </mesh>
            {/* Ears */}
            <mesh position={[-0.3, 1.2, 0.8]} castShadow>
              <coneGeometry args={[0.2, 0.4]} />
              <meshStandardMaterial color="#FFA500" />
            </mesh>
            <mesh position={[0.3, 1.2, 0.8]} castShadow>
              <coneGeometry args={[0.2, 0.4]} />
              <meshStandardMaterial color="#FFA500" />
            </mesh>
            {/* Tail */}
            <mesh position={[0, 0.3, -1.2]} castShadow>
              <cylinderGeometry args={[0.1, 0.15, 1]} />
              <meshStandardMaterial color="#FFA500" />
            </mesh>
          </group>
        );
      case 'dog':
        return (
          <group>
            {/* Body */}
            <mesh position={[0, 0, 0]} castShadow>
              <boxGeometry args={[1.4, 1, 2.2]} />
              <meshStandardMaterial color="#8B4513" />
            </mesh>
            {/* Head */}
            <mesh position={[0, 0.8, 1]} castShadow>
              <boxGeometry args={[1, 1, 1.2]} />
              <meshStandardMaterial color="#8B4513" />
            </mesh>
            {/* Ears */}
            <mesh position={[-0.4, 1.2, 1]} castShadow>
              <boxGeometry args={[0.3, 0.6, 0.2]} />
              <meshStandardMaterial color="#654321" />
            </mesh>
            <mesh position={[0.4, 1.2, 1]} castShadow>
              <boxGeometry args={[0.3, 0.6, 0.2]} />
              <meshStandardMaterial color="#654321" />
            </mesh>
            {/* Tail */}
            <mesh position={[0, 0.5, -1.3]} castShadow>
              <cylinderGeometry args={[0.12, 0.18, 1.2]} />
              <meshStandardMaterial color="#8B4513" />
            </mesh>
          </group>
        );
      case 'dragon':
        return (
          <group>
            {/* Body */}
            <mesh position={[0, 0, 0]} castShadow>
              <boxGeometry args={[1.6, 1.2, 2.5]} />
              <meshStandardMaterial color="#9370DB" />
            </mesh>
            {/* Head */}
            <mesh position={[0, 0.8, 1.5]} castShadow>
              <coneGeometry args={[0.8, 1.2]} />
              <meshStandardMaterial color="#9370DB" />
            </mesh>
            {/* Wings */}
            <mesh position={[-1, 0.5, -0.5]} castShadow>
              <boxGeometry args={[1.5, 0.1, 1]} />
              <meshStandardMaterial color="#8A2BE2" />
            </mesh>
            <mesh position={[1, 0.5, -0.5]} castShadow>
              <boxGeometry args={[1.5, 0.1, 1]} />
              <meshStandardMaterial color="#8A2BE2" />
            </mesh>
            {/* Tail */}
            <mesh position={[0, 0.3, -1.8]} castShadow>
              <coneGeometry args={[0.2, 2]} />
              <meshStandardMaterial color="#9370DB" />
            </mesh>
          </group>
        );
      default:
        return (
          <mesh position={[0, 0, 0]} castShadow>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="#FF6B9D" />
          </mesh>
        );
    }
  };

  return (
    <mesh 
      ref={meshRef} 
      position={[position.x, position.y, position.z]}
    >
      {getPetGeometry()}
    </mesh>
  );
}
