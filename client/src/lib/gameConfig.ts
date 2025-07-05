export const gameConfig = {
  // Pet stat decay rates (per minute)
  statDecay: {
    hunger: 2,
    happiness: 1,
    energy: 1.5
  },
  
  // Mini-game rewards
  miniGameRewards: {
    fetch: {
      coins: { min: 10, max: 20 },
      happiness: 20,
      energy: -10,
      experience: 15
    },
    obstacle: {
      coins: { min: 15, max: 30 },
      happiness: 25,
      energy: -20,
      experience: 25
    }
  },
  
  // Care action benefits
  careActions: {
    feed: {
      hunger: 20,
      happiness: 10,
      energy: 5
    },
    play: {
      happiness: 15,
      energy: -15,
      experience: 10
    },
    rest: {
      energy: 30,
      happiness: 5
    }
  },
  
  // Level progression
  levelProgression: {
    baseExperience: 100,
    multiplier: 1.2
  },
  
  // Camera settings
  camera: {
    followSpeed: 0.1,
    defaultDistance: 10,
    defaultHeight: 5,
    fov: 45
  },
  
  // Physics settings
  physics: {
    gravity: -9.81,
    petMoveSpeed: 0.02,
    bounceHeight: 0.1
  }
};

export const colorPalette = {
  primary: '#FF6B9D',      // playful pink
  secondary: '#4ECDC4',    // mint green
  accent: '#FFE66D',       // sunshine yellow
  background: '#F7F9FC',   // soft white
  success: '#95E1A3',      // light green
  ui: '#6C5CE7'           // purple
};
