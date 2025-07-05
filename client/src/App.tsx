import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect } from "react";
import { KeyboardControls } from "@react-three/drei";
import { useAudio } from "./lib/stores/useAudio";
import { usePetStore } from "./lib/stores/usePetStore";
import { useGameStore } from "./lib/stores/useGameStore";
import Game3D from "./components/Game3D";
import GameUI from "./components/GameUI";
import AdoptionMenu from "./components/AdoptionMenu";
import "@fontsource/inter";

// Define control keys for the game
const controls = [
  { name: "forward", keys: ["KeyW", "ArrowUp"] },
  { name: "backward", keys: ["KeyS", "ArrowDown"] },
  { name: "leftward", keys: ["KeyA", "ArrowLeft"] },
  { name: "rightward", keys: ["KeyD", "ArrowRight"] },
  { name: "interact", keys: ["KeyE", "Space"] },
  { name: "menu", keys: ["Escape", "KeyM"] },
];

function App() {
  const { currentPet } = usePetStore();
  const { gamePhase, setGamePhase } = useGameStore();
  const { setBackgroundMusic, setHitSound, setSuccessSound } = useAudio();

  // Initialize audio
  useEffect(() => {
    const backgroundMusic = new Audio('/sounds/background.mp3');
    const hitSound = new Audio('/sounds/hit.mp3');
    const successSound = new Audio('/sounds/success.mp3');
    
    backgroundMusic.loop = true;
    backgroundMusic.volume = 0.3;
    
    setBackgroundMusic(backgroundMusic);
    setHitSound(hitSound);
    setSuccessSound(successSound);
  }, [setBackgroundMusic, setHitSound, setSuccessSound]);

  // Check if player has a pet on load
  useEffect(() => {
    if (!currentPet && gamePhase !== 'adoption') {
      setGamePhase('adoption');
    }
  }, [currentPet, gamePhase, setGamePhase]);

  return (
    <div style={{ 
      width: '100vw', 
      height: '100vh', 
      position: 'relative', 
      overflow: 'hidden',
      background: 'linear-gradient(135deg, #F7F9FC 0%, #4ECDC4 100%)'
    }}>
      <KeyboardControls map={controls}>
        {gamePhase === 'adoption' && <AdoptionMenu />}
        
        {gamePhase === 'playing' && (
          <>
            <Canvas
              shadows
              camera={{
                position: [0, 5, 10],
                fov: 45,
                near: 0.1,
                far: 1000
              }}
              gl={{
                antialias: true,
                powerPreference: "default"
              }}
            >
              <color attach="background" args={["#87CEEB"]} />
              
              <Suspense fallback={null}>
                <Game3D />
              </Suspense>
            </Canvas>
            
            <GameUI />
          </>
        )}
      </KeyboardControls>
    </div>
  );
}

export default App;
