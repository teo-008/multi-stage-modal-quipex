import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import { Step } from '../stage';

@Component({
  selector: 'stage-getting-started',
  standalone: true,
  templateUrl: './stage-getting-started.component.html',
  styleUrl: './stage-getting-started.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StageGettingStartedComponent implements Step {
  nextStep = output<void>();

  protected handleNext() {
    this.nextStep.emit();
  }
}
