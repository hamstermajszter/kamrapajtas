import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatSliderModule } from '@angular/material/slider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { input } from '@angular/core';
import { AmountUnitStrategy } from './amount-unit-strategy.types';
import { findIngredientCategoryByName } from '../../models/ingredients.data';

@Component({
  selector: 'app-meat-amount-unit',
  standalone: true,
  imports: [MatSliderModule, MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="meat-quantity">
      <mat-slider min="0" max="2000" step="50" [ngModel]="quantityCtrl.value || 0" (ngModelChange)="setQuantity($event)"></mat-slider>
      <mat-form-field appearance="outline">
        <mat-label>Mennyiség (gramm)</mat-label>
        <input matInput type="number" [formControl]="quantityCtrl" placeholder="pl. 500">
      </mat-form-field>
    </div>
  `,
  styles: [`
    .meat-quantity { display: grid; grid-template-columns: 1fr 160px; align-items: center; gap: 12px; }
  `]
})
export class MeatAmountUnitComponent implements AmountUnitStrategy {
  form = input.required<any>();
  units = input<Array<{ value: string; label: string }>>([]);

  get quantityCtrl(): FormControl {
    return this.form().get('quantity') as FormControl;
  }

  setQuantity(value: number | null): void {
    const nameCtrl = this.form().get('name');
    const unitCtrl = this.form().get('unit');
    const safe = value == null ? 0 : value;
    this.quantityCtrl.setValue(safe);
    const cat = findIngredientCategoryByName(nameCtrl?.value as string | null | undefined);
    if (unitCtrl && unitCtrl.value !== cat.defaultUnit) {
      unitCtrl.setValue(cat.defaultUnit);
    }
  }
}