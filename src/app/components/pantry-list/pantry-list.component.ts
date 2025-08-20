import { Component, inject, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { PantryService } from '../../services/pantry.service';
import { RecipeService } from '../../services/recipe.service';
import { Recipe } from '../../models/recipe.interface';
import { PantryItem } from '../../models/pantry-item.interface';
import { QuantityDisplayPipe } from '../../pipes/quantity-display.pipe';

@Component({
  selector: 'app-pantry-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatSnackBarModule,
    QuantityDisplayPipe
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mat-card class="pantry-list-card">
      <mat-card-header>
        <mat-card-title>Kamra</mat-card-title>
        <div class="spacer"></div>
        <button mat-raised-button color="primary" (click)="onGenerateRecipes()" [disabled]="isGenerating">
          {{ isGenerating ? 'Generálás…' : '3 recept generálása' }}
        </button>
      </mat-card-header>
      <mat-card-content>
        @if (pantryItemsSig().length === 0) {
          <div class="empty-state">Jelenleg nincs hozzávaló a kamrában.</div>
        } @else {
          <table mat-table [dataSource]="pantryItemsSig()" class="mat-elevation-z1 full-width">
            <ng-container matColumnDef="name">
              <th mat-header-cell *matHeaderCellDef>
                <span class="label-desktop">Megnevezés</span>
                <abbr class="label-mobile" title="Megnevezés">Név</abbr>
              </th>
              <td mat-cell *matCellDef="let item">{{ item.name }}</td>
            </ng-container>

            <ng-container matColumnDef="quantity">
              <th mat-header-cell *matHeaderCellDef>
                <span class="label-desktop">Mennyiség</span>
                <abbr class="label-mobile" title="Mennyiség">Menny.</abbr>
              </th>
              <td mat-cell *matCellDef="let item">{{ item.quantity | quantityDisplay: item.unit }}</td>
            </ng-container>

            <ng-container matColumnDef="actions">
              <th mat-header-cell *matHeaderCellDef></th>
              <td mat-cell *matCellDef="let item" class="actions-cell">
                <button mat-icon-button color="warn" (click)="onDelete(item)" aria-label="Törlés">
                  <mat-icon>delete</mat-icon>
                </button>
              </td>
            </ng-container>

            <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
            <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
          </table>
        }
      </mat-card-content>
      @if (generatedRecipesSig().length > 0) {
        <mat-card-content>
          <h3>Javasolt receptek</h3>
          <div class="recipes">
            @for (r of generatedRecipesSig(); track r.title) {
              <div class="recipe">
                <h4>{{ r.title }}</h4>
                <div class="meta">Idő: {{ r.estimatedTimeMinutes }} perc • Nehézség: {{ r.difficulty }}</div>
                <div class="section">
                  <strong>Hozzávalók:</strong>
                  <ul>
                    @for (ing of r.ingredients; track ing) { <li>{{ ing }}</li> }
                  </ul>
                </div>
                <div class="section">
                  <strong>Lépések:</strong>
                  <ol>
                    @for (step of r.steps; track step) { <li>{{ step }}</li> }
                  </ol>
                </div>
                @if (r.missingIngredients?.length) {
                  <div class="missing">Hiányzik: {{ r.missingIngredients.join(', ') }}</div>
                }
              </div>
            }
          </div>
        </mat-card-content>
      }
    </mat-card>
  `,
  styles: [`
    .pantry-list-card {
      max-width: 900px;
      margin: 0;
    }

    .full-width {
      width: 100%;
    }

    .actions-cell {
      text-align: right;
    }

    .spacer {
      flex: 1 1 auto;
    }

    .empty-state {
      color: var(--mat-sys-on-surface-variant);
      font-style: italic;
      padding: 8px 0;
    }

    /* Responsive header labels */
    .label-mobile { display: none; }
    .label-desktop { display: inline; }
    @media (max-width: 600px) {
      .label-desktop { display: none; }
      .label-mobile { display: inline; }
    }
  `]
})
export class PantryListComponent {
  private pantryService = inject(PantryService);
  private recipeService = inject(RecipeService);
  private snackBar = inject(MatSnackBar);

  // Switch to signal-based state for zoneless change detection
  readonly pantryItemsSig = this.pantryService.pantryItemsSig;
  displayedColumns: string[] = ['name', 'quantity', 'actions'];

  isGenerating = false;
  generatedRecipesSig = signal<Recipe[]>([]);

  async onDelete(item: PantryItem): Promise<void> {
    try {
      await this.pantryService.deletePantryItem(item.id);
      this.snackBar.open('Hozzávaló törölve', 'Bezár', {
        duration: 3000,
        panelClass: ['success-snackbar']
      });
    } catch (error) {
      console.error('Error deleting pantry item:', error);
      this.snackBar.open('Hiba történt a törlés során. Kérjük próbálja újra!', 'Bezár', {
        duration: 5000,
        panelClass: ['error-snackbar']
      });
    }
  }

  async onGenerateRecipes(): Promise<void> {
    this.isGenerating = true;
    try {
      const recipes = await this.recipeService.generateRecipes();
      this.generatedRecipesSig.set(recipes ?? []);
      if (!recipes?.length) {
        this.snackBar.open('Nem sikerült receptet generálni.', 'Bezár', { duration: 4000, panelClass: ['error-snackbar'] });
      }
    } catch (error) {
      console.error('Error generating recipes:', error);
      this.snackBar.open('Hiba történt a receptgenerálás során.', 'Bezár', { duration: 5000, panelClass: ['error-snackbar'] });
    } finally {
      this.isGenerating = false;
    }
  }
}
