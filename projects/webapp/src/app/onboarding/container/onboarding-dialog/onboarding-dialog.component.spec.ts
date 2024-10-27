import { TestBed } from '@angular/core/testing';
import { OnboardingDialogComponent } from './onboarding-dialog.component';

describe('OnboardingDialogComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OnboardingDialogComponent],
    }).compileComponents();
  });

  xit('should create the component', () => {});

  xit('should tranisition through the multistage form correctly', () => {
    // test the machine
    // check each step contains the mocked version of the step component
  });
});
