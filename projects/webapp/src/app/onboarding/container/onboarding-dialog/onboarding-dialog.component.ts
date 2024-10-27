import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogRef,
  MatDialogClose,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import {
  StageGettingStartedComponent,
  StageAddBuildingComponent,
  StageAddBuildingConfirmationComponent,
} from '../../components';
import {
  EXIT_OPTIONS,
  Machine,
  MachineState,
  NON_STAGE,
  Stage,
  STAGE,
} from './onboarding-dialog';

@Component({
  selector: 'onboarding-dialog',
  templateUrl: './onboarding-dialog.component.html',
  styleUrl: './onboarding-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogClose,
    MatDialogActions,
    MatIconModule,
    StageGettingStartedComponent,
    StageAddBuildingComponent,
    StageAddBuildingConfirmationComponent,
  ],
})
export class OnboardingDialogComponent {
  readonly stage = STAGE;
  readonly exitOptions = EXIT_OPTIONS;
  readonly dialogRef = inject(MatDialogRef<OnboardingDialogComponent>);

  private machine: Machine<Stage> = {
    initial: STAGE.GettingStarted,
    states: {
      [STAGE.GettingStarted]: {
        title: 'Getting started',
        on: {
          next: STAGE.AddBuilding,
        },
        options: {
          exit: EXIT_OPTIONS.Later,
        },
      },
      [STAGE.AddBuilding]: {
        title: 'Create new building manual',
        on: {
          previous: STAGE.GettingStarted,
          next: STAGE.AddBuildingConfirmation,
        },
        options: {
          exit: EXIT_OPTIONS.Save,
        },
      },
      [STAGE.AddBuildingConfirmation]: {
        title: 'Create new building manual',
        on: {
          previous: STAGE.AddBuilding,
          next: NON_STAGE.End,
        },
        options: {
          exit: EXIT_OPTIONS.Later,
        },
      },
    },
  } as const;

  currentStageId = signal<Stage>(this.machine.initial);
  currentStage = computed<MachineState<Stage>>(
    () => this.machine.states[this.currentStageId()]
  );

  /** newly created building name */
  buildingName = signal<string>('');

  onPreviousStep() {
    const targetStep = this.machine.states[this.currentStageId()].on.previous;
    targetStep && this.currentStageId.set(targetStep);
  }

  onNextStep(event?: unknown) {
    const targetStep = this.machine.states[this.currentStageId()].on.next;

    if (!targetStep) return;

    if (targetStep === STAGE.AddBuildingConfirmation) {
      const buildingName = typeof event === 'string' ? event : '';
      this.buildingName.set(buildingName);
    }

    if (targetStep === NON_STAGE.End) {
      console.log(`onboarding complete with ${this.buildingName()}`);
      this.dialogRef.close();
      return;
    }

    this.currentStageId.set(targetStep);
  }

  handleSave(): void {
    const canSave =
      this.machine.states[this.currentStageId()].options.exit ===
      EXIT_OPTIONS.Save;

    if (!canSave) return;

    console.log('save state and close');
    this.dialogRef.close();
  }

  handleCancel(): void {
    const canSave =
      this.machine.states[this.currentStageId()].options.exit ===
      EXIT_OPTIONS.Save;

    if (!canSave) return;

    console.log('cancel and close');
    this.dialogRef.close();
  }

  handleLater(): void {
    const canDoLater =
      this.machine.states[this.currentStageId()].options.exit ===
      EXIT_OPTIONS.Later;

    if (!canDoLater) return;

    console.log('close and complete later');
    this.dialogRef.close();
  }
}
