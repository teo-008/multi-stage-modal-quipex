import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import { MatIconModule } from '@angular/material/icon';
import {
  StageGettingStartedComponent,
  StageAddBuildingComponent,
  StageAddBuildingConfirmationComponent,
} from '../../components';

const STAGE = {
  GettingStarted: 'GettingStarted',
  AddBuilding: 'AddBuilding',
  AddBuildingConfirmation: 'AddBuildingConfirmation',
} as const;

type Stage = keyof typeof STAGE;

const STAGES = {
  [STAGE.GettingStarted]: {
    title: 'Getting started',
  },
  [STAGE.AddBuilding]: {
    title: 'Create new building manual',
  },
  [STAGE.AddBuildingConfirmation]: {
    title: 'Create new building manual',
  },
} as const;

interface Machine<T extends string> {
  initial: T;
  states: Record<T, { previous?: T; next?: T }>;
}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: './onboarding-dialog.component.html',
  styleUrl: './onboarding-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatStepperModule,
    MatIconModule,
    StageGettingStartedComponent,
    StageAddBuildingComponent,
    StageAddBuildingConfirmationComponent,
    StageAddBuildingConfirmationComponent,
  ],
})
export class OnboardingDialogComponent {
  readonly stage = STAGE;
  readonly dialogRef = inject(MatDialogRef<OnboardingDialogComponent>);

  // state machines
  private machine: Machine<Stage> = {
    initial: STAGE.GettingStarted,
    states: {
      [STAGE.GettingStarted]: {
        next: STAGE.AddBuilding,
      },
      [STAGE.AddBuilding]: {
        previous: STAGE.GettingStarted,
        next: STAGE.AddBuildingConfirmation,
      },
      [STAGE.AddBuildingConfirmation]: {
        previous: STAGE.AddBuilding,
        next: STAGE.AddBuildingConfirmation,
      },
    },
  };

  currentStage = signal<Stage>(this.machine.initial);

  currentTitle = computed<string>(() => STAGES[this.currentStage()].title);

  onPreviousStep() {
    const targetStep = this.machine.states[this.currentStage()].previous;
    targetStep && this.currentStage.set(targetStep);
  }

  onNextStep() {
    const targetStep = this.machine.states[this.currentStage()].next;
    targetStep && this.currentStage.set(targetStep);
  }

  onSave(): void {
    this.dialogRef.close();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
