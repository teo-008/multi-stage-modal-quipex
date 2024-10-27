import { TestBed } from '@angular/core/testing';
import { StageAddBuildingComponent } from './stage-add-building.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('StageAddBuildingComponent', () => {
  it('should create the component', async () => {
    const fixture = await setupTestBed();
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should correctly submit the form', async () => {
    const fixture = await setupTestBed();
    fixture.autoDetectChanges();

    const manualModeBtn = fixture.debugElement.query(
      By.css('[data-testid="onboarding-dialog-manual-mode"]')
    );
    expect(manualModeBtn).toBeTruthy();

    manualModeBtn.triggerEventHandler('click', null);

    await fixture.whenStable();

    // update form inputs
    const address1Input = fixture.debugElement.query(
      By.css('[formControlName="address1"]')
    );
    const fakeStreet = 'Fake Street';
    type(address1Input, fakeStreet);

    await fixture.whenStable();

    const suburbInput = fixture.debugElement.query(
      By.css('[formControlName="suburb"]')
    );
    const fakeSuburb = 'Fake Suburb';
    type(suburbInput, fakeSuburb);

    await fixture.whenStable();

    const stateInput = fixture.debugElement.query(
      By.css('[formControlName="state"]')
    );
    stateInput.nativeElement.click();

    const stateOptions = fixture.debugElement.parent?.queryAll(
      By.css('mat-option')
    );
    stateOptions?.[1].nativeElement.click();

    await fixture.whenStable();

    const postcodeInput = fixture.debugElement.query(
      By.css('[formControlName="postcode"]')
    );
    const fakePostcode = '2000';
    type(postcodeInput, fakePostcode);

    // submit form
    const submitBtn = fixture.debugElement.query(
      By.css('[data-testid="onboarding-dialog-next"]')
    );
    expect(submitBtn).toBeTruthy();

    const spyNextStep = spyOn(
      fixture.componentInstance.nextStep,
      'emit'
    ).and.callThrough();

    submitBtn.triggerEventHandler('click', null);

    const fakeBuildingName = 'Fake Street Fake Suburb';
    expect(spyNextStep).toHaveBeenCalledWith(fakeBuildingName);
  });

  it('should not submit the form when postcode is invalid', async () => {
    const fixture = await setupTestBed();
    fixture.autoDetectChanges();

    const manualModeBtn = fixture.debugElement.query(
      By.css('[data-testid="onboarding-dialog-manual-mode"]')
    );
    expect(manualModeBtn).toBeTruthy();

    manualModeBtn.triggerEventHandler('click', null);

    await fixture.whenStable();

    const postcodeInput = fixture.debugElement.query(
      By.css('[formControlName="postcode"]')
    );
    const fakePostcode = 'invalid';
    type(postcodeInput, fakePostcode);

    // submit form
    const submitBtn = fixture.debugElement.query(
      By.css('[data-testid="onboarding-dialog-next"]')
    );
    expect(submitBtn).toBeTruthy();

    const spyNextStep = spyOn(
      fixture.componentInstance.nextStep,
      'emit'
    ).and.callThrough();

    submitBtn.triggerEventHandler('click', null);
    await fixture.whenStable();

    expect(spyNextStep).not.toHaveBeenCalled();
  });
});

function type(debugElement: DebugElement, value: string) {
  if (!(debugElement.nativeElement instanceof HTMLInputElement)) return;

  debugElement.nativeElement.value = value;

  const event = new Event('input', { bubbles: false });
  debugElement.nativeElement.dispatchEvent(event);
}

async function setupTestBed() {
  await TestBed.configureTestingModule({
    imports: [StageAddBuildingComponent, NoopAnimationsModule],
  }).compileComponents();

  return TestBed.createComponent(StageAddBuildingComponent);
}
