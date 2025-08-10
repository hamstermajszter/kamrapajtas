import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { FormGroup } from '@angular/forms';

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
export class EggsAmountUnitComponent {
  @Input({ required: true }) form!: FormGroup;
  @Input() units: Array<{ value: string; label: string }> = [];

  eggChipValues: number[] = [1, 2, 4, 6, 10, 12];

  selectEggs(count: number): void {
    const quantity = this.form.get('quantity');
    const unit = this.form.get('unit');
    quantity?.setValue(count);
    unit?.setValue('db');
    quantity?.markAsTouched();
    unit?.markAsTouched();
  }
}