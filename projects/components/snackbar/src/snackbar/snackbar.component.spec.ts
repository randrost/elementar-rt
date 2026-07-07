import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnackbarComponent } from './snackbar.component';

describe('SnackbarComponent', () => {
  let fixture: ComponentFixture<SnackbarComponent>;
  let component: SnackbarComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [SnackbarComponent] }).compileComponents();
    fixture = TestBed.createComponent(SnackbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render the message and default variant attribute', () => {
    fixture.componentRef.setInput('message', 'Saved successfully');
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.snackbar-message').textContent.trim()).toBe('Saved successfully');
    expect(fixture.nativeElement.getAttribute('data-variant')).toBe('default');
  });

  it('should only render an action button when an action label is provided', () => {
    expect(fixture.nativeElement.querySelector('.snackbar-action')).toBeNull();

    fixture.componentRef.setInput('action', 'Undo');
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.snackbar-action').textContent.trim()).toBe('Undo');
  });

  it('should emit actionClick when the action button is clicked', () => {
    fixture.componentRef.setInput('action', 'Undo');
    fixture.detectChanges();
    const emitted: void[] = [];
    component.actionClick.subscribe(() => emitted.push(undefined));

    fixture.nativeElement.querySelector('.snackbar-action').click();

    expect(emitted.length).toBe(1);
  });

  it('should emit dismissed when the close button is clicked', () => {
    const emitted: void[] = [];
    component.dismissed.subscribe(() => emitted.push(undefined));

    fixture.nativeElement.querySelector('.snackbar-close').click();

    expect(emitted.length).toBe(1);
  });
});
