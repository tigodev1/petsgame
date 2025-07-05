import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useKeyboardControls } from "@react-three/drei";
import * as THREE from "three";
import Pet3D from "./Pet3D";
import Environment3D from "./Environment3D";
import { usePetStore } from "../lib/stores/usePetStore";
import { useGameStore } from "../lib/stores/useGameStore";

enum Controls {
  forward = 'forward',
  backward = 'backward',
  leftward = 'leftward',
  rightward = 'rightward',
  interact = 'interact',
  menu = 'menu'
}

export default function Game3D() {
  const [subscribe, getState] = useKeyboardControls<Controls>();
  const cameraRef = useRef<THREE.Camera>(null);
  const { currentPet, updatePetStats } = usePetStore();
  const { cameraTarget, setCameraTarget } = useGameStore();

  // Camera follow system
  useFrame((state) => {
    if (cameraTarget && state.camera) {
      const targetPosition = new THREE.Vector3(
        cameraTarget.x,
        cameraTarget.y + 5,
        cameraTarget.z + 10
      );
      
      state.camera.position.lerp(targetPosition, 0.1);
      state.camera.lookAt(cameraTarget.x, cameraTarget.y, cameraTarget.z);
    }
  });

  // Handle keyboard input
  useEffect(() => {
    const unsubscribe = subscribe(
      (state) => state.interact,
      (pressed) => {
        if (pressed && currentPet) {
          console.log("Interact pressed - feeding pet");
          // Simple interaction: feed pet
          updatePetStats(currentPet.id, { 
            hunger: Math.min(100, currentPet.hunger + 20),
            happiness: Math.min(100, currentPet.happiness + 10)
          });
        }
      }
    );

    return unsubscribe;
  }, [subscribe, currentPet, updatePetStats]);

  // Auto-decrease pet stats over time
  useEffect(() => {
    if (!currentPet) return;

    const interval = setInterval(() => {
      updatePetStats(currentPet.id, {
        hunger: Math.max(0, currentPet.hunger - 1),
        happiness: Math.max(0, currentPet.happiness - 0.5)
      });
    }, 5000); // Decrease every 5 seconds

    return () => clearInterval(interval);
  }, [currentPet, updatePetStats]);

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.6} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={1}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      
      {/* Environment */}
      <Environment3D />
      
      {/* Pet */}
      {currentPet && <Pet3D pet={currentPet} />}
      
      {/* Food bowl (interaction object) */}
      <mesh position={[3, 0.5, 0]} castShadow>
        <cylinderGeometry args={[0.8, 1, 0.5, 8]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      
      {/* Toy ball */}
      <mesh position={[-3, 1, 0]} castShadow>
        <sphereGeometry args={[0.5]} />
        <meshStandardMaterial color="#FF6B9D" />
      </mesh>
    </>
  );
}
