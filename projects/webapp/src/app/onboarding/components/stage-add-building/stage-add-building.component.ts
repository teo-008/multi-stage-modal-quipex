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
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

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
  ],
})
export class StageAddBuildingComponent implements Step {
  /** toggle to enter address manually */
  manualMode = signal<boolean>(false);

  previousStep = output<void>();
  nextStep = output<void>();

  private _fb = inject(FormBuilder);
  addressForm = this._fb.nonNullable.group({
    address1: ['', [Validators.required, Validators.maxLength(255)]],
    address2: ['', Validators.maxLength(255)],
    suburb: ['', [Validators.required, Validators.maxLength(70)]],
    state: ['', Validators.required],
    postcode: ['', [Validators.required, Validators.maxLength(4)]],
  });

  goBack() {
    this.previousStep.emit();
  }

  goNext() {
    this.nextStep.emit();
  }

  switchToManualMode() {
    this.manualMode.set(true);
  }

  onSubmit() {
    if (!this.addressForm.valid) {
      this.addressForm.markAllAsTouched();
      this.addressForm.markAsDirty();

      return;
    }

    console.log('Form submitted with data:', this.addressForm.value);
    this.goNext();
  }
}
