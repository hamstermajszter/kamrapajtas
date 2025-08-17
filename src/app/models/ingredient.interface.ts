export type IngredientCategoryId =
  | 'meat'
  | 'eggs'
  | 'dairy'
  | 'produce'
  | 'grains'
  | 'spices'
  | 'baking'
  | 'sweets'
  | 'bakery'
  | 'condiments'
  | 'oils'
  | 'seafood'
  | 'canned'
  | 'legumes'
  | 'nutsSeeds'
  | 'beverages'
  | 'frozen'
  | 'other';

export interface CommonAmount {
  quantity: number;
  unit: string;
  label?: string;
}

export interface IngredientCategory {
  id: IngredientCategoryId;
  label: string;
  defaultUnit: string;
  commonAmounts: CommonAmount[];
}

export interface Ingredient {
  name: string;
  category: IngredientCategoryId;
}
