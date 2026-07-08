import { TestBed } from '@angular/core/testing';
import { Subject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

import { ConfirmManager } from './confirm-manager';

describe('ConfirmManager', () => {
  let manager: ConfirmManager;
  let dialog: MatDialog;
  let afterClosed$: Subject<any>;

  beforeEach(() => {
    afterClosed$ = new Subject();
    TestBed.configureTestingModule({ providers: [provideNoopAnimations()] });
    dialog = TestBed.inject(MatDialog);
    spyOn(dialog, 'open').and.returnValue({ afterClosed: () => afterClosed$ } as any);
    manager = TestBed.inject(ConfirmManager);
  });

  it('should open a MatDialog with the given options as data', () => {
    manager.open({ title: 'Delete?', description: 'This cannot be undone.' });
    expect(dialog.open).toHaveBeenCalled();
    const [, config] = (dialog.open as jasmine.Spy).calls.mostRecent().args;
    expect(config.data).toEqual({ title: 'Delete?', description: 'This cannot be undone.' });
    expect(config.disableClose).toBe(true);
  });

  it('should call confirm() on the returned ConfirmRef when the dialog closes truthy', () => {
    const ref = manager.open({ title: 't', description: 'd' });
    const events: string[] = [];
    ref.confirmed.subscribe(() => events.push('confirmed'));
    ref.canceled.subscribe(() => events.push('canceled'));
    afterClosed$.next(true);
    expect(events).toEqual(['confirmed']);
  });

  it('should call cancel() on the returned ConfirmRef when the dialog closes falsy', () => {
    const ref = manager.open({ title: 't', description: 'd' });
    const events: string[] = [];
    ref.confirmed.subscribe(() => events.push('confirmed'));
    ref.canceled.subscribe(() => events.push('canceled'));
    afterClosed$.next(false);
    expect(events).toEqual(['canceled']);
  });
});
