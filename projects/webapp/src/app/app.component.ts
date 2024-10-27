import { DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatDialog } from '@angular/material/dialog';
import { filter, fromEvent } from 'rxjs';

@Component({
  selector: 'div[id="root"]',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '',
})
export class AppComponent implements OnInit {
  title = 'test-app';

  isDialogOpen = signal<boolean>(false);

  private _document = inject(DOCUMENT);
  private _destroyRef = inject(DestroyRef);
  private _dialog = inject(MatDialog);

  ngOnInit() {
    const buttonEl = this._document.querySelector('#dialog-root')!;

    fromEvent(buttonEl, 'click')
      .pipe(
        filter(() => !this.isDialogOpen()),
        takeUntilDestroyed(this._destroyRef)
      )
      .subscribe(() => {
        this._openDialog();
      });
  }

  protected toggleDialogState() {
    this.isDialogOpen.update((value) => !value);
  }

  private async _openDialog(): Promise<void> {
    // lazy load onboarding dialog
    const { OnboardingDialogComponent } = await import('./onboarding');

    // open dialog
    this.toggleDialogState();
    const dialogRef = this._dialog.open(OnboardingDialogComponent, {
      disableClose: true,
    });

    // update dialog state upon close
    dialogRef.afterClosed().subscribe(() => {
      this.toggleDialogState();
    });
  }
}
