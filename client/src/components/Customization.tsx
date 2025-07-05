import { usePetStore } from "../lib/stores/usePetStore";
import { Button } from "./ui/button";
import { customizationItems } from "../lib/petData";
import { useAudio } from "../lib/stores/useAudio";

export default function Customization() {
  const { currentPet, coins, spendCoins, addPetAccessory } = usePetStore();
  const { playSuccess } = useAudio();

  if (!currentPet) return null;

  const handlePurchase = (item: any) => {
    if (coins >= item.cost && !currentPet.accessories.includes(item.id)) {
      spendCoins(item.cost);
      addPetAccessory(currentPet.id, item.id);
      playSuccess();
    }
  };

  const canAfford = (cost: number) => coins >= cost;
  const hasItem = (itemId: string) => currentPet.accessories.includes(itemId);

  return (
    <div>
      <h3 className="text-lg font-bold text-gray-800 mb-4">Pet Customization</h3>
      
      <div className="space-y-4">
        {Object.entries(customizationItems).map(([category, items]) => (
          <div key={category}>
            <h4 className="font-semibold text-gray-700 mb-2 capitalize">
              {category.replace('_', ' ')}
            </h4>
            
            <div className="grid grid-cols-2 gap-2">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-2 bg-gray-50 rounded"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{item.emoji}</span>
                    <div>
                      <div className="text-sm font-medium">{item.name}</div>
                      <div className="text-xs text-gray-600">💰 {item.cost}</div>
                    </div>
                  </div>
                  
                  <Button
                    size="sm"
                    variant={hasItem(item.id) ? "secondary" : "default"}
                    disabled={hasItem(item.id) || !canAfford(item.cost)}
                    onClick={() => handlePurchase(item)}
                    className="text-xs"
                  >
                    {hasItem(item.id) ? 'Owned' : 'Buy'}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      {currentPet.accessories.length > 0 && (
        <div className="mt-4 p-3 bg-blue-50 rounded">
          <h4 className="font-semibold text-gray-700 mb-2">Current Accessories:</h4>
          <div className="flex flex-wrap gap-1">
            {currentPet.accessories.map((accessoryId) => {
              const accessory = Object.values(customizationItems)
                .flat()
                .find(item => item.id === accessoryId);
              return (
                <span key={accessoryId} className="text-lg">
                  {accessory?.emoji}
                </span>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
