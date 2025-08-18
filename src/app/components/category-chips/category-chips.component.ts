import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { IngredientService } from '../../services/ingredient.service';

@Component({
  selector: 'app-category-chips',
  imports: [MatChipsModule, MatButtonModule, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="category-chips-container">
      <div class="chips-header">
        <div class="chips-label">Kategóriák</div>
        @if (ingredientService.getSelectedCategories()().size > 0) {
          <button mat-icon-button 
                  class="clear-button" 
                  (click)="clearAllCategories()"
                  title="Összes szűrő törlése">
            <mat-icon>clear</mat-icon>
          </button>
        }
      </div>
      
      <mat-chip-set class="category-chip-set">
        @for (category of ingredientService.getCategoriesArray(); track category.id) {
          <mat-chip 
            [class.selected]="ingredientService.isCategorySelected(category.id)"
            (click)="toggleCategory(category.id)"
            [removable]="false">
            {{ category.label }}
          </mat-chip>
        }
      </mat-chip-set>
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

    .clear-button {
      width: 24px;
      height: 24px;
      line-height: 24px;
      
      mat-icon {
        font-size: 18px;
        width: 18px;
        height: 18px;
      }
    }

    .category-chip-set {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }

    mat-chip {
      cursor: pointer;
      transition: all 0.2s ease;
      border: 1px solid var(--mat-sys-outline-variant);
      background-color: var(--mat-sys-surface-variant);
      color: var(--mat-sys-on-surface-variant);
      
      &:hover {
        background-color: var(--mat-sys-surface-container-high);
        border-color: var(--mat-sys-outline);
      }
      
      &.selected {
        background-color: var(--mat-sys-primary-container);
        color: var(--mat-sys-on-primary-container);
        border-color: var(--mat-sys-primary);
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
      }
    }
  `]
})
export class CategoryChipsComponent {
  ingredientService = inject(IngredientService);

  toggleCategory(categoryId: string): void {
    this.ingredientService.toggleCategory(categoryId as any);
  }

  clearAllCategories(): void {
    this.ingredientService.clearCategories();
  }
}