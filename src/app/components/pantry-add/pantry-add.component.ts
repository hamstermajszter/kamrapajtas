import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { PantryService } from '../../services/pantry.service';
import { PantryItem } from '../../models/pantry-item.interface';

@Component({
  selector: 'app-pantry-add',
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>Új hozzávaló felvitele</mat-card-title>
      </mat-card-header>

      <mat-card-content>
        <form [formGroup]="pantryForm" (ngSubmit)="onSubmit()">
          <mat-form-field appearance="outline">
            <mat-label>Megnevezés</mat-label>
            <input matInput formControlName="name" placeholder="pl. rizs">
            @if (pantryForm.get('name')?.invalid && pantryForm.get('name')?.touched) {
              <mat-error>A megnevezés kötelező</mat-error>
            }
          </mat-form-field>

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
            <button mat-raised-button color="primary" type="submit" [disabled]="pantryForm.invalid || isLoading">
              @if (isLoading) {
                Mentés...
              } @else {
                Hozzáadás
              }
            </button>
            <button mat-button type="button" (click)="resetForm()">Törlés</button>
          </div>
        </form>
      </mat-card-content>
    </mat-card>
  `,
  styles: [`
    mat-card {
      max-width: 500px;
      margin: 20px auto;
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
  `]
})
export class PantryAddComponent {
  private formBuilder = inject(FormBuilder);
  private pantryService = inject(PantryService);
  private snackBar = inject(MatSnackBar);

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

  resetForm(): void {
    this.pantryForm.reset();
    Object.keys(this.pantryForm.controls).forEach(key => {
      this.pantryForm.get(key)?.setErrors(null);
    });
  }
}
