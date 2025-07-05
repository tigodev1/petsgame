import { useTexture } from "@react-three/drei";
import { useGameStore } from "../lib/stores/useGameStore";

export default function Environment3D() {
  const { roomTheme } = useGameStore();
  const grassTexture = useTexture("/textures/grass.png");
  const woodTexture = useTexture("/textures/wood.jpg");
  
  // Ground plane
  const getGroundMaterial = () => {
    switch (roomTheme) {
      case 'garden':
        return <meshStandardMaterial map={grassTexture} />;
      case 'wooden':
        return <meshStandardMaterial map={woodTexture} />;
      default:
        return <meshStandardMaterial color="#95E1A3" />;
    }
  };

  return (
    <>
      {/* Ground */}
      <mesh position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        {getGroundMaterial()}
      </mesh>
      
      {/* Walls based on theme */}
      {roomTheme === 'indoor' && (
        <>
          {/* Back wall */}
          <mesh position={[0, 5, -10]} receiveShadow>
            <planeGeometry args={[20, 10]} />
            <meshStandardMaterial color="#E6E6FA" />
          </mesh>
          
          {/* Side walls */}
          <mesh position={[-10, 5, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
            <planeGeometry args={[20, 10]} />
            <meshStandardMaterial color="#E6E6FA" />
          </mesh>
          
          <mesh position={[10, 5, 0]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
            <planeGeometry args={[20, 10]} />
            <meshStandardMaterial color="#E6E6FA" />
          </mesh>
        </>
      )}
      
      {/* Decorative elements based on theme */}
      {roomTheme === 'garden' && (
        <>
          {/* Trees */}
          <mesh position={[-5, 2, -5]} castShadow>
            <cylinderGeometry args={[0.3, 0.5, 2]} />
            <meshStandardMaterial color="#8B4513" />
          </mesh>
          <mesh position={[-5, 4, -5]} castShadow>
            <sphereGeometry args={[1.5]} />
            <meshStandardMaterial color="#228B22" />
          </mesh>
          
          <mesh position={[5, 2, -5]} castShadow>
            <cylinderGeometry args={[0.3, 0.5, 2]} />
            <meshStandardMaterial color="#8B4513" />
          </mesh>
          <mesh position={[5, 4, -5]} castShadow>
            <sphereGeometry args={[1.5]} />
            <meshStandardMaterial color="#228B22" />
          </mesh>
          
          {/* Flowers */}
          <mesh position={[2, 0.5, 3]} castShadow>
            <cylinderGeometry args={[0.1, 0.1, 0.5]} />
            <meshStandardMaterial color="#228B22" />
          </mesh>
          <mesh position={[2, 0.8, 3]} castShadow>
            <sphereGeometry args={[0.2]} />
            <meshStandardMaterial color="#FF69B4" />
          </mesh>
          
          <mesh position={[-2, 0.5, 4]} castShadow>
            <cylinderGeometry args={[0.1, 0.1, 0.5]} />
            <meshStandardMaterial color="#228B22" />
          </mesh>
          <mesh position={[-2, 0.8, 4]} castShadow>
            <sphereGeometry args={[0.2]} />
            <meshStandardMaterial color="#FFE66D" />
          </mesh>
        </>
      )}
      
      {roomTheme === 'indoor' && (
        <>
          {/* Furniture */}
          <mesh position={[-4, 1, -8]} castShadow>
            <boxGeometry args={[2, 2, 1]} />
            <meshStandardMaterial color="#8B4513" />
          </mesh>
          
          <mesh position={[4, 0.5, -8]} castShadow>
            <boxGeometry args={[3, 1, 1.5]} />
            <meshStandardMaterial color="#4ECDC4" />
          </mesh>
        </>
      )}
    </>
  );
}
