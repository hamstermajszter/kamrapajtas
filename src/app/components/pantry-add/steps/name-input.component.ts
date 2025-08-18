import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { input, output } from '@angular/core';
import { IngredientService } from '../../../services/ingredient.service';
import { CategoryChipsComponent } from '../../category-chips/category-chips.component';

@Component({
  selector: 'app-name-input',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatChipsModule, MatButtonModule, ReactiveFormsModule, CategoryChipsComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-category-chips></app-category-chips>

    @if (ingredientService.suggestedIngredients().length > 0) {
      <div class="chips-container">
        <div class="chips-label">
          @if (ingredientService.getSelectedCategory()()) {
            Ajánlott hozzávalók a kiválasztott kategóriából
          } @else {
            Gyakori hozzávalók
          }
        </div>
        <mat-chip-set>
          @for (chip of ingredientService.suggestedIngredients(); track chip) {
            <mat-chip (click)="selectSuggestion(chip)" class="suggestion-chip">{{ chip }}</mat-chip>
          }
        </mat-chip-set>
      </div>
    }

    <mat-form-field appearance="outline">
      <mat-label>Megnevezés</mat-label>
      <input matInput [formControl]="nameCtrl()" placeholder="pl. rizs">
      @if (nameCtrl().invalid && nameCtrl().touched) {
        <mat-error>A megnevezés kötelező</mat-error>
      }
    </mat-form-field>

    <div class="step-actions">
      <span></span>
      <button mat-raised-button color="primary" type="button" (click)="next.emit()" [disabled]="nameCtrl().invalid">Tovább</button>
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
      font-weight: 500;
    }

    .suggestion-chip {
      cursor: pointer;
      transition: all 0.2s ease;
      background-color: var(--mat-sys-secondary-container);
      color: var(--mat-sys-on-secondary-container);
      
      &:hover {
        background-color: var(--mat-sys-secondary-container);
        transform: translateY(-1px);
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
      }
    }

    .step-actions {
      display: flex;
      justify-content: space-between;
      margin-top: 8px;
    }
  `]
})
export class NameInputComponent {
  ingredientService = inject(IngredientService);

  nameCtrl = input.required<FormControl>();

  next = output<void>();

  selectSuggestion(name: string): void {
    const trimmed = (name || '').trim();
    this.nameCtrl().setValue(trimmed);
    this.nameCtrl().markAsTouched();
    this.nameCtrl().updateValueAndValidity();
    this.next.emit();
  }
}
