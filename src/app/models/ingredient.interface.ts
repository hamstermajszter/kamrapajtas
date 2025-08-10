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

export interface IngredientCategory {
  id: IngredientCategoryId;
  label: string;
  defaultUnit: string;
}

export interface Ingredient {
  name: string;
  category: IngredientCategoryId;
}