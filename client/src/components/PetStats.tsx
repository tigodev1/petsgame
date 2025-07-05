import { Pet } from "../lib/stores/usePetStore";
import { Card, CardContent } from "./ui/card";
import { Progress } from "./ui/progress";

interface PetStatsProps {
  pet: Pet;
}

export default function PetStats({ pet }: PetStatsProps) {
  const getStatColor = (value: number) => {
    if (value > 70) return "bg-green-500";
    if (value > 40) return "bg-yellow-500";
    return "bg-red-500";
  };

  const getStatIcon = (stat: string) => {
    switch (stat) {
      case 'hunger': return '🍖';
      case 'happiness': return '😊';
      case 'energy': return '⚡';
      default: return '💖';
    }
  };

  return (
    <Card className="bg-white/90 backdrop-blur-sm">
      <CardContent className="p-4">
        <div className="text-center mb-3">
          <h3 className="font-bold text-lg text-gray-800">{pet.name}</h3>
          <p className="text-sm text-gray-600 capitalize">{pet.species}</p>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="text-lg">{getStatIcon('hunger')}</span>
            <div className="flex-1">
              <div className="flex justify-between text-sm">
                <span>Hunger</span>
                <span>{Math.round(pet.hunger)}%</span>
              </div>
              <Progress 
                value={pet.hunger} 
                className="h-2 mt-1"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <span className="text-lg">{getStatIcon('happiness')}</span>
            <div className="flex-1">
              <div className="flex justify-between text-sm">
                <span>Happiness</span>
                <span>{Math.round(pet.happiness)}%</span>
              </div>
              <Progress 
                value={pet.happiness} 
                className="h-2 mt-1"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <span className="text-lg">{getStatIcon('energy')}</span>
            <div className="flex-1">
              <div className="flex justify-between text-sm">
                <span>Energy</span>
                <span>{Math.round(pet.energy)}%</span>
              </div>
              <Progress 
                value={pet.energy} 
                className="h-2 mt-1"
              />
            </div>
          </div>
        </div>

        <div className="mt-3 text-center">
          <div className="text-sm text-gray-600">
            Level {pet.level} • {pet.experience}/{pet.level * 100} XP
          </div>
          <Progress 
            value={(pet.experience / (pet.level * 100)) * 100} 
            className="h-1 mt-1"
          />
        </div>
      </CardContent>
    </Card>
  );
}
