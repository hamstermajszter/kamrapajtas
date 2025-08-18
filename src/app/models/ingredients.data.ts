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
  // Frequently replenished dairy products
  { name: 'tej', category: CATEGORIES.dairy },
  { name: 'tojás', category: CATEGORIES.eggs },
  { name: 'vaj', category: CATEGORIES.dairy },
  { name: 'sajt', category: CATEGORIES.dairy },
  { name: 'túró', category: CATEGORIES.dairy },
  { name: 'tejföl', category: CATEGORIES.dairy },
  { name: 'joghurt', category: CATEGORIES.dairy },
  { name: 'kefir', category: CATEGORIES.dairy },
  { name: 'tejszín', category: CATEGORIES.dairy },
  { name: 'mozzarella', category: CATEGORIES.dairy },
  { name: 'trappista sajt', category: CATEGORIES.dairy },
  { name: 'füstölt sajt', category: CATEGORIES.dairy },
  { name: 'parmezán', category: CATEGORIES.dairy },
  { name: 'ricotta', category: CATEGORIES.dairy },

  // Fresh vegetables - most volatile
  { name: 'hagyma', category: CATEGORIES.produce },
  { name: 'fokhagyma', category: CATEGORIES.produce },
  { name: 'vöröshagyma', category: CATEGORIES.produce },
  { name: 'póréhagyma', category: CATEGORIES.produce },
  { name: 'újhagyma', category: CATEGORIES.produce },
  { name: 'paradicsom', category: CATEGORIES.produce },
  { name: 'koktélparadicsom', category: CATEGORIES.produce },
  { name: 'paprika', category: CATEGORIES.produce },
  { name: 'piros paprika', category: CATEGORIES.produce },
  { name: 'sárga paprika', category: CATEGORIES.produce },
  { name: 'zöld paprika', category: CATEGORIES.produce },
  { name: 'chili paprika', category: CATEGORIES.produce },
  { name: 'uborka', category: CATEGORIES.produce },
  { name: 'kovászos uborka', category: CATEGORIES.produce },
  { name: 'saláta', category: CATEGORIES.produce },
  { name: 'jégsaláta', category: CATEGORIES.produce },
  { name: 'rukkola', category: CATEGORIES.produce },
  { name: 'fejes saláta', category: CATEGORIES.produce },
  { name: 'sárgarépa', category: CATEGORIES.produce },
  { name: 'burgonya', category: CATEGORIES.produce },
  { name: 'újburgonya', category: CATEGORIES.produce },
  { name: 'édesburgonya', category: CATEGORIES.produce },
  { name: 'cékla', category: CATEGORIES.produce },
  { name: 'retek', category: CATEGORIES.produce },
  { name: 'brokkoli', category: CATEGORIES.produce },
  { name: 'karfiol', category: CATEGORIES.produce },
  { name: 'cukkini', category: CATEGORIES.produce },
  { name: 'padlizsán', category: CATEGORIES.produce },
  { name: 'spenót', category: CATEGORIES.produce },
  { name: 'mángold', category: CATEGORIES.produce },
  { name: 'kelkáposzta', category: CATEGORIES.produce },
  { name: 'káposzta', category: CATEGORIES.produce },
  { name: 'vörös káposzta', category: CATEGORIES.produce },
  { name: 'savanyú káposzta', category: CATEGORIES.produce },
  { name: 'kínai kel', category: CATEGORIES.produce },
  { name: 'kukorica', category: CATEGORIES.produce },
  { name: 'zöldborsó', category: CATEGORIES.produce },
  { name: 'zöldbab', category: CATEGORIES.produce },
  { name: 'gomba', category: CATEGORIES.produce },
  { name: 'csiperke gomba', category: CATEGORIES.produce },
  { name: 'laska gomba', category: CATEGORIES.produce },
  { name: 'shiitake gomba', category: CATEGORIES.produce },
  { name: 'petrezselyem', category: CATEGORIES.produce },
  { name: 'snidling', category: CATEGORIES.produce },
  { name: 'kapor', category: CATEGORIES.produce },
  { name: 'koriander', category: CATEGORIES.produce },
  { name: 'menta', category: CATEGORIES.produce },
  { name: 'bazsalikom', category: CATEGORIES.produce },
  { name: 'oregano', category: CATEGORIES.produce },
  { name: 'rozmaring', category: CATEGORIES.produce },
  { name: 'kakukkfű', category: CATEGORIES.produce },
  { name: 'zsálya', category: CATEGORIES.produce },
  { name: 'gyömbér', category: CATEGORIES.produce },
  { name: 'citrom', category: CATEGORIES.produce },
  { name: 'lime', category: CATEGORIES.produce },

  // Fresh fruits - frequently bought
  { name: 'alma', category: CATEGORIES.produce },
  { name: 'banán', category: CATEGORIES.produce },
  { name: 'narancs', category: CATEGORIES.produce },
  { name: 'mandarin', category: CATEGORIES.produce },
  { name: 'grapefruit', category: CATEGORIES.produce },
  { name: 'szőlő', category: CATEGORIES.produce },
  { name: 'eper', category: CATEGORIES.produce },
  { name: 'málna', category: CATEGORIES.produce },
  { name: 'áfonya', category: CATEGORIES.produce },
  { name: 'barack', category: CATEGORIES.produce },
  { name: 'szilva', category: CATEGORIES.produce },
  { name: 'körte', category: CATEGORIES.produce },
  { name: 'kiwi', category: CATEGORIES.produce },
  { name: 'avokádó', category: CATEGORIES.produce },

  // Frequently used meats
  { name: 'csirkemell', category: CATEGORIES.meat },
  { name: 'csirkecomb', category: CATEGORIES.meat },
  { name: 'csirkehús', category: CATEGORIES.meat },
  { name: 'egész csirke', category: CATEGORIES.meat },
  { name: 'csirkeszárny', category: CATEGORIES.meat },
  { name: 'marhahús', category: CATEGORIES.meat },
  { name: 'sertéshús', category: CATEGORIES.meat },
  { name: 'pulykamell', category: CATEGORIES.meat },
  { name: 'darált marhahús', category: CATEGORIES.meat },
  { name: 'darált sertéshús', category: CATEGORIES.meat },
  { name: 'darált csirkehús', category: CATEGORIES.meat },
  { name: 'darált pulykahús', category: CATEGORIES.meat },
  { name: 'bacon', category: CATEGORIES.meat },
  { name: 'szalonna', category: CATEGORIES.meat },
  { name: 'sonka', category: CATEGORIES.meat },
  { name: 'kolbász', category: CATEGORIES.meat },
  { name: 'virsli', category: CATEGORIES.meat },
  { name: 'karaj', category: CATEGORIES.meat },
  { name: 'borda', category: CATEGORIES.meat },
  { name: 'fasírt', category: CATEGORIES.meat },

  // Seafood - frequently bought fresh
  { name: 'lazac', category: CATEGORIES.seafood },
  { name: 'pisztráng', category: CATEGORIES.seafood },
  { name: 'tőkehal', category: CATEGORIES.seafood },
  { name: 'hekk', category: CATEGORIES.seafood },
  { name: 'tengeri hal', category: CATEGORIES.seafood },
  { name: 'rák', category: CATEGORIES.seafood },
  { name: 'garnéla', category: CATEGORIES.seafood },
  { name: 'kagyló', category: CATEGORIES.seafood },

  // Bakery - frequently bought
  { name: 'kenyér', category: CATEGORIES.bakery },
  { name: 'fehér kenyér', category: CATEGORIES.bakery },
  { name: 'barna kenyér', category: CATEGORIES.bakery },
  { name: 'graham kenyér', category: CATEGORIES.bakery },
  { name: 'zsemle', category: CATEGORIES.bakery },
  { name: 'kifli', category: CATEGORIES.bakery },
  { name: 'bagett', category: CATEGORIES.bakery },
  { name: 'tortillalap', category: CATEGORIES.bakery },
  { name: 'pita kenyér', category: CATEGORIES.bakery },
  { name: 'toast kenyér', category: CATEGORIES.bakery },

  // Essential cooking oils and condiments
  { name: 'olívaolaj', category: CATEGORIES.oils },
  { name: 'napraforgóolaj', category: CATEGORIES.oils },
  { name: 'kókuszolaj', category: CATEGORIES.oils },
  { name: 'szezámolaj', category: CATEGORIES.oils },

  // Frequently used condiments and sauces
  { name: 'ketchup', category: CATEGORIES.condiments },
  { name: 'majonéz', category: CATEGORIES.condiments },
  { name: 'mustár', category: CATEGORIES.condiments },
  { name: 'szójaszósz', category: CATEGORIES.condiments },
  { name: 'worcester szósz', category: CATEGORIES.condiments },
  { name: 'balzsamecet', category: CATEGORIES.condiments },
  { name: 'fehér borecet', category: CATEGORIES.condiments },
  { name: 'almaborecet', category: CATEGORIES.condiments },
  { name: 'paradicsomszósz', category: CATEGORIES.condiments },
  { name: 'pesto', category: CATEGORIES.condiments },
  { name: 'tahini', category: CATEGORIES.condiments },
  { name: 'sriracha', category: CATEGORIES.condiments },

  // Grains and pasta - regularly consumed
  { name: 'rizs', category: CATEGORIES.grains },
  { name: 'barna rizs', category: CATEGORIES.grains },
  { name: 'basmati rizs', category: CATEGORIES.grains },
  { name: 'jázmin rizs', category: CATEGORIES.grains },
  { name: 'tészta', category: CATEGORIES.grains },
  { name: 'spagetti', category: CATEGORIES.grains },
  { name: 'penne', category: CATEGORIES.grains },
  { name: 'fusilli', category: CATEGORIES.grains },
  { name: 'farfalle', category: CATEGORIES.grains },
  { name: 'lasagne lap', category: CATEGORIES.grains },
  { name: 'ravioli', category: CATEGORIES.grains },
  { name: 'gnocchi', category: CATEGORIES.grains },
  { name: 'bulgur', category: CATEGORIES.grains },
  { name: 'kuszkusz', category: CATEGORIES.grains },
  { name: 'quinoa', category: CATEGORIES.grains },
  { name: 'zabpehely', category: CATEGORIES.grains },
  { name: 'árpa', category: CATEGORIES.grains },

  // Fresh herbs and spices - frequently used
  { name: 'bors', category: CATEGORIES.spices },
  { name: 'pirospaprika', category: CATEGORIES.spices },
  { name: 'édesnemes paprika', category: CATEGORIES.spices },
  { name: 'csípős paprika', category: CATEGORIES.spices },
  { name: 'curry', category: CATEGORIES.spices },
  { name: 'kurkuma', category: CATEGORIES.spices },
  { name: 'kömény', category: CATEGORIES.spices },
  { name: 'chilipelyhek', category: CATEGORIES.spices },
  { name: 'fokhagymapor', category: CATEGORIES.spices },
  { name: 'hagymapor', category: CATEGORIES.spices },
  { name: 'garam masala', category: CATEGORIES.spices },
  { name: 'tárkony', category: CATEGORIES.spices },
  { name: 'majoranna', category: CATEGORIES.spices },
  { name: 'szerecsendió', category: CATEGORIES.spices },
  { name: 'szegfűszeg', category: CATEGORIES.spices },
  { name: 'babérlevél', category: CATEGORIES.spices },
  { name: 'édeskömény', category: CATEGORIES.spices }
];
