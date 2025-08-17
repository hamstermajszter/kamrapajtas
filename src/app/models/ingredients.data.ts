import { Ingredient, IngredientCategory, IngredientCategoryId } from './ingredient.interface';

export const CATEGORIES: Record<IngredientCategoryId, IngredientCategory> = {
  meat: {
    id: 'meat',
    label: 'Húsok',
    defaultUnit: 'g',
    commonAmounts: [
      { quantity: 500, unit: 'g' },
      { quantity: 650, unit: 'g' },
      { quantity: 1000, unit: 'g', label: '1kg' },
      { quantity: 1500, unit: 'g', label: '1,5kg' }
    ]
  },
  eggs: {
    id: 'eggs',
    label: 'Tojás',
    defaultUnit: 'db',
    commonAmounts: [
      { quantity: 1, unit: 'db' },
      { quantity: 2, unit: 'db' },
      { quantity: 4, unit: 'db' },
      { quantity: 6, unit: 'db' },
      { quantity: 10, unit: 'db' },
      { quantity: 12, unit: 'db', label: '1 tucat' }
    ]
  },
  dairy: {
    id: 'dairy',
    label: 'Tejtermékek',
    defaultUnit: 'g',
    commonAmounts: [
      { quantity: 200, unit: 'g' },
      { quantity: 250, unit: 'ml' },
      { quantity: 500, unit: 'ml' },
      { quantity: 1000, unit: 'ml', label: '1 liter' }
    ]
  },
  produce: {
    id: 'produce',
    label: 'Zöldség/gyümölcs',
    defaultUnit: 'g',
    commonAmounts: [
      { quantity: 1, unit: 'db' },
      { quantity: 2, unit: 'db' },
      { quantity: 250, unit: 'g' },
      { quantity: 500, unit: 'g' },
      { quantity: 1000, unit: 'g', label: '1kg' }
    ]
  },
    grains: {
    id: 'grains',
    label: 'Gabonák',
    defaultUnit: 'g',
    commonAmounts: [
      { quantity: 250, unit: 'g' },
      { quantity: 500, unit: 'g' },
      { quantity: 1000, unit: 'g', label: '1kg' },
      { quantity: 1, unit: 'csomag' }
    ]
  },
    spices: {
    id: 'spices',
    label: 'Fűszerek',
    defaultUnit: 'tk',
    commonAmounts: [
      { quantity: 1, unit: 'tk' },
      { quantity: 1, unit: 'ek' },
      { quantity: 50, unit: 'g' },
      { quantity: 100, unit: 'g' }
    ]
  },
    baking: {
    id: 'baking',
    label: 'Sütés',
    defaultUnit: 'g',
    commonAmounts: [
      { quantity: 250, unit: 'g' },
      { quantity: 500, unit: 'g' },
      { quantity: 1000, unit: 'g', label: '1kg' },
      { quantity: 1, unit: 'csomag' }
    ]
  },
    sweets: {
    id: 'sweets',
    label: 'Édességek',
    defaultUnit: 'g',
    commonAmounts: [
      { quantity: 100, unit: 'g' },
      { quantity: 200, unit: 'g' },
      { quantity: 1, unit: 'db' },
      { quantity: 1, unit: 'csomag' }
    ]
  },
    bakery: {
    id: 'bakery',
    label: 'Pékáru',
    defaultUnit: 'db',
    commonAmounts: [
      { quantity: 1, unit: 'db' },
      { quantity: 4, unit: 'db' },
      { quantity: 6, unit: 'db' },
      { quantity: 1, unit: 'csomag' }
    ]
  },
  condiments: {
    id: 'condiments',
    label: 'Szószok',
    defaultUnit: 'ml',
    commonAmounts: [
      { quantity: 1, unit: 'ek' },
      { quantity: 100, unit: 'ml' },
      { quantity: 250, unit: 'ml' },
      { quantity: 500, unit: 'ml' },
      { quantity: 1, unit: 'üveg' }
    ]
  },
  oils: {
    id: 'oils',
    label: 'Olajok',
    defaultUnit: 'ml',
    commonAmounts: [
      { quantity: 1, unit: 'ek' },
      { quantity: 250, unit: 'ml' },
      { quantity: 500, unit: 'ml' },
      { quantity: 1000, unit: 'ml', label: '1 liter' }
    ]
  },
  seafood: {
    id: 'seafood',
    label: 'Tenger gyümölcsei',
    defaultUnit: 'g',
    commonAmounts: [
      { quantity: 250, unit: 'g' },
      { quantity: 500, unit: 'g' },
      { quantity: 1000, unit: 'g', label: '1kg' },
      { quantity: 1, unit: 'doboz' }
    ]
  },
  canned: {
    id: 'canned',
    label: 'Konzerv',
    defaultUnit: 'doboz',
    commonAmounts: [
      { quantity: 1, unit: 'doboz' },
      { quantity: 2, unit: 'doboz' },
      { quantity: 400, unit: 'g' },
      { quantity: 800, unit: 'g' }
    ]
  },
  legumes: {
    id: 'legumes',
    label: 'Hüvelyesek',
    defaultUnit: 'g',
    commonAmounts: [
      { quantity: 250, unit: 'g' },
      { quantity: 500, unit: 'g' },
      { quantity: 1000, unit: 'g', label: '1kg' },
      { quantity: 1, unit: 'doboz' }
    ]
  },
  nutsSeeds: {
    id: 'nutsSeeds',
    label: 'Magvak',
    defaultUnit: 'g',
    commonAmounts: [
      { quantity: 100, unit: 'g' },
      { quantity: 200, unit: 'g' },
      { quantity: 500, unit: 'g' },
      { quantity: 1, unit: 'csomag' }
    ]
  },
  beverages: {
    id: 'beverages',
    label: 'Italok',
    defaultUnit: 'ml',
    commonAmounts: [
      { quantity: 250, unit: 'ml' },
      { quantity: 500, unit: 'ml' },
      { quantity: 1000, unit: 'ml', label: '1 liter' },
      { quantity: 1, unit: 'üveg' }
    ]
  },
  frozen: {
    id: 'frozen',
    label: 'Fagyasztott',
    defaultUnit: 'g',
    commonAmounts: [
      { quantity: 300, unit: 'g' },
      { quantity: 500, unit: 'g' },
      { quantity: 1000, unit: 'g', label: '1kg' },
      { quantity: 1, unit: 'csomag' }
    ]
  },
  other: {
    id: 'other',
    label: 'Egyéb',
    defaultUnit: 'db',
    commonAmounts: [
      { quantity: 1, unit: 'db' },
      { quantity: 2, unit: 'db' },
      { quantity: 1, unit: 'csomag' }
    ]
  },
};

