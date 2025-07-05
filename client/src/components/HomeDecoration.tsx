import { useGameStore } from "../lib/stores/useGameStore";
import { usePetStore } from "../lib/stores/usePetStore";
import { Button } from "./ui/button";
import { homeThemes } from "../lib/petData";
import { useAudio } from "../lib/stores/useAudio";

export default function HomeDecoration() {
  const { roomTheme, setRoomTheme, unlockedThemes, unlockTheme } = useGameStore();
  const { coins, spendCoins } = usePetStore();
  const { playSuccess } = useAudio();

  const handlePurchaseTheme = (theme: any) => {
    if (coins >= theme.cost && !unlockedThemes.includes(theme.id)) {
      spendCoins(theme.cost);
      unlockTheme(theme.id);
      playSuccess();
    }
  };

  const handleSetTheme = (themeId: string) => {
    if (unlockedThemes.includes(themeId)) {
      setRoomTheme(themeId);
      playSuccess();
    }
  };

  const canAfford = (cost: number) => coins >= cost;
  const hasTheme = (themeId: string) => unlockedThemes.includes(themeId);

  return (
    <div>
      <h3 className="text-lg font-bold text-gray-800 mb-4">Home Decoration</h3>
      
      <div className="mb-4 p-3 bg-blue-50 rounded">
        <div className="text-blue-800 text-sm">
          Current Theme: <span className="font-semibold capitalize">{roomTheme.replace('_', ' ')}</span>
        </div>
      </div>
      
      <div className="space-y-3">
        {homeThemes.map((theme) => (
          <div
            key={theme.id}
            className={`p-3 rounded-lg border-2 transition-colors ${
              roomTheme === theme.id
                ? 'border-purple-500 bg-purple-50'
                : 'border-gray-200 bg-gray-50'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{theme.emoji}</span>
                <div>
                  <h4 className="font-semibold text-gray-800">{theme.name}</h4>
                  <p className="text-xs text-gray-600">{theme.description}</p>
                  {!hasTheme(theme.id) && (
                    <div className="text-xs text-yellow-600 font-medium">
                      💰 {theme.cost} coins
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex flex-col gap-2">
                {!hasTheme(theme.id) ? (
                  <Button
                    size="sm"
                    disabled={!canAfford(theme.cost)}
                    onClick={() => handlePurchaseTheme(theme)}
                    className="text-xs"
                  >
                    Buy
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    variant={roomTheme === theme.id ? "secondary" : "default"}
                    onClick={() => handleSetTheme(theme.id)}
                    className="text-xs"
                  >
                    {roomTheme === theme.id ? 'Active' : 'Use'}
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 p-3 bg-gray-100 rounded">
        <div className="text-gray-700 text-sm">
          <div className="font-semibold mb-1">Unlocked Themes:</div>
          <div className="flex flex-wrap gap-1">
            {unlockedThemes.map((themeId) => {
              const theme = homeThemes.find(t => t.id === themeId);
              return (
                <span key={themeId} className="text-lg">
                  {theme?.emoji}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
