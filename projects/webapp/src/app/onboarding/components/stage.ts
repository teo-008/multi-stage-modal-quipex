import { OutputEmitterRef } from '@angular/core';

export interface Step {
  previousStep: OutputEmitterRef<void>;
  goBack(): void;
  nextStep: OutputEmitterRef<void>;
  goNext(): void;
}
