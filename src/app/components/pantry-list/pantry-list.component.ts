import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { PantryService } from '../../services/pantry.service';
import { PantryItem } from '../../models/pantry-item.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pantry-list',
  standalone: true,
  imports: [
    MatCardModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatSnackBarModule,
    CommonModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mat-card class="pantry-list-card">
      <mat-card-header>
        <mat-card-title>Kamra</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        @if (pantryItemsSig().length === 0) {
          <div class="empty-state">Jelenleg nincs hozzávaló a kamrában.</div>
        } @else {
          <table mat-table [dataSource]="pantryItemsSig()" class="mat-elevation-z1 full-width">
            <ng-container matColumnDef="name">
              <th mat-header-cell *matHeaderCellDef>Megnevezés</th>
              <td mat-cell *matCellDef="let item">{{ item.name }}</td>
            </ng-container>

            <ng-container matColumnDef="quantity">
              <th mat-header-cell *matHeaderCellDef>Mennyiség</th>
              <td mat-cell *matCellDef="let item">{{ item.quantity }}</td>
            </ng-container>

            <ng-container matColumnDef="unit">
              <th mat-header-cell *matHeaderCellDef>Mértékegység</th>
              <td mat-cell *matCellDef="let item">{{ item.unit }}</td>
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
    </mat-card>
  `,
  styles: [`
    .pantry-list-card {
      max-width: 900px;
      margin: 12px auto 24px;
    }

    .full-width {
      width: 100%;
    }

    .actions-cell {
      text-align: right;
    }

    .empty-state {
      color: var(--mat-sys-on-surface-variant);
      font-style: italic;
      padding: 8px 0;
    }
  `]
})
export class PantryListComponent {
  private pantryService = inject(PantryService);
  private snackBar = inject(MatSnackBar);

  // Switch to signal-based state for zoneless change detection
  readonly pantryItemsSig = this.pantryService.pantryItemsSig;
  displayedColumns: string[] = ['name', 'quantity', 'unit', 'actions'];

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
}
