import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { PantryService } from '../../services/pantry.service';
import { PantryItem } from '../../models/pantry-item.interface';
import { MatStepperModule } from '@angular/material/stepper';
import { MatChipsModule } from '@angular/material/chips';
import { DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-pantry-add',
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatSnackBarModule,
    MatStepperModule,
    MatChipsModule,
    MatTableModule,
    MatIconModule
  ],
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>Új hozzávaló felvitele</mat-card-title>
      </mat-card-header>

      <mat-card-content>
        <form [formGroup]="pantryForm" (ngSubmit)="onSubmit()">
          <mat-vertical-stepper [linear]="true" #stepper>
            <mat-step [stepControl]="pantryForm.get('name')!">
              <ng-template matStepLabel>{{ nameStepLabel }}</ng-template>

              @if (suggestedIngredients.length > 0) {
                <div class="chips-container">
                  <div class="chips-label">Gyakori hozzávalók</div>
                  <mat-chip-set>
                    @for (chip of suggestedIngredients; track chip) {
                      <mat-chip (click)="setNameFromChip(chip); stepper.next()">{{ chip }}</mat-chip>
                    }
                  </mat-chip-set>
                </div>
              }

              <mat-form-field appearance="outline">
                <mat-label>Megnevezés</mat-label>
                <input matInput formControlName="name" placeholder="pl. rizs">
                @if (pantryForm.get('name')?.invalid && pantryForm.get('name')?.touched) {
                  <mat-error>A megnevezés kötelező</mat-error>
                }
              </mat-form-field>

              <div class="step-actions">
                <span></span>
                <button mat-raised-button color="primary" matStepperNext [disabled]="pantryForm.get('name')?.invalid">Tovább</button>
              </div>
            </mat-step>

            <mat-step [stepControl]="pantryForm.get('quantity')!">
              <ng-template matStepLabel>Mennyiség és mértékegység</ng-template>

              <mat-form-field appearance="outline">
                <mat-label>Mennyiség</mat-label>
                <input matInput type="number" formControlName="quantity" placeholder="pl. 500">
                @if (pantryForm.get('quantity')?.invalid && pantryForm.get('quantity')?.touched) {
                  <mat-error>A mennyiség kötelező és pozitív szám kell legyen</mat-error>
                }
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>Mértékegység</mat-label>
                <mat-select formControlName="unit">
                  @for (unit of units; track unit.value) {
                    <mat-option [value]="unit.value">{{ unit.label }}</mat-option>
                  }
                </mat-select>
                @if (pantryForm.get('unit')?.invalid && pantryForm.get('unit')?.touched) {
                  <mat-error>A mértékegység kötelező</mat-error>
                }
              </mat-form-field>

              <div class="form-actions">
                <button mat-button matStepperPrevious type="button">Vissza</button>
                <button mat-raised-button color="primary" type="submit" [disabled]="pantryForm.invalid || isLoading">
                  @if (isLoading) {
                    Mentés...
                  } @else {
                    Hozzáadás
                  }
                </button>
                <button mat-button type="button" (click)="resetForm()">Törlés</button>
              </div>
            </mat-step>
          </mat-vertical-stepper>
        </form>
      </mat-card-content>
    </mat-card>

    <mat-card class="pantry-list-card">
      <mat-card-header>
        <mat-card-title>Kamra</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        @if (pantryItems.length === 0) {
          <div class="empty-state">Jelenleg nincs hozzávaló a kamrában.</div>
        } @else {
          <table mat-table [dataSource]="pantryItems" class="mat-elevation-z1 full-width">
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
    mat-card {
      max-width: 500px;
      margin: 20px auto;
    }

    .chips-container {
      margin-bottom: 8px;
    }

    .chips-label {
      margin-bottom: 6px;
      color: rgba(0,0,0,0.6);
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: .5px;
    }

    form {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .form-actions {
      display: flex;
      gap: 12px;
      margin-top: 16px;
    }

    .form-actions button {
      flex: 1;
    }

    .step-actions {
      display: flex;
      justify-content: space-between;
      margin-top: 8px;
    }

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
      color: rgba(0,0,0,0.6);
      font-style: italic;
      padding: 8px 0;
    }
  `]
})
export class PantryAddComponent implements OnInit {
  private formBuilder = inject(FormBuilder);
  private pantryService = inject(PantryService);
  private snackBar = inject(MatSnackBar);
  private destroyRef = inject(DestroyRef);
  isLoading = false;

  units = [
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

  pantryForm: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    quantity: ['', [Validators.required, Validators.min(0.1)]],
    unit: ['', Validators.required]
  });

  // Ranked by commonness in the app; used to offer top five suggestions
  private commonIngredients: string[] = [
    'só', 'cukor', 'liszt', 'olaj', 'rizs',
    'tojás', 'tej', 'vaj', 'bors', 'tészta',
    'hagyma', 'fokhagyma', 'paradicsom', 'burgonya', 'ecet',
    'sütőpor', 'élesztő', 'vajkrém', 'kakaópor', 'vaníliacukor'
  ];

  suggestedIngredients: string[] = [];
  private pantryNamesLowercase: Set<string> = new Set<string>();

  pantryItems: PantryItem[] = [];
  displayedColumns: string[] = ['name', 'quantity', 'unit', 'actions'];

  get nameStepLabel(): string {
    const raw = this.pantryForm.get('name')?.value as string | null | undefined;
    const name = (raw || '').trim();
    return `Megnevezés${name ? ': ' + name : ''}`;
  }

  ngOnInit(): void {
    // Show suggestions immediately on first render
    this.recomputeSuggestions();

    this.pantryService
      .getPantryItems()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((items: PantryItem[]) => {
        this.pantryItems = items;
        this.pantryNamesLowercase = new Set(
          items.map(i => (i.name || '').trim().toLowerCase()).filter(Boolean)
        );
        this.recomputeSuggestions();
      });
  }

  private recomputeSuggestions(): void {
    this.suggestedIngredients = this.commonIngredients
      .filter(name => !this.pantryNamesLowercase.has(name.toLowerCase()))
      .slice(0, 5);
  }

  setNameFromChip(name: string): void {
    const trimmed = (name || '').trim();
    this.pantryForm.get('name')?.setValue(trimmed);
    this.pantryForm.get('name')?.markAsTouched();
    this.pantryForm.get('name')?.updateValueAndValidity();
  }

  async onSubmit(): Promise<void> {
    if (this.pantryForm.valid) {
      this.isLoading = true;

      try {
        const formValue = this.pantryForm.value;
        const pantryItem: Omit<PantryItem, 'id' | 'createdAt'> = {
          name: formValue.name.trim(),
          quantity: Number(formValue.quantity),
          unit: formValue.unit
        };

        await this.pantryService.addPantryItem(pantryItem);

        this.snackBar.open('Hozzávaló sikeresen hozzáadva!', 'Bezár', {
          duration: 3000,
          panelClass: ['success-snackbar']
        });

        this.resetForm();
      } catch (error) {
        console.error('Error saving pantry item:', error);
        this.snackBar.open('Hiba történt a mentés során. Kérjük próbálja újra!', 'Bezár', {
          duration: 5000,
          panelClass: ['error-snackbar']
        });
      } finally {
        this.isLoading = false;
      }
    }
  }

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

  resetForm(): void {
    this.pantryForm.reset();
    Object.keys(this.pantryForm.controls).forEach(key => {
      this.pantryForm.get(key)?.setErrors(null);
    });
    this.recomputeSuggestions();
  }
}
