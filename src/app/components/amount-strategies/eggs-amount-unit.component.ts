import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { input } from '@angular/core';
import { AmountUnitStrategy } from './amount-unit-strategy.types';
import { findIngredientCategoryByName } from '../../models/ingredients.data';

@Component({
  selector: 'app-eggs-amount-unit',
  standalone: true,
  imports: [MatChipsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="chips-container">
      <div class="chips-label">Válassz tojás darabszámot</div>
      <mat-chip-set>
        @for (count of eggChipValues; track count) {
          <mat-chip (click)="selectEggs(count)">{{ count }} db</mat-chip>
        }
      </mat-chip-set>
    </div>
  `
})
export class EggsAmountUnitComponent implements AmountUnitStrategy {
  form = input.required<any>();
  units = input<Array<{ value: string; label: string }>>([]);

  eggChipValues: number[] = [1, 2, 4, 6, 10, 12];

  selectEggs(count: number): void {
    const quantity = this.form().get('quantity');
    const unit = this.form().get('unit');
    const nameCtrl = this.form().get('name');
    quantity?.setValue(count);
    const cat = findIngredientCategoryByName(nameCtrl?.value as string | null | undefined);
    if (unit && unit.value !== cat.defaultUnit) {
      unit.setValue(cat.defaultUnit);
    }
    quantity?.markAsTouched();
    unit?.markAsTouched();
  }
}