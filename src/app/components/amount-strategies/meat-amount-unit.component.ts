import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatSliderModule } from '@angular/material/slider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DefaultAmountUnitComponent } from './default-amount-unit.component';
import { findIngredientCategoryByName } from '../../models/ingredients.data';

@Component({
  selector: 'app-meat-amount-unit',
  standalone: true,
  imports: [MatSliderModule, MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="meat-quantity">
      <mat-slider min="0" max="2000" step="50">
        <input matSliderThumb [ngModel]="quantityCtrl.value || 0" (ngModelChange)="setQuantityValue($event)">
      </mat-slider>
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
export class MeatAmountUnitComponent extends DefaultAmountUnitComponent {
  setQuantityValue(value: number | null): void {
    const nameCtrl = this.form().get('name');
    const safe = value == null ? 0 : value;
    const cat = findIngredientCategoryByName(nameCtrl?.value as string | null | undefined);
    this.setQuantity(safe);
    this.setUnit(cat.defaultUnit);
  }
}