export const INGREDIENTS: Ingredient[] = [
  { name: 'só', category: 'spices' },
  { name: 'cukor', category: 'baking' },
  { name: 'barna cukor', category: 'baking' },
  { name: 'liszt', category: 'baking' },
  { name: 'teljes kiőrlésű liszt', category: 'baking' },
  { name: 'kukoricaliszt', category: 'baking' },
  { name: 'olaj', category: 'oils' },
  { name: 'olívaolaj', category: 'oils' },
  { name: 'napraforgóolaj', category: 'oils' },
  { name: 'ecet', category: 'condiments' },
  { name: 'balzsamecet', category: 'condiments' },
  { name: 'rizs', category: 'grains' },
  { name: 'barna rizs', category: 'grains' },
  { name: 'basmati rizs', category: 'grains' },
  { name: 'tészta', category: 'grains' },
  { name: 'spagetti', category: 'grains' },
  { name: 'penne', category: 'grains' },
  { name: 'bulgur', category: 'grains' },
  { name: 'kuszkusz', category: 'grains' },
  { name: 'zabpehely', category: 'grains' },
  { name: 'tojás', category: 'eggs' },
  { name: 'tej', category: 'dairy' },
  { name: 'vaj', category: 'dairy' },
  { name: 'vajkrém', category: 'dairy' },
  { name: 'sajt', category: 'dairy' },
  { name: 'túró', category: 'dairy' },
  { name: 'tejföl', category: 'dairy' },
  { name: 'joghurt', category: 'dairy' },
  { name: 'kefir', category: 'dairy' },
  { name: 'tejszín', category: 'dairy' },
  { name: 'bors', category: 'spices' },
  { name: 'pirospaprika', category: 'spices' },
  { name: 'oregano', category: 'spices' },
  { name: 'bazsalikom', category: 'spices' },
  { name: 'kakukkfű', category: 'spices' },
  { name: 'rozmaring', category: 'spices' },
  { name: 'curry', category: 'spices' },
  { name: 'fahéj', category: 'spices' },
  { name: 'kömény', category: 'spices' },
  { name: 'chilipelyhek', category: 'spices' },
  { name: 'vaníliacukor', category: 'baking' },
  { name: 'sütőpor', category: 'baking' },
  { name: 'szódabikarbóna', category: 'baking' },
  { name: 'kakaópor', category: 'sweets' },
  { name: 'csokoládé', category: 'sweets' },
  { name: 'méz', category: 'sweets' },
  { name: 'mogyorókrém', category: 'sweets' },
  { name: 'lekvár', category: 'sweets' },
  { name: 'kenyér', category: 'bakery' },
  { name: 'zsemle', category: 'bakery' },
  { name: 'tortillalap', category: 'bakery' },
  { name: 'hagyma', category: 'produce' },
  { name: 'fokhagyma', category: 'produce' },
  { name: 'vöröshagyma', category: 'produce' },
  { name: 'póréhagyma', category: 'produce' },
  { name: 'újhagyma', category: 'produce' },
  { name: 'paradicsom', category: 'produce' },
  { name: 'paprika', category: 'produce' },
  { name: 'uborka', category: 'produce' },
  { name: 'saláta', category: 'produce' },
  { name: 'sárgarépa', category: 'produce' },
  { name: 'burgonya', category: 'produce' },
  { name: 'édesburgonya', category: 'produce' },
  { name: 'cékla', category: 'produce' },
  { name: 'brokkoli', category: 'produce' },
  { name: 'karfiol', category: 'produce' },
  { name: 'cukkini', category: 'produce' },
  { name: 'padlizsán', category: 'produce' },
  { name: 'spenót', category: 'produce' },
  { name: 'kelkáposzta', category: 'produce' },
  { name: 'káposzta', category: 'produce' },
  { name: 'kukorica', category: 'produce' },
  { name: 'zöldborsó', category: 'produce' },
  { name: 'zöldbab', category: 'produce' },
  { name: 'gomba', category: 'produce' },
  { name: 'petrezselyem', category: 'produce' },
  { name: 'snidling', category: 'produce' },
  { name: 'citrom', category: 'produce' },
  { name: 'lime', category: 'produce' },
  { name: 'alma', category: 'produce' },
  { name: 'banán', category: 'produce' },
  { name: 'narancs', category: 'produce' },
  { name: 'csirkemell', category: 'meat' },
  { name: 'csirkecomb', category: 'meat' },
  { name: 'csirkehús', category: 'meat' },
  { name: 'marhahús', category: 'meat' },
  { name: 'sertéshús', category: 'meat' },
  { name: 'pulykamell', category: 'meat' },
  { name: 'darált marhahús', category: 'meat' },
  { name: 'darált sertéshús', category: 'meat' },
  { name: 'bacon', category: 'meat' },
  { name: 'szalonna', category: 'meat' },
  { name: 'sonka', category: 'meat' },
  { name: 'kolbász', category: 'meat' },
  { name: 'virsli', category: 'meat' },
  { name: 'lazac', category: 'seafood' },
  { name: 'tonhalkonzerv', category: 'seafood' },
  { name: 'konzerv kukorica', category: 'canned' },
  { name: 'konzerv bab', category: 'canned' },
  { name: 'csicseriborsó konzerv', category: 'canned' }
];

export function findIngredientCategoryByName(name: string | null | undefined): IngredientCategory {
  const normalized = (name || '').trim().toLowerCase();
  if (!normalized) return CATEGORIES.other;
  const found = INGREDIENTS.find(i => i.name.toLowerCase() === normalized);
  return found ? CATEGORIES[found.category] : CATEGORIES.other;
}
