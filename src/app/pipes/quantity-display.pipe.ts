import { Pipe, PipeTransform, inject } from '@angular/core';
import { QuantityDisplayService } from '../services/quantity-display.service';

@Pipe({
  name: 'quantityDisplay'
})
export class QuantityDisplayPipe implements PipeTransform {
  private quantityDisplayService = inject(QuantityDisplayService);

  transform(quantity: number, unit: string): string {
    return this.quantityDisplayService.getDisplayQuantity(quantity, unit).formatted;
  }
}
