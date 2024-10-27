import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { Step } from '../stage';

@Component({
  selector: 'stage-add-building-confirmation',
  standalone: true,
  templateUrl: './stage-add-building-confirmation.component.html',
  styleUrl: './stage-add-building-confirmation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StageAddBuildingConfirmationComponent implements Step {
  buildingName = input.required<string>();
  nextStep = output<void>();

  protected handleNext() {
    this.nextStep.emit();
  }
}
