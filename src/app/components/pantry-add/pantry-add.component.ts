import { ChangeDetectionStrategy, Component, DestroyRef, computed, inject, effect } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatStepperModule } from '@angular/material/stepper';
import { PantryItem } from '../../models/pantry-item.interface';
import { PantryService } from '../../services/pantry.service';
import { IngredientService } from '../../services/ingredient.service';
import { PantryListComponent } from '../pantry-list/pantry-list.component';
import { IngredientCategory } from '../../models/ingredient.interface';

import { AmountInputComponent } from './steps/amount-input.component';
import { NameInputComponent } from './steps/name-input.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';


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
    AmountInputComponent,
    NameInputComponent,
    PantryListComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="pantry-container">
      <mat-card class="add-form-card">
        <mat-card-header>
          <mat-card-title>Új hozzávaló felvitele</mat-card-title>
        </mat-card-header>

        <mat-card-content>
          <form [formGroup]="pantryForm" (ngSubmit)="onSubmit(stepper)">
            <mat-vertical-stepper [linear]="true" #stepper>
              <mat-step [stepControl]="pantryForm.get('name')!">
                <ng-template matStepLabel>{{ nameStepLabel }}</ng-template>

                <app-name-input
                  [nameCtrl]="nameCtrl"
                  (next)="stepper.next()"
                ></app-name-input>
              </mat-step>

              <mat-step [stepControl]="pantryForm.get('quantity')!">
                <ng-template matStepLabel>Mennyiség és mértékegység</ng-template>

                <app-amount-input
                  [form]="pantryForm"
                  [commonAmounts]="category.commonAmounts">
                </app-amount-input>

                <div class="form-actions">
                  <button mat-button matStepperPrevious type="button">Vissza</button>
                  <button mat-raised-button color="primary" type="submit" [disabled]="pantryForm.invalid || isLoading">
                    @if (isLoading) {
                      Mentés...
                    } @else {
                      Hozzáadás
                    }
                  </button>
                </div>
              </mat-step>
            </mat-vertical-stepper>
          </form>
        </mat-card-content>
      </mat-card>

      <div class="pantry-list-container">
        <app-pantry-list></app-pantry-list>
      </div>
    </div>
  `,
  styles: [`
    .pantry-container {
      display: flex;
      flex-wrap: wrap;
      gap: 20px;
      padding: 20px;
      max-width: 1200px;
      margin: 0 auto;
      align-items: flex-start;
    }

    .add-form-card {
      flex: 1 1 400px;
      min-width: 320px;
      max-width: 500px;
      margin: 0;
    }

    .pantry-list-container {
      flex: 2 1 500px;
      min-width: 300px;
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
  private ingredientService = inject(IngredientService);
  private snackBar = inject(MatSnackBar);
  isLoading = false;

  pantryForm: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    quantity: ['', [Validators.required, Validators.min(0.1)]],
    unit: ['', Validators.required]
  });

  get nameCtrl(): FormControl {
    return this.pantryForm.get('name') as FormControl;
  }

  get nameStepLabel(): string {
    const raw = this.pantryForm.get('name')?.value as string | null | undefined;
    const name = (raw || '').trim();
    return `Megnevezés${name ? ': ' + name : ''}`;
  }

  get category(): IngredientCategory {
    const raw = this.pantryForm.get('name')?.value as string | null | undefined;
    return this.ingredientService.getCategoryByName(raw);
  }

  constructor() {
    // Reset quantity and unit when name changes
    this.pantryForm.get('name')?.valueChanges.pipe(takeUntilDestroyed()).subscribe(() => {
      this.pantryForm.get('quantity')?.reset();
      this.pantryForm.get('unit')?.reset();
    });
  }

  async onSubmit(stepper: MatStepper): Promise<void> {
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
        stepper.reset();
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
    this.pantryForm.markAsPristine();
    this.pantryForm.markAsUntouched();
    Object.keys(this.pantryForm.controls).forEach(key => {
      this.pantryForm.get(key)?.setErrors(null);
    });
  }
}

