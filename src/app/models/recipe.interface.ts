export interface Recipe {
  title: string;
  ingredients: string[];
  steps: string[];
  estimatedTimeMinutes: number;
  difficulty: 'könnyű' | 'közepes' | 'nehéz';
  missingIngredients: string[];
}

