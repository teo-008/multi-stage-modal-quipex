import {
  ChangeDetectionStrategy,
  Component,
  inject,
  output,
  signal,
} from '@angular/core';
import { Step } from '../stage';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule, MatPrefix } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Address } from './stage-add-building';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'stage-add-building',
  standalone: true,
  templateUrl: './stage-add-building.component.html',
  styleUrl: './stage-add-building.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatPrefix,
  ],
})
export class StageAddBuildingComponent implements Step<string> {
  /** toggle to enter address manually */
  manualMode = signal<boolean>(false);

  previousStep = output<void>();
  nextStep = output<string>();

  private _fb = inject(FormBuilder);
  addressForm = this._fb.nonNullable.group({
    address1: ['', [Validators.required, Validators.maxLength(100)]],
    address2: ['', Validators.maxLength(100)],
    suburb: ['', [Validators.required, Validators.maxLength(100)]],
    state: ['', Validators.required],
    postcode: [
      '',
      [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(4),
        Validators.pattern('^[0-9]*$'),
      ],
    ],
  });

  protected switchToManualMode() {
    this.manualMode.set(true);
  }

  protected handleSubmit() {
    if (!this.addressForm.valid) {
      this.addressForm.markAllAsTouched();
      this.addressForm.markAsDirty();

      return;
    }

    const formValue: Address = this.addressForm.getRawValue();
    const buildingName = this._formatBuildingName(formValue);

    this.nextStep.emit(buildingName);
  }

  protected handlePrevious() {
    this.previousStep.emit();
  }

  private _formatBuildingName(formValue: Address): string {
    const { address1, suburb } = formValue;
    return `${address1} ${suburb}`;
  }
}
