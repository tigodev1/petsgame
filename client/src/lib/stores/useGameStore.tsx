import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import { getLocalStorage, setLocalStorage } from "../utils";
import * as THREE from "three";

export type GamePhase = "adoption" | "playing" | "menu";

interface GameState {
  gamePhase: GamePhase;
  roomTheme: string;
  unlockedThemes: string[];
  cameraTarget: THREE.Vector3 | null;
  
  // Actions
  setGamePhase: (phase: GamePhase) => void;
  setRoomTheme: (theme: string) => void;
  unlockTheme: (themeId: string) => void;
  setCameraTarget: (target: THREE.Vector3) => void;
  
  // Persistence
  saveData: () => void;
  loadData: () => void;
}

export const useGameStore = create<GameState>()(
  subscribeWithSelector((set, get) => ({
    gamePhase: "adoption",
    roomTheme: "basic",
    unlockedThemes: ["basic"], // Start with basic theme unlocked
    cameraTarget: null,
    
    setGamePhase: (phase) => {
      set({ gamePhase: phase });
      get().saveData();
    },
    
    setRoomTheme: (theme) => {
      set({ roomTheme: theme });
      get().saveData();
    },
    
    unlockTheme: (themeId) => {
      set((state) => ({
        unlockedThemes: state.unlockedThemes.includes(themeId)
          ? state.unlockedThemes
          : [...state.unlockedThemes, themeId]
      }));
      get().saveData();
    },
    
    setCameraTarget: (target) => {
      set({ cameraTarget: target });
    },
    
    saveData: () => {
      const { gamePhase, roomTheme, unlockedThemes } = get();
      setLocalStorage('virtualPetGameData', { 
        gamePhase, 
        roomTheme, 
        unlockedThemes 
      });
    },
    
    loadData: () => {
      const data = getLocalStorage('virtualPetGameData');
      if (data) {
        set({
          gamePhase: data.gamePhase || "adoption",
          roomTheme: data.roomTheme || "basic",
          unlockedThemes: data.unlockedThemes || ["basic"]
        });
      }
    }
  }))
);

// Auto-save on state changes
useGameStore.subscribe(
  (state) => ({ 
    gamePhase: state.gamePhase, 
    roomTheme: state.roomTheme, 
    unlockedThemes: state.unlockedThemes 
  }),
  () => {
    setTimeout(() => useGameStore.getState().saveData(), 100);
  }
);

// Load data on initialization
if (typeof window !== 'undefined') {
  useGameStore.getState().loadData();
}
