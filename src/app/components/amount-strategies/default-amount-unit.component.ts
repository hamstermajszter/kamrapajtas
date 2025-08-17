import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { input } from '@angular/core';

@Component({
  selector: 'app-default-amount-unit',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mat-form-field appearance="outline">
      <mat-label>Mennyiség</mat-label>
      <input matInput type="number" [formControl]="quantityCtrl" placeholder="pl. 500">
    </mat-form-field>

    <mat-form-field appearance="outline">
      <mat-label>Mértékegység</mat-label>
      <mat-select [formControl]="unitCtrl">
        @for (unit of units(); track unit.value) {
          <mat-option [value]="unit.value">{{ unit.label }}</mat-option>
        }
      </mat-select>
    </mat-form-field>
  `
})
export class DefaultAmountUnitComponent {
  form = input.required<any>();
  units = input<Array<{ value: string; label: string }>>([]);

  get quantityCtrl(): FormControl {
    return this.form().get('quantity') as FormControl;
  }

  get unitCtrl(): FormControl {
    return this.form().get('unit') as FormControl;
  }

  protected setQuantity(quantity: number | null): void {
    const quantityCtrl = this.quantityCtrl;
    if (quantityCtrl && quantityCtrl.value !== quantity) {
      quantityCtrl.setValue(quantity);
      quantityCtrl.markAsTouched();
    }
  }

  protected setUnit(unit: string): void {
    const unitCtrl = this.unitCtrl;
    if (unitCtrl && unitCtrl.value !== unit) {
      unitCtrl.setValue(unit);
      unitCtrl.markAsTouched();
    }
  }
}
