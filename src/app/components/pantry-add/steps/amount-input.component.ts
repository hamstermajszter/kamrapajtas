import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { input } from '@angular/core';
import { CommonAmount } from '../../../models/ingredient.interface';
import { IngredientService } from '../../../services/ingredient.service';

@Component({
  selector: 'app-amount-input',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule, MatChipsModule, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (commonAmounts().length > 0) {
      <div class="chips-container">
        <div class="chips-label">Gyakori mennyiségek</div>
        <mat-chip-set>
          @for (amount of commonAmounts(); track amount.quantity + amount.unit) {
            <mat-chip (click)="selectCommonAmount(amount)">{{ getAmountLabel(amount) }}</mat-chip>
          }
        </mat-chip-set>
      </div>
    }

    <div class="form-row">
      <mat-form-field appearance="outline">
        <mat-label>Mennyiség</mat-label>
        <input matInput type="number" [formControl]="quantityCtrl" placeholder="pl. 500">
      </mat-form-field>

      <mat-form-field appearance="outline">
        <mat-label>Mértékegység</mat-label>
        <mat-select [formControl]="unitCtrl">
          @for (unit of ingredientService.units; track unit.value) {
            <mat-option [value]="unit.value">{{ unit.label }}</mat-option>
          }
        </mat-select>
      </mat-form-field>
    </div>
  `,
  styles: [`
    .chips-container {
      margin-bottom: 16px;
    }

    .chips-label {
      margin-bottom: 8px;
      color: var(--mat-sys-on-surface-variant);
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: .5px;
    }

    .form-row {
      display: grid;
      grid-template-columns: 1fr 200px;
      gap: 16px;
      align-items: start;
    }

    @media (max-width: 480px) {
      .form-row {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class AmountInputComponent {
  ingredientService = inject(IngredientService);

  form = input.required<any>();
  commonAmounts = input<CommonAmount[]>([]);

  get quantityCtrl(): FormControl {
    return this.form().get('quantity') as FormControl;
  }

  get unitCtrl(): FormControl {
    return this.form().get('unit') as FormControl;
  }

  selectCommonAmount(amount: CommonAmount): void {
    this.quantityCtrl?.setValue(amount.quantity);
    this.quantityCtrl?.markAsTouched();

    this.unitCtrl?.setValue(amount.unit);
    this.unitCtrl?.markAsTouched();
  }

  getAmountLabel(amount: CommonAmount): string {
    if (amount.label) {
      return amount.label;
    }
    return `${amount.quantity}${amount.unit}`;
  }
}
