export const petSpecies = [
  {
    id: 'cat',
    name: 'Cat',
    emoji: '🐱',
    description: 'Independent and playful',
    longDescription: 'Cats are independent pets that love to play and explore. They require moderate care and are perfect for players who want a balanced companion.',
    careLevel: 'Medium',
    energy: 'Medium',
    baseStats: {
      hunger: 70,
      happiness: 80,
      energy: 85
    }
  },
  {
    id: 'dog',
    name: 'Dog',
    emoji: '🐶',
    description: 'Loyal and energetic',
    longDescription: 'Dogs are loyal and energetic companions that love attention and play. They require more care but provide lots of happiness and fun activities.',
    careLevel: 'High',
    energy: 'High',
    baseStats: {
      hunger: 80,
      happiness: 90,
      energy: 95
    }
  },
  {
    id: 'dragon',
    name: 'Dragon',
    emoji: '🐲',
    description: 'Magical and majestic',
    longDescription: 'Dragons are rare and magical creatures with unique abilities. They require special care but unlock exclusive content and have impressive stats.',
    careLevel: 'Expert',
    energy: 'Very High',
    baseStats: {
      hunger: 60,
      happiness: 75,
      energy: 100
    }
  }
];

export const customizationItems = {
  hats: [
    { id: 'hat_cap', name: 'Baseball Cap', emoji: '🧢', cost: 50 },
    { id: 'hat_crown', name: 'Royal Crown', emoji: '👑', cost: 200 },
    { id: 'hat_wizard', name: 'Wizard Hat', emoji: '🎩', cost: 150 }
  ],
  accessories: [
    { id: 'acc_bow', name: 'Bow Tie', emoji: '🎀', cost: 30 },
    { id: 'acc_glasses', name: 'Sunglasses', emoji: '🕶️', cost: 75 },
    { id: 'acc_necklace', name: 'Pearl Necklace', emoji: '📿', cost: 100 }
  ],
  toys: [
    { id: 'toy_ball', name: 'Rubber Ball', emoji: '⚽', cost: 25 },
    { id: 'toy_bone', name: 'Chew Bone', emoji: '🦴', cost: 40 },
    { id: 'toy_mouse', name: 'Toy Mouse', emoji: '🐭', cost: 35 }
  ]
};

export const homeThemes = [
  {
    id: 'basic',
    name: 'Basic Room',
    emoji: '🏠',
    description: 'Simple and clean living space',
    cost: 0
  },
  {
    id: 'garden',
    name: 'Garden Paradise',
    emoji: '🌸',
    description: 'Beautiful outdoor garden with flowers and trees',
    cost: 300
  },
  {
    id: 'indoor',
    name: 'Cozy Indoor',
    emoji: '🛋️',
    description: 'Comfortable indoor room with furniture',
    cost: 250
  },
  {
    id: 'wooden',
    name: 'Rustic Cabin',
    emoji: '🪵',
    description: 'Warm wooden cabin atmosphere',
    cost: 400
  }
];
