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
  { name: 'só', category: CATEGORIES.spices.id },
  { name: 'cukor', category: CATEGORIES.baking.id },
  { name: 'barna cukor', category: CATEGORIES.baking.id },
  { name: 'liszt', category: CATEGORIES.baking.id },
  { name: 'teljes kiőrlésű liszt', category: CATEGORIES.baking.id },
  { name: 'kukoricaliszt', category: CATEGORIES.baking.id },
  { name: 'olaj', category: CATEGORIES.oils.id },
  { name: 'olívaolaj', category: CATEGORIES.oils.id },
  { name: 'napraforgóolaj', category: CATEGORIES.oils.id },
  { name: 'ecet', category: CATEGORIES.condiments.id },
  { name: 'balzsamecet', category: CATEGORIES.condiments.id },
  { name: 'rizs', category: CATEGORIES.grains.id },
  { name: 'barna rizs', category: CATEGORIES.grains.id },
  { name: 'basmati rizs', category: CATEGORIES.grains.id },
  { name: 'tészta', category: CATEGORIES.grains.id },
  { name: 'spagetti', category: CATEGORIES.grains.id },
  { name: 'penne', category: CATEGORIES.grains.id },
  { name: 'bulgur', category: CATEGORIES.grains.id },
  { name: 'kuszkusz', category: CATEGORIES.grains.id },
  { name: 'zabpehely', category: CATEGORIES.grains.id },
  { name: 'tojás', category: CATEGORIES.eggs.id },
  { name: 'tej', category: CATEGORIES.dairy.id },
  { name: 'vaj', category: CATEGORIES.dairy.id },
  { name: 'vajkrém', category: CATEGORIES.dairy.id },
  { name: 'sajt', category: CATEGORIES.dairy.id },
  { name: 'túró', category: CATEGORIES.dairy.id },
  { name: 'tejföl', category: CATEGORIES.dairy.id },
  { name: 'joghurt', category: CATEGORIES.dairy.id },
  { name: 'kefir', category: CATEGORIES.dairy.id },
  { name: 'tejszín', category: CATEGORIES.dairy.id },
  { name: 'bors', category: CATEGORIES.spices.id },
  { name: 'pirospaprika', category: CATEGORIES.spices.id },
  { name: 'oregano', category: CATEGORIES.spices.id },
  { name: 'bazsalikom', category: CATEGORIES.spices.id },
  { name: 'kakukkfű', category: CATEGORIES.spices.id },
  { name: 'rozmaring', category: CATEGORIES.spices.id },
  { name: 'curry', category: CATEGORIES.spices.id },
  { name: 'fahéj', category: CATEGORIES.spices.id },
  { name: 'kömény', category: CATEGORIES.spices.id },
  { name: 'chilipelyhek', category: CATEGORIES.spices.id },
  { name: 'vaníliacukor', category: CATEGORIES.baking.id },
  { name: 'sütőpor', category: CATEGORIES.baking.id },
  { name: 'szódabikarbóna', category: CATEGORIES.baking.id },
  { name: 'kakaópor', category: CATEGORIES.sweets.id },
  { name: 'csokoládé', category: CATEGORIES.sweets.id },
  { name: 'méz', category: CATEGORIES.sweets.id },
  { name: 'mogyorókrém', category: CATEGORIES.sweets.id },
  { name: 'lekvár', category: CATEGORIES.sweets.id },
  { name: 'kenyér', category: CATEGORIES.bakery.id },
  { name: 'zsemle', category: CATEGORIES.bakery.id },
  { name: 'tortillalap', category: CATEGORIES.bakery.id },
  { name: 'hagyma', category: CATEGORIES.produce.id },
  { name: 'fokhagyma', category: CATEGORIES.produce.id },
  { name: 'vöröshagyma', category: CATEGORIES.produce.id },
  { name: 'póréhagyma', category: CATEGORIES.produce.id },
  { name: 'újhagyma', category: CATEGORIES.produce.id },
  { name: 'paradicsom', category: CATEGORIES.produce.id },
  { name: 'paprika', category: CATEGORIES.produce.id },
  { name: 'uborka', category: CATEGORIES.produce.id },
  { name: 'saláta', category: CATEGORIES.produce.id },
  { name: 'sárgarépa', category: CATEGORIES.produce.id },
  { name: 'burgonya', category: CATEGORIES.produce.id },
  { name: 'édesburgonya', category: CATEGORIES.produce.id },
  { name: 'cékla', category: CATEGORIES.produce.id },
  { name: 'brokkoli', category: CATEGORIES.produce.id },
  { name: 'karfiol', category: CATEGORIES.produce.id },
  { name: 'cukkini', category: CATEGORIES.produce.id },
  { name: 'padlizsán', category: CATEGORIES.produce.id },
  { name: 'spenót', category: CATEGORIES.produce.id },
  { name: 'kelkáposzta', category: CATEGORIES.produce.id },
  { name: 'káposzta', category: CATEGORIES.produce.id },
  { name: 'kukorica', category: CATEGORIES.produce.id },
  { name: 'zöldborsó', category: CATEGORIES.produce.id },
  { name: 'zöldbab', category: CATEGORIES.produce.id },
  { name: 'gomba', category: CATEGORIES.produce.id },
  { name: 'petrezselyem', category: CATEGORIES.produce.id },
  { name: 'snidling', category: CATEGORIES.produce.id },
  { name: 'citrom', category: CATEGORIES.produce.id },
  { name: 'lime', category: CATEGORIES.produce.id },
  { name: 'alma', category: CATEGORIES.produce.id },
  { name: 'banán', category: CATEGORIES.produce.id },
  { name: 'narancs', category: CATEGORIES.produce.id },
  { name: 'csirkemell', category: CATEGORIES.meat.id },
  { name: 'csirkecomb', category: CATEGORIES.meat.id },
  { name: 'csirkehús', category: CATEGORIES.meat.id },
  { name: 'marhahús', category: CATEGORIES.meat.id },
  { name: 'sertéshús', category: CATEGORIES.meat.id },
  { name: 'pulykamell', category: CATEGORIES.meat.id },
  { name: 'darált marhahús', category: CATEGORIES.meat.id },
  { name: 'darált sertéshús', category: CATEGORIES.meat.id },
  { name: 'bacon', category: CATEGORIES.meat.id },
  { name: 'szalonna', category: CATEGORIES.meat.id },
  { name: 'sonka', category: CATEGORIES.meat.id },
  { name: 'kolbász', category: CATEGORIES.meat.id },
  { name: 'virsli', category: CATEGORIES.meat.id },
  { name: 'lazac', category: CATEGORIES.seafood.id },
  { name: 'tonhalkonzerv', category: CATEGORIES.seafood.id },
  { name: 'konzerv kukorica', category: CATEGORIES.canned.id },
  { name: 'konzerv bab', category: CATEGORIES.canned.id },
  { name: 'csicseriborsó konzerv', category: CATEGORIES.canned.id }
];

export function findIngredientCategoryByName(name: string | null | undefined): IngredientCategory {
  const normalized = (name || '').trim().toLowerCase();
  if (!normalized) return CATEGORIES.other;
  const found = INGREDIENTS.find(i => i.name.toLowerCase() === normalized);
  return found ? CATEGORIES[found.category] : CATEGORIES.other;
}
