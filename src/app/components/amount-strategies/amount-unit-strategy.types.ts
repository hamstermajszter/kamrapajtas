import { InputSignal } from '@angular/core';
import { FormGroup } from '@angular/forms';

export interface AmountUnitStrategy {
  form: InputSignal<FormGroup>;
  units: InputSignal<Array<{ value: string; label: string }>>;
}

export interface AmountUnitStrategyInputs {
  form: FormGroup;
  units: Array<{ value: string; label: string }>;
}