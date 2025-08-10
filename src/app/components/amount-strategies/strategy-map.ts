import { IngredientCategory } from '../../models/ingredient.interface';
import { Type } from '@angular/core';
import { EggsAmountUnitComponent } from './eggs-amount-unit.component';
import { MeatAmountUnitComponent } from './meat-amount-unit.component';
import { DefaultAmountUnitComponent } from './default-amount-unit.component';

export function getStrategyComponentForCategory(category: IngredientCategory): Type<any> {
  switch (category) {
    case 'eggs':
      return EggsAmountUnitComponent;
    case 'meat':
      return MeatAmountUnitComponent;
    default:
      return DefaultAmountUnitComponent;
  }
}