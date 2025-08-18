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
  { name: 'só', category: CATEGORIES.spices },
  { name: 'cukor', category: CATEGORIES.baking },
  { name: 'barna cukor', category: CATEGORIES.baking },
  { name: 'liszt', category: CATEGORIES.baking },
  { name: 'teljes kiőrlésű liszt', category: CATEGORIES.baking },
  { name: 'kukoricaliszt', category: CATEGORIES.baking },
  { name: 'olaj', category: CATEGORIES.oils },
  { name: 'olívaolaj', category: CATEGORIES.oils },
  { name: 'napraforgóolaj', category: CATEGORIES.oils },
  { name: 'ecet', category: CATEGORIES.condiments },
  { name: 'balzsamecet', category: CATEGORIES.condiments },
  { name: 'rizs', category: CATEGORIES.grains },
  { name: 'barna rizs', category: CATEGORIES.grains },
  { name: 'basmati rizs', category: CATEGORIES.grains },
  { name: 'tészta', category: CATEGORIES.grains },
  { name: 'spagetti', category: CATEGORIES.grains },
  { name: 'penne', category: CATEGORIES.grains },
  { name: 'bulgur', category: CATEGORIES.grains },
  { name: 'kuszkusz', category: CATEGORIES.grains },
  { name: 'zabpehely', category: CATEGORIES.grains },
  { name: 'tojás', category: CATEGORIES.eggs },
  { name: 'tej', category: CATEGORIES.dairy },
  { name: 'vaj', category: CATEGORIES.dairy },
  { name: 'vajkrém', category: CATEGORIES.dairy },
  { name: 'sajt', category: CATEGORIES.dairy },
  { name: 'túró', category: CATEGORIES.dairy },
  { name: 'tejföl', category: CATEGORIES.dairy },
  { name: 'joghurt', category: CATEGORIES.dairy },
  { name: 'kefir', category: CATEGORIES.dairy },
  { name: 'tejszín', category: CATEGORIES.dairy },
  { name: 'bors', category: CATEGORIES.spices },
  { name: 'pirospaprika', category: CATEGORIES.spices },
  { name: 'oregano', category: CATEGORIES.spices },
  { name: 'bazsalikom', category: CATEGORIES.spices },
  { name: 'kakukkfű', category: CATEGORIES.spices },
  { name: 'rozmaring', category: CATEGORIES.spices },
  { name: 'curry', category: CATEGORIES.spices },
  { name: 'fahéj', category: CATEGORIES.spices },
  { name: 'kömény', category: CATEGORIES.spices },
  { name: 'chilipelyhek', category: CATEGORIES.spices },
  { name: 'vaníliacukor', category: CATEGORIES.baking },
  { name: 'sütőpor', category: CATEGORIES.baking },
  { name: 'szódabikarbóna', category: CATEGORIES.baking },
  { name: 'kakaópor', category: CATEGORIES.sweets },
  { name: 'csokoládé', category: CATEGORIES.sweets },
  { name: 'méz', category: CATEGORIES.sweets },
  { name: 'mogyorókrém', category: CATEGORIES.sweets },
  { name: 'lekvár', category: CATEGORIES.sweets },
  { name: 'kenyér', category: CATEGORIES.bakery },
  { name: 'zsemle', category: CATEGORIES.bakery },
  { name: 'tortillalap', category: CATEGORIES.bakery },
  { name: 'hagyma', category: CATEGORIES.produce },
  { name: 'fokhagyma', category: CATEGORIES.produce },
  { name: 'vöröshagyma', category: CATEGORIES.produce },
  { name: 'póréhagyma', category: CATEGORIES.produce },
  { name: 'újhagyma', category: CATEGORIES.produce },
  { name: 'paradicsom', category: CATEGORIES.produce },
  { name: 'paprika', category: CATEGORIES.produce },
  { name: 'uborka', category: CATEGORIES.produce },
  { name: 'saláta', category: CATEGORIES.produce },
  { name: 'sárgarépa', category: CATEGORIES.produce },
  { name: 'burgonya', category: CATEGORIES.produce },
  { name: 'édesburgonya', category: CATEGORIES.produce },
  { name: 'cékla', category: CATEGORIES.produce },
  { name: 'brokkoli', category: CATEGORIES.produce },
  { name: 'karfiol', category: CATEGORIES.produce },
  { name: 'cukkini', category: CATEGORIES.produce },
  { name: 'padlizsán', category: CATEGORIES.produce },
  { name: 'spenót', category: CATEGORIES.produce },
  { name: 'kelkáposzta', category: CATEGORIES.produce },
  { name: 'káposzta', category: CATEGORIES.produce },
  { name: 'kukorica', category: CATEGORIES.produce },
  { name: 'zöldborsó', category: CATEGORIES.produce },
  { name: 'zöldbab', category: CATEGORIES.produce },
  { name: 'gomba', category: CATEGORIES.produce },
  { name: 'petrezselyem', category: CATEGORIES.produce },
  { name: 'snidling', category: CATEGORIES.produce },
  { name: 'citrom', category: CATEGORIES.produce },
  { name: 'lime', category: CATEGORIES.produce },
  { name: 'alma', category: CATEGORIES.produce },
  { name: 'banán', category: CATEGORIES.produce },
  { name: 'narancs', category: CATEGORIES.produce },
  { name: 'csirkemell', category: CATEGORIES.meat },
  { name: 'csirkecomb', category: CATEGORIES.meat },
  { name: 'csirkehús', category: CATEGORIES.meat },
  { name: 'marhahús', category: CATEGORIES.meat },
  { name: 'sertéshús', category: CATEGORIES.meat },
  { name: 'pulykamell', category: CATEGORIES.meat },
  { name: 'darált marhahús', category: CATEGORIES.meat },
  { name: 'darált sertéshús', category: CATEGORIES.meat },
  { name: 'bacon', category: CATEGORIES.meat },
  { name: 'szalonna', category: CATEGORIES.meat },
  { name: 'sonka', category: CATEGORIES.meat },
  { name: 'kolbász', category: CATEGORIES.meat },
  { name: 'virsli', category: CATEGORIES.meat },
  { name: 'lazac', category: CATEGORIES.seafood },
  { name: 'tonhalkonzerv', category: CATEGORIES.seafood },
  { name: 'konzerv kukorica', category: CATEGORIES.canned },
  { name: 'konzerv bab', category: CATEGORIES.canned },
  { name: 'csicseriborsó konzerv', category: CATEGORIES.canned }
];

export function findIngredientCategoryByName(name: string | null | undefined): IngredientCategory {
  const normalized = (name || '').trim().toLowerCase();
  if (!normalized) return CATEGORIES.other;
  const found = INGREDIENTS.find(i => i.name.toLowerCase() === normalized);
  return found ? found.category : CATEGORIES.other;
}
