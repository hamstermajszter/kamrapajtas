import { ChangeDetectionStrategy, Component, DestroyRef, computed, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
import { PantryListComponent } from '../pantry-list/pantry-list.component';


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
    PantryListComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
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

              @if (suggestedIngredients().length > 0) {
                <div class="chips-container">
                  <div class="chips-label">Gyakori hozzávalók</div>
                  <mat-chip-set>
                    @for (chip of suggestedIngredients(); track chip) {
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

    <app-pantry-list></app-pantry-list>
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
      color: var(--mat-sys-on-surface-variant);
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
  `]
})
export class PantryAddComponent {
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

  suggestedIngredients = computed(() =>
    this.commonIngredients
      .filter(name => !this.pantryNamesLowercase().has(name.toLowerCase()))
      .slice(0, 5)
  );
  private pantryNamesLowercase = computed<Set<string>>(() => new Set(
    this.pantryService.pantryItemsSig().map(i => (i.name || '').trim().toLowerCase()).filter(Boolean)
  ));

  get nameStepLabel(): string {
    const raw = this.pantryForm.get('name')?.value as string | null | undefined;
    const name = (raw || '').trim();
    return `Megnevezés${name ? ': ' + name : ''}`;
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

  resetForm(): void {
    this.pantryForm.reset();
    Object.keys(this.pantryForm.controls).forEach(key => {
      this.pantryForm.get(key)?.setErrors(null);
    });
  }
}
