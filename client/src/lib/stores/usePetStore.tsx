import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import { getLocalStorage, setLocalStorage } from "../utils";

export interface Pet {
  id: string;
  name: string;
  species: 'cat' | 'dog' | 'dragon';
  hunger: number;
  happiness: number;
  energy: number;
  level: number;
  experience: number;
  accessories: string[];
  adoptedAt: Date;
}

interface PetState {
  currentPet: Pet | null;
  coins: number;
  
  // Actions
  adoptPet: (name: string, species: Pet['species']) => void;
  updatePetStats: (petId: string, stats: Partial<Pick<Pet, 'hunger' | 'happiness' | 'energy' | 'experience'>>) => void;
  earnCoins: (amount: number) => void;
  spendCoins: (amount: number) => void;
  addPetAccessory: (petId: string, accessoryId: string) => void;
  
  // Persistence
  saveData: () => void;
  loadData: () => void;
}

export const usePetStore = create<PetState>()(
  subscribeWithSelector((set, get) => ({
    currentPet: null,
    coins: 100, // Starting coins
    
    adoptPet: (name, species) => {
      const newPet: Pet = {
        id: Date.now().toString(),
        name,
        species,
        hunger: 80,
        happiness: 70,
        energy: 90,
        level: 1,
        experience: 0,
        accessories: [],
        adoptedAt: new Date()
      };
      
      set({ currentPet: newPet });
      get().saveData();
    },
    
    updatePetStats: (petId, stats) => {
      set((state) => {
        if (!state.currentPet || state.currentPet.id !== petId) return {};
        
        const updatedPet = { ...state.currentPet, ...stats };
        
        // Level up logic
        const expForNextLevel = updatedPet.level * 100;
        if (updatedPet.experience >= expForNextLevel) {
          updatedPet.level += 1;
          updatedPet.experience = updatedPet.experience - expForNextLevel;
        }
        
        return { currentPet: updatedPet };
      });
      get().saveData();
    },
    
    earnCoins: (amount) => {
      set((state) => ({ coins: state.coins + amount }));
      get().saveData();
    },
    
    spendCoins: (amount) => {
      set((state) => ({ 
        coins: Math.max(0, state.coins - amount) 
      }));
      get().saveData();
    },
    
    addPetAccessory: (petId, accessoryId) => {
      set((state) => {
        if (!state.currentPet || state.currentPet.id !== petId) return {};
        
        const updatedPet = {
          ...state.currentPet,
          accessories: [...state.currentPet.accessories, accessoryId]
        };
        
        return { currentPet: updatedPet };
      });
      get().saveData();
    },
    
    saveData: () => {
      const { currentPet, coins } = get();
      setLocalStorage('virtualPetData', { currentPet, coins });
    },
    
    loadData: () => {
      const data = getLocalStorage('virtualPetData');
      if (data) {
        set({
          currentPet: data.currentPet ? {
            ...data.currentPet,
            adoptedAt: new Date(data.currentPet.adoptedAt)
          } : null,
          coins: data.coins || 100
        });
      }
    }
  }))
);

// Auto-save on state changes
usePetStore.subscribe(
  (state) => state.currentPet,
  () => {
    // Small delay to batch updates
    setTimeout(() => usePetStore.getState().saveData(), 100);
  }
);

// Load data on initialization
if (typeof window !== 'undefined') {
  usePetStore.getState().loadData();
}
