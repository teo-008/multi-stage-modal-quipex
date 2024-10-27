import { TestBed } from '@angular/core/testing';
import { StageAddBuildingConfirmationComponent } from './stage-add-building-confirmation.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';

describe('StageAddBuildingConfirmationComponent', () => {
  it('should create the component', async () => {
    const fixture = await setupTestBed();
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should render the recently completed building name correctly', async () => {
    const fixture = await setupTestBed();

    const fakeBuildingName = 'Fake Building Name';

    // update the building name
    fixture.componentRef.setInput('buildingName', fakeBuildingName);
    fixture.detectChanges();

    const headingEl = fixture.debugElement.query(
      By.css('[data-testid="onboarding-dialog-building"]')
    );
    expect(headingEl.nativeElement).toBeTruthy();

    expect((headingEl.nativeElement as HTMLElement).textContent).toBe(
      fakeBuildingName
    );
  });
});

async function setupTestBed() {
  await TestBed.configureTestingModule({
    imports: [StageAddBuildingConfirmationComponent, NoopAnimationsModule],
  }).compileComponents();

  return TestBed.createComponent(StageAddBuildingConfirmationComponent);
}
