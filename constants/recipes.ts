export type Tier = 2 | 3 | 4 | 5 | 6;

export interface RecipeRule {
  inputQty: number; // x50 T5 or x250 dust
  catalystQty: number; // Dust o Crystals (crystals to dust)
  philoStones: number; // Philosopher's Stones
  expectedYield: number; // Output average
}

// Reglas para Blood, Venom, Totems, Claws, Scales, Fangs, Bones
export const FINE_MATERIAL_RULES: Record<Tier, RecipeRule> = {
  2: { inputQty: 50, catalystQty: 5, philoStones: 1, expectedYield: 18.51 },
  3: { inputQty: 50, catalystQty: 5, philoStones: 2, expectedYield: 18.51 },
  4: { inputQty: 50, catalystQty: 5, philoStones: 3, expectedYield: 18.51 },
  5: { inputQty: 50, catalystQty: 5, philoStones: 4, expectedYield: 18.51 },
  6: { inputQty: 50, catalystQty: 5, philoStones: 5, expectedYield: 6.91 },
};

// Reglas exclusivas para el Polvo (Dust)
export const DUST_MATERIAL_RULES: Record<Tier, RecipeRule> = {
  2: { inputQty: 250, catalystQty: 1, philoStones: 1, expectedYield: 40 },
  3: { inputQty: 250, catalystQty: 2, philoStones: 2, expectedYield: 40 },
  4: { inputQty: 250, catalystQty: 3, philoStones: 3, expectedYield: 40 },
  5: { inputQty: 250, catalystQty: 4, philoStones: 4, expectedYield: 40 },
  6: { inputQty: 250, catalystQty: 5, philoStones: 5, expectedYield: 6 },
};

export const MATERIAL_FAMILIES = [
  {
    name: 'Blood',
    isDust: false,
    tiers: { 1: 24290, 2: 24291, 3: 24292, 4: 24293, 5: 24294, 6: 24295 },
  },
  {
    name: 'Dust',
    isDust: true,
    tiers: { 1: 24272, 2: 24273, 3: 24274, 4: 24275, 5: 24276, 6: 24277 },
  },
  {
    name: 'Venom',
    isDust: false,
    tiers: { 1: 24278, 2: 24279, 3: 24280, 4: 24281, 5: 24282, 6: 24283 },
  },
  {
    name: 'Totems',
    isDust: false,
    tiers: { 1: 24296, 2: 24297, 3: 24298, 4: 24363, 5: 24299, 6: 24300 },
  },
  {
    name: 'Claws',
    isDust: false,
    tiers: { 1: 24346, 2: 24347, 3: 24348, 4: 24349, 5: 24350, 6: 24351 },
  },
  {
    name: 'Scales',
    isDust: false,
    tiers: { 1: 24284, 2: 24285, 3: 24286, 4: 24287, 5: 24288, 6: 24289 },
  },
  {
    name: 'Fangs',
    isDust: false,
    tiers: { 1: 24352, 2: 24353, 3: 24354, 4: 24355, 5: 24356, 6: 24357 },
  },
  {
    name: 'Bones',
    isDust: false,
    tiers: { 1: 24342, 2: 24343, 3: 24344, 4: 24345, 5: 24341, 6: 24358 },
  },
];
