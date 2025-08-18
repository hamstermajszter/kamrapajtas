import { Injectable, computed, inject, signal } from '@angular/core';
import { PantryService } from './pantry.service';
import { CATEGORIES, INGREDIENTS } from '../models/ingredients.data';
import { IngredientCategory, Ingredient, IngredientCategoryId } from '../models/ingredient.interface';

@Injectable({
  providedIn: 'root'
})
export class IngredientService {
  private pantryService = inject(PantryService);

  // Selected categories for filtering ingredients
  private selectedCategoriesSig = signal<Set<IngredientCategoryId>>(new Set());

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
    const selectedCategories = this.selectedCategoriesSig();
    const pantryNames = this.pantryNamesLowercase();
    
    // If no categories are selected, show common ingredients from any category
    if (selectedCategories.size === 0) {
      return this.commonIngredients
        .filter(name => !pantryNames.has(name.toLowerCase()))
        .slice(0, 5);
    }
    
    // Filter ingredients by selected categories
    const filteredIngredients = INGREDIENTS
      .filter(ingredient => selectedCategories.has(ingredient.category.id))
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
   * Get selected categories as readonly signal
   */
  getSelectedCategories() {
    return this.selectedCategoriesSig.asReadonly();
  }

  /**
   * Toggle category selection
   */
  toggleCategory(categoryId: IngredientCategoryId): void {
    const current = new Set(this.selectedCategoriesSig());
    if (current.has(categoryId)) {
      current.delete(categoryId);
    } else {
      current.add(categoryId);
    }
    this.selectedCategoriesSig.set(current);
  }

  /**
   * Clear all selected categories
   */
  clearCategories(): void {
    this.selectedCategoriesSig.set(new Set());
  }

  /**
   * Check if a category is selected
   */
  isCategorySelected(categoryId: IngredientCategoryId): boolean {
    return this.selectedCategoriesSig().has(categoryId);
  }

  /**
   * Get all categories as array for easier template usage
   */
  getCategoriesArray(): IngredientCategory[] {
    return Object.values(CATEGORIES);
  }
}
