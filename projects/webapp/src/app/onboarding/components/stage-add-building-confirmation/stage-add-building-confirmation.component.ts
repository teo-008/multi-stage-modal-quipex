import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import { Step } from '../stage';

@Component({
  selector: 'stage-add-building-confirmation',
  standalone: true,
  templateUrl: './stage-add-building-confirmation.component.html',
  styleUrl: './stage-add-building-confirmation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StageAddBuildingConfirmationComponent implements Step {
  previousStep = output<void>();
  nextStep = output<void>();

  goBack() {
    this.previousStep.emit();
  }

  goNext() {
    this.nextStep.emit();
  }
}
