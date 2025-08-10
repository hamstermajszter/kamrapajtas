export type IngredientCategory =
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

export interface Ingredient {
  name: string;
  category: IngredientCategory;
}