import { Injectable, computed, inject } from '@angular/core';
import { PantryService } from './pantry.service';
import { CATEGORIES, INGREDIENTS } from '../models/ingredients.data';
import { IngredientCategory, Ingredient } from '../models/ingredient.interface';

@Injectable({
  providedIn: 'root'
})
export class IngredientService {
  private pantryService = inject(PantryService);

  // Available units for ingredients
  readonly units = [
    { value: 'g', label: 'gramm (g)' },
    { value: 'kg', label: 'kilogramm (kg)' },
    { value: 'db', label: 'darab (db)' },
    { value: 'l', label: 'liter (l)' },
    { value: 'ml', label: 'milliliter (ml)' },
    { value: 'tk', label: 'teáskanál (tk)' },
    { value: 'ek', label: 'evőkanál (ek)' },
    { value: 'csomag', label: 'csomag' },
    { value: 'doboz', label: 'doboz' },
    { value: 'üveg', label: 'üveg' }
  ];

  // Ranked by volatility and frequency of replenishment; used to offer top suggestions
  private readonly commonIngredients: string[] = [
    // Most volatile dairy and eggs - replenished multiple times per week
    'tej', 'tojás', 'vaj', 'sajt', 'tejföl', 'joghurt', 'tejszín',

    // Fresh vegetables - most frequently bought
    'hagyma', 'fokhagyma', 'paradicsom', 'paprika', 'burgonya', 'sárgarépa',
    'uborka', 'saláta', 'brokkoli', 'cukkini', 'spenót', 'gomba',

    // Fresh fruits - frequently replenished
    'banán', 'alma', 'citrom', 'narancs', 'avokádó',

    // Fresh meats - bought regularly
    'csirkemell', 'csirkecomb', 'darált marhahús', 'darált sertéshús',

    // Fresh bakery items - daily/frequent purchases
    'kenyér', 'zsemle', 'kifli',

    // Essential cooking ingredients - frequently used
    'olívaolaj', 'napraforgóolaj', 'bors', 'pirospaprika',

    // Regular grains and pasta
    'rizs', 'tészta', 'spagetti',

    // Fresh herbs - frequently bought
    'petrezselyem', 'snidling', 'bazsalikom',

    // Essential condiments - regularly consumed
    'ketchup', 'majonéz', 'mustár', 'balzsamecet'
  ];

  // Get suggested ingredients that are not already in pantry
  suggestedIngredients = computed(() =>
    this.commonIngredients
      .filter(name => !this.pantryNamesLowercase().has(name.toLowerCase()))
      .slice(0, 5)
  );

  private pantryNamesLowercase = computed<Set<string>>(() => new Set(
    this.pantryService.pantryItemsSig().map(i => (i.name || '').trim().toLowerCase()).filter(Boolean)
  ));

  /**
   * Get ingredient category by name
   */
  getCategoryByName(name: string | null | undefined): IngredientCategory {
    const normalized = (name || '').trim().toLowerCase();
    if (!normalized) return CATEGORIES.other;
    const found = INGREDIENTS.find(i => i.name.toLowerCase() === normalized);
    return found ? found.category : CATEGORIES.other;
  }

  /**
   * Get all available categories
   */
  getAllCategories(): Record<string, IngredientCategory> {
    return CATEGORIES;
  }

  /**
   * Get all ingredients
   */
  getAllIngredients(): Ingredient[] {
    return INGREDIENTS;
  }

  /**
   * Search ingredients by name
   */
  searchIngredients(query: string): Ingredient[] {
    const normalizedQuery = query.toLowerCase().trim();
    if (!normalizedQuery) return [];

    return INGREDIENTS.filter(ingredient =>
      ingredient.name.toLowerCase().includes(normalizedQuery)
    );
  }
}
