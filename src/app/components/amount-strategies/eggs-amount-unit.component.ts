import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { DefaultAmountUnitComponent } from './default-amount-unit.component';
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
export class EggsAmountUnitComponent extends DefaultAmountUnitComponent {
  eggChipValues: number[] = [1, 2, 4, 6, 10, 12];

  selectEggs(count: number): void {
    const nameCtrl = this.form().get('name');
    const cat = findIngredientCategoryByName(nameCtrl?.value as string | null | undefined);
    this.setQuantity(count);
    this.setUnit(cat.defaultUnit);
  }
}
