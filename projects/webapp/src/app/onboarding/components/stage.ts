import { OutputEmitterRef } from '@angular/core';

export interface Step<N = void, P = void> {
  previousStep?: OutputEmitterRef<P>;
  nextStep: OutputEmitterRef<N>;
}
