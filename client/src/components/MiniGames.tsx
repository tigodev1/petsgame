import { useState } from "react";
import { usePetStore } from "../lib/stores/usePetStore";
import { useAudio } from "../lib/stores/useAudio";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";

export default function MiniGames() {
  const { currentPet, earnCoins, updatePetStats } = usePetStore();
  const { playSuccess, playHit } = useAudio();
  const [activeGame, setActiveGame] = useState<string | null>(null);
  const [gameProgress, setGameProgress] = useState(0);
  const [gameScore, setGameScore] = useState(0);

  if (!currentPet) return null;

  const playFetchGame = () => {
    setActiveGame('fetch');
    setGameProgress(0);
    setGameScore(0);
    
    // Simple fetch game simulation
    const gameInterval = setInterval(() => {
      setGameProgress(prev => {
        const newProgress = prev + 10;
        if (newProgress >= 100) {
          clearInterval(gameInterval);
          const coinsEarned = 10 + Math.floor(Math.random() * 10);
          earnCoins(coinsEarned);
          updatePetStats(currentPet.id, {
            happiness: Math.min(100, currentPet.happiness + 20),
            energy: Math.max(0, currentPet.energy - 10),
            experience: currentPet.experience + 15
          });
          playSuccess();
          setActiveGame(null);
          setGameScore(coinsEarned);
        }
        return newProgress;
      });
    }, 300);
  };

  const playObstacleGame = () => {
    setActiveGame('obstacle');
    setGameProgress(0);
    setGameScore(0);
    
    // Simple obstacle course simulation
    const gameInterval = setInterval(() => {
      setGameProgress(prev => {
        const newProgress = prev + 8;
        if (newProgress >= 100) {
          clearInterval(gameInterval);
          const coinsEarned = 15 + Math.floor(Math.random() * 15);
          earnCoins(coinsEarned);
          updatePetStats(currentPet.id, {
            happiness: Math.min(100, currentPet.happiness + 25),
            energy: Math.max(0, currentPet.energy - 20),
            experience: currentPet.experience + 25
          });
          playSuccess();
          setActiveGame(null);
          setGameScore(coinsEarned);
        } else if (Math.random() < 0.1) {
          // Occasional "obstacle hit" sound
          playHit();
        }
        return newProgress;
      });
    }, 400);
  };

  const canPlay = (energyCost: number) => {
    return currentPet.energy >= energyCost && !activeGame;
  };

  return (
    <div>
      <h3 className="text-lg font-bold text-gray-800 mb-4">Mini Games</h3>
      
      {gameScore > 0 && !activeGame && (
        <div className="mb-4 p-3 bg-green-100 rounded text-center">
          <div className="text-green-800 font-semibold">
            Game Complete! Earned {gameScore} coins! 🎉
          </div>
        </div>
      )}
      
      <div className="space-y-3">
        <Card className="bg-gradient-to-r from-blue-50 to-blue-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              🎾 Fetch Game
              <span className="text-xs text-gray-600">(Energy: -10)</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-xs text-gray-600 mb-3">
              Play fetch with your pet! Earn 10-20 coins and increase happiness.
            </p>
            
            {activeGame === 'fetch' && (
              <div className="mb-3">
                <div className="text-sm text-gray-600 mb-1">Playing fetch...</div>
                <Progress value={gameProgress} className="h-2" />
              </div>
            )}
            
            <Button
              size="sm"
              disabled={!canPlay(10)}
              onClick={playFetchGame}
              className="w-full"
            >
              {activeGame === 'fetch' ? 'Playing...' : 'Play Fetch'}
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-50 to-orange-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              🏃 Obstacle Course
              <span className="text-xs text-gray-600">(Energy: -20)</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-xs text-gray-600 mb-3">
              Navigate through obstacles! Earn 15-30 coins and boost happiness.
            </p>
            
            {activeGame === 'obstacle' && (
              <div className="mb-3">
                <div className="text-sm text-gray-600 mb-1">Running course...</div>
                <Progress value={gameProgress} className="h-2" />
              </div>
            )}
            
            <Button
              size="sm"
              disabled={!canPlay(20)}
              onClick={playObstacleGame}
              className="w-full"
            >
              {activeGame === 'obstacle' ? 'Running...' : 'Start Course'}
            </Button>
          </CardContent>
        </Card>
      </div>
      
      {currentPet.energy < 20 && (
        <div className="mt-4 p-3 bg-yellow-100 rounded">
          <div className="text-yellow-800 text-sm">
            ⚡ Your pet needs more energy to play games! Feed them to restore energy.
          </div>
        </div>
      )}
    </div>
  );
}
