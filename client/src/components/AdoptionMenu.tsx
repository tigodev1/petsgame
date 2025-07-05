import { useState } from "react";
import { usePetStore } from "../lib/stores/usePetStore";
import { useGameStore } from "../lib/stores/useGameStore";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { petSpecies } from "../lib/petData";

export default function AdoptionMenu() {
  const [selectedSpecies, setSelectedSpecies] = useState<string>('cat');
  const [petName, setPetName] = useState('');
  const { adoptPet } = usePetStore();
  const { setGamePhase } = useGameStore();

  const handleAdopt = () => {
    if (petName.trim()) {
      adoptPet(petName.trim(), selectedSpecies as any);
      setGamePhase('playing');
    }
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-purple-400 via-pink-500 to-red-500">
      <Card className="w-full max-w-2xl mx-4 bg-white/95 backdrop-blur-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
            🏠 Pet Adoption Center 🏠
          </CardTitle>
          <p className="text-gray-600 mt-2">Choose your perfect companion!</p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Species Selection */}
          <div>
            <Label className="text-lg font-semibold text-gray-700 mb-3 block">
              Choose a Species:
            </Label>
            <div className="grid grid-cols-3 gap-4">
              {petSpecies.map((species) => (
                <Card
                  key={species.id}
                  className={`cursor-pointer transition-all duration-200 hover:scale-105 ${
                    selectedSpecies === species.id
                      ? 'ring-4 ring-purple-500 shadow-lg'
                      : 'hover:shadow-md'
                  }`}
                  onClick={() => setSelectedSpecies(species.id)}
                >
                  <CardContent className="p-4 text-center">
                    <div className="text-4xl mb-2">{species.emoji}</div>
                    <h3 className="font-bold text-gray-800">{species.name}</h3>
                    <p className="text-sm text-gray-600">{species.description}</p>
                    <div className="mt-2 text-xs text-gray-500">
                      <div>Care: {species.careLevel}</div>
                      <div>Energy: {species.energy}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Pet Name Input */}
          <div>
            <Label htmlFor="petName" className="text-lg font-semibold text-gray-700">
              Give your pet a name:
            </Label>
            <Input
              id="petName"
              value={petName}
              onChange={(e) => setPetName(e.target.value)}
              placeholder="Enter pet name..."
              className="mt-2 text-lg"
              maxLength={20}
            />
          </div>

          {/* Species Info */}
          {selectedSpecies && (
            <Card className="bg-gradient-to-r from-blue-50 to-purple-50">
              <CardContent className="p-4">
                <h4 className="font-bold text-lg text-gray-800 mb-2">
                  About {petSpecies.find(s => s.id === selectedSpecies)?.name}s:
                </h4>
                <p className="text-gray-600">
                  {petSpecies.find(s => s.id === selectedSpecies)?.longDescription}
                </p>
              </CardContent>
            </Card>
          )}

          {/* Adopt Button */}
          <Button
            onClick={handleAdopt}
            disabled={!petName.trim()}
            className="w-full py-6 text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          >
            🎉 Adopt {petName || 'Your Pet'} 🎉
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
