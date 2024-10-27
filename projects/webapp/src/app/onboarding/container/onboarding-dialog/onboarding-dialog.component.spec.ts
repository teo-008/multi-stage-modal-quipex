import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OnboardingDialogComponent } from './onboarding-dialog.component';
import { MatDialogRef } from '@angular/material/dialog';
import { Component, DebugElement, input, output } from '@angular/core';
import {
  StageAddBuildingComponent,
  StageAddBuildingConfirmationComponent,
  StageGettingStartedComponent,
} from '../../components';
import { STAGE } from './onboarding-dialog';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'stage-getting-started',
  standalone: true,
  template: '',
})
class FakeStageGettingStartedComponent
  implements Partial<StageGettingStartedComponent>
{
  nextStep = output<void>();
}

@Component({
  selector: 'stage-add-building',
  standalone: true,
  template: '',
})
class FakeStageAddBuildingComponent
  implements Partial<StageAddBuildingComponent>
{
  nextStep = output<string>();
}

@Component({
  selector: 'stage-add-building-confirmation',
  standalone: true,
  template: '',
})
class FakeStageAddBuildingConfirmationComponent
  implements Partial<StageAddBuildingConfirmationComponent>
{
  buildingName = input.required<string>();
  nextStep = output<void>();
}

describe('OnboardingDialogComponent', () => {
  it('should create the component', async () => {
    const fixture = await setupTestBed();
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should tranisition through the multistage form correctly', async () => {
    const fixture = await setupTestBed();
    const component = fixture.componentInstance;
    fixture.autoDetectChanges();

    const gettingStartedEl = fixture.debugElement.query(
      By.directive(FakeStageGettingStartedComponent)
    );
    expect(gettingStartedEl).toBeTruthy();
    const gettingStartedCmp =
      gettingStartedEl.componentInstance as FakeStageGettingStartedComponent;

    const addBuildingEl = fixture.debugElement.query(
      By.directive(FakeStageAddBuildingComponent)
    );
    expect(addBuildingEl).toBeTruthy();
    const addBuildingCmp =
      addBuildingEl.componentInstance as FakeStageAddBuildingComponent;

    const confirmationEl = fixture.debugElement.query(
      By.directive(FakeStageAddBuildingConfirmationComponent)
    );
    expect(confirmationEl).toBeTruthy();
    const confirmationCmp =
      confirmationEl.componentInstance as FakeStageAddBuildingConfirmationComponent;

    // initial stage
    expect(component.currentStageId()).toBe(STAGE.GettingStarted);
    expect(getHeadingElement(fixture)?.textContent?.trim()).toBe(
      'Getting started'
    );

    // simulating transition to the next stage
    gettingStartedCmp.nextStep.emit();
    await fixture.whenStable();

    expect(component.currentStageId()).toBe(STAGE.AddBuilding);
    expect(getHeadingElement(fixture)?.textContent?.trim()).toBe(
      'Create new building manual'
    );

    // simulating transition to the next stage
    // including completion of valid form
    const fakeBuildingName = 'Fake Building Name';
    addBuildingCmp.nextStep.emit(fakeBuildingName);
    await fixture.whenStable();

    expect(component.currentStageId()).toBe(STAGE.AddBuildingConfirmation);
    expect(getHeadingElement(fixture)?.textContent?.trim()).toBe(
      'Create new building manual'
    );

    // simulating transition to the next stage
    confirmationCmp.nextStep.emit();

    const dialogRef = TestBed.inject(MatDialogRef);
    expect(dialogRef.close).toHaveBeenCalled();
  });
});

function getHeadingElement(
  fixture: ComponentFixture<OnboardingDialogComponent>
): HTMLElement | null {
  const headingEl = fixture.debugElement.query(
    By.css('[data-testid="onboarding-dialog-heading"]')
  );

  if (!(headingEl.nativeElement instanceof HTMLElement)) return null;

  return headingEl.nativeElement;
}

async function setupTestBed() {
  const mockDialogRef = jasmine.createSpyObj(MatDialogRef, {
    close: () => {},
  });

  await TestBed.configureTestingModule({
    imports: [OnboardingDialogComponent, NoopAnimationsModule],
    providers: [{ provide: MatDialogRef, useValue: mockDialogRef }],
  })
    .overrideComponent(OnboardingDialogComponent, {
      remove: {
        imports: [
          StageGettingStartedComponent,
          StageAddBuildingComponent,
          StageAddBuildingConfirmationComponent,
        ],
      },
      add: {
        imports: [
          FakeStageGettingStartedComponent,
          FakeStageAddBuildingComponent,
          FakeStageAddBuildingConfirmationComponent,
        ],
      },
    })
    .compileComponents();

  return TestBed.createComponent(OnboardingDialogComponent);
}
