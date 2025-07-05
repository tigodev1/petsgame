import { useState } from "react";
import { usePetStore } from "../lib/stores/usePetStore";
import { useGameStore } from "../lib/stores/useGameStore";
import { useAudio } from "../lib/stores/useAudio";
import PetStats from "./PetStats";
import Customization from "./Customization";
import MiniGames from "./MiniGames";
import HomeDecoration from "./HomeDecoration";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Volume2, VolumeX, Settings, Home, Gamepad2, Palette } from "lucide-react";

export default function GameUI() {
  const { currentPet, coins } = usePetStore();
  const { setGamePhase } = useGameStore();
  const { isMuted, toggleMute } = useAudio();
  const [activePanel, setActivePanel] = useState<string | null>(null);

  if (!currentPet) return null;

  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Top HUD */}
      <div className="absolute top-4 left-4 right-4 flex justify-between items-start pointer-events-auto">
        <Card className="bg-white/90 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="text-lg font-bold text-gray-800">
                {currentPet.name}
              </div>
              <div className="text-yellow-600 font-semibold">
                💰 {coins}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={toggleMute}
            className="bg-white/90 backdrop-blur-sm"
          >
            {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </Button>
          
          <Button
            variant="outline"
            onClick={() => setGamePhase('adoption')}
            className="bg-white/90 backdrop-blur-sm"
          >
            <Settings className="h-4 w-4 mr-2" />
            Menu
          </Button>
        </div>
      </div>

      {/* Pet Stats */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 pointer-events-auto">
        <PetStats pet={currentPet} />
      </div>

      {/* Bottom Panel Toggle Buttons */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 pointer-events-auto">
        <Button
          variant={activePanel === 'decoration' ? 'default' : 'outline'}
          onClick={() => setActivePanel(activePanel === 'decoration' ? null : 'decoration')}
          className="bg-white/90 backdrop-blur-sm"
        >
          <Home className="h-4 w-4 mr-2" />
          Home
        </Button>
        
        <Button
          variant={activePanel === 'games' ? 'default' : 'outline'}
          onClick={() => setActivePanel(activePanel === 'games' ? null : 'games')}
          className="bg-white/90 backdrop-blur-sm"
        >
          <Gamepad2 className="h-4 w-4 mr-2" />
          Games
        </Button>
        
        <Button
          variant={activePanel === 'customization' ? 'default' : 'outline'}
          onClick={() => setActivePanel(activePanel === 'customization' ? null : 'customization')}
          className="bg-white/90 backdrop-blur-sm"
        >
          <Palette className="h-4 w-4 mr-2" />
          Style
        </Button>
      </div>

      {/* Active Panel */}
      {activePanel && (
        <div className="absolute bottom-20 left-4 right-4 pointer-events-auto">
          <Card className="bg-white/95 backdrop-blur-sm max-h-64 overflow-y-auto">
            <CardContent className="p-4">
              {activePanel === 'decoration' && <HomeDecoration />}
              {activePanel === 'games' && <MiniGames />}
              {activePanel === 'customization' && <Customization />}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Instructions */}
      <div className="absolute bottom-4 right-4 pointer-events-auto">
        <Card className="bg-black/80 backdrop-blur-sm">
          <CardContent className="p-3">
            <div className="text-white text-sm space-y-1">
              <div>WASD - Move Camera</div>
              <div>E/Space - Interact (Feed Pet)</div>
              <div>ESC - Menu</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
