import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { IngredientService } from '../../services/ingredient.service';
import { IngredientCategoryId } from '../../models/ingredient.interface';

@Component({
  selector: 'app-category-chips',
  imports: [MatChipsModule, MatButtonModule, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="category-chips-container">
      <div class="chips-header">
        <div class="chips-label">Kategóriák</div>
        @if (ingredientService.getSelectedCategory()()) {
          <button mat-icon-button 
                  (click)="clearCategory()"
                  title="Szűrő törlése">
            <mat-icon>clear</mat-icon>
          </button>
        }
      </div>
      
      <mat-chip-listbox 
        [value]="ingredientService.getSelectedCategory()()"
        (selectionChange)="onSelectionChange($event)">
        @for (category of ingredientService.getCategoriesArray(); track category.id) {
          <mat-chip-option [value]="category.id">
            {{ category.label }}
          </mat-chip-option>
        }
      </mat-chip-listbox>
    </div>
  `,
  styles: [`
    .category-chips-container {
      margin-bottom: 16px;
    }

    .chips-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 8px;
    }

    .chips-label {
      color: var(--mat-sys-on-surface-variant);
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: .5px;
      font-weight: 500;
    }
  `]
})
export class CategoryChipsComponent {
  ingredientService = inject(IngredientService);

  onSelectionChange(event: any): void {
    const selectedValue = event.value as IngredientCategoryId | null;
    this.ingredientService.setSelectedCategory(selectedValue);
  }

  clearCategory(): void {
    this.ingredientService.clearCategory();
  }
}