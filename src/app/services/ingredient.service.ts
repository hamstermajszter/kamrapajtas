import { Injectable, computed, inject, signal } from '@angular/core';
import { PantryService } from './pantry.service';
import { CATEGORIES, INGREDIENTS } from '../models/ingredients.data';
import { IngredientCategory, Ingredient, IngredientCategoryId } from '../models/ingredient.interface';

@Injectable({
  providedIn: 'root'
})
export class IngredientService {
  private pantryService = inject(PantryService);

  // Selected category for filtering ingredients (single selection)
  private selectedCategorySig = signal<IngredientCategoryId | null>(null);

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

  // Ranked by commonness in the app; used to offer top suggestions
  private readonly commonIngredients: string[] = [
    'só', 'cukor', 'csirkemell', 'liszt', 'olaj', 'rizs',
    'tojás', 'tej', 'vaj', 'bors', 'tészta',
    'hagyma', 'fokhagyma', 'paradicsom', 'burgonya', 'ecet',
    'sütőpor', 'élesztő', 'vajkrém', 'kakaópor', 'vaníliacukor'
  ];

  // Get suggested ingredients that are not already in pantry
  suggestedIngredients = computed(() => {
    const selectedCategory = this.selectedCategorySig();
    const pantryNames = this.pantryNamesLowercase();
    
    // If no category is selected, show common ingredients from any category
    if (!selectedCategory) {
      return this.commonIngredients
        .filter(name => !pantryNames.has(name.toLowerCase()))
        .slice(0, 5);
    }
    
    // Filter ingredients by selected category
    const filteredIngredients = INGREDIENTS
      .filter(ingredient => ingredient.category.id === selectedCategory)
      .filter(ingredient => !pantryNames.has(ingredient.name.toLowerCase()))
      .map(ingredient => ingredient.name);
    
    return filteredIngredients.slice(0, 5);
  });

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

  /**
   * Get selected category as readonly signal
   */
  getSelectedCategory() {
    return this.selectedCategorySig.asReadonly();
  }

  /**
   * Set selected category (single selection)
   */
  setSelectedCategory(categoryId: IngredientCategoryId | null): void {
    this.selectedCategorySig.set(categoryId);
  }

  /**
   * Clear selected category
   */
  clearCategory(): void {
    this.selectedCategorySig.set(null);
  }

  /**
   * Get all categories as array for easier template usage
   */
  getCategoriesArray(): IngredientCategory[] {
    return Object.values(CATEGORIES);
  }
}
