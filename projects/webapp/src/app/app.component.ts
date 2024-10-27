import { DOCUMENT } from '@angular/common';
import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatDialog } from '@angular/material/dialog';
import { RouterOutlet } from '@angular/router';
import { filter, fromEvent } from 'rxjs';
import { OnboardingDialogComponent } from './onboarding';

@Component({
  selector: 'div[id="root"]',
  standalone: true,
  imports: [RouterOutlet, OnboardingDialogComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'test-app';

  isDialogOpen = signal<boolean>(false);

  private _document = inject(DOCUMENT);
  private _destroyRef = inject(DestroyRef);
  private _dialog = inject(MatDialog);

  ngOnInit() {
    const buttonEl = this._document.querySelector('#dialog-root')!;

    // fromEvent(buttonEl, 'click')
    //   .pipe(
    //     filter(() => !this.isDialogOpen()),
    //     takeUntilDestroyed(this._destroyRef)
    //   )
    //   .subscribe(() => {
    //     console.log('button clicked');
    //     this.toggleDialogState();
    //     this._openDialog();
    //   });

    this._openDialog();
  }

  toggleDialogState() {
    this.isDialogOpen.update((value) => !value);
  }

  private _openDialog(): void {
    const dialogRef = this._dialog.open(OnboardingDialogComponent, {
      // data: {name: this.name(), animal: this.animal()},
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
      this.toggleDialogState();
    });
  }
}
