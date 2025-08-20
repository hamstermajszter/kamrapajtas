import { Injectable, inject } from '@angular/core';
import { Functions, httpsCallable } from '@angular/fire/functions';
import { Recipe } from '../models/recipe.interface';

@Injectable({ providedIn: 'root' })
export class RecipeService {
  private functions = inject(Functions);

  async generateRecipes(): Promise<Recipe[]> {
    const callable = httpsCallable<unknown, { recipes: Recipe[] }>(this.functions, 'generateRecipes');
    const result = await callable({});
    return result.data.recipes ?? [];
  }
}

