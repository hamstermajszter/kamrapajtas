import { FormGroup } from '@angular/forms';

export interface AmountUnitStrategyInputs {
  form: FormGroup;
  units: Array<{ value: string; label: string }>;
}
