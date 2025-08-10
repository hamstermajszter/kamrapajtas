import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { MatSliderModule } from '@angular/material/slider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormControl, FormGroup } from '@angular/forms';

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
export class MeatAmountUnitComponent {
  @Input({ required: true }) form!: FormGroup;
  @Input() units: Array<{ value: string; label: string }> = [];

  get quantityCtrl(): FormControl {
    return this.form.get('quantity') as FormControl;
  }

  get unitCtrl(): FormControl {
    return this.form.get('unit') as FormControl;
  }

  setQuantity(value: number | null): void {
    const unit = this.unitCtrl;
    const safe = value == null ? 0 : value;
    this.quantityCtrl.setValue(safe);
    if (!unit.value) {
      unit.setValue('g');
    }
  }
}