import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { By } from '@angular/platform-browser';
import { OnboardingDialogComponent } from './onboarding';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('AppComponent', () => {
  it('should create the app', async () => {
    const fixture = await setupTestBed();
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should open onboarding dialog after button click', async () => {
    const fixture = await setupTestBed();
    fixture.autoDetectChanges();

    const buttonEl = fixture.debugElement.query(By.css('#dialog-root'));
    expect(buttonEl).toBeTruthy();

    // since angular is not aware of the native element click event
    // button.triggerEventHandler('click', null) won't work
    buttonEl.nativeElement.click();

    await fixture.whenStable();

    // since dialog portal is mounted as sibling to debugElement
    const dialogEl = fixture.debugElement?.parent?.query(
      By.directive(OnboardingDialogComponent)
    );
    expect(dialogEl).toBeTruthy();
  });
});

async function setupTestBed() {
  await TestBed.configureTestingModule({
    imports: [AppComponent, NoopAnimationsModule],
  })
    // overriding the template with that of the entry html file
    // since AppComponent is templateless
    .overrideTemplate(
      AppComponent,
      '<button id="dialog-root">Start onboarding</button>'
    )
    .compileComponents();

  return TestBed.createComponent(AppComponent);
}
