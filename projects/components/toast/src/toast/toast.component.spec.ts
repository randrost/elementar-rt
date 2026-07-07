import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { ToastComponent } from './toast.component';

describe('ToastComponent', () => {
  let fixture: ComponentFixture<ToastComponent>;
  let component: ToastComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [ToastComponent] }).compileComponents();
    fixture = TestBed.createComponent(ToastComponent);
    component = fixture.componentInstance;
  });

  it('should emit dismissed once the configured duration elapses', fakeAsync(() => {
    fixture.componentRef.setInput('duration', 200);
    fixture.detectChanges();
    let dismissed = false;
    component.dismissed.subscribe(() => (dismissed = true));
    tick(199);
    expect(dismissed).toBe(false);
    tick(1);
    expect(dismissed).toBe(true);
  }));

  it('should count progress down to 0 over the duration', fakeAsync(() => {
    fixture.componentRef.setInput('duration', 200);
    fixture.detectChanges();
    tick(200);
    expect((component as any)._progress()).toBe(0);
    tick(1); // let the dismissed timer fire so nothing is left pending
  }));

  it('should not start a timer when duration is 0', fakeAsync(() => {
    fixture.componentRef.setInput('duration', 0);
    fixture.detectChanges();
    let dismissed = false;
    component.dismissed.subscribe(() => (dismissed = true));
    tick(10000);
    expect(dismissed).toBe(false);
  }));

  it('should emit dismissed immediately when manually dismissed', fakeAsync(() => {
    fixture.componentRef.setInput('duration', 5000);
    fixture.detectChanges();
    let dismissed = false;
    component.dismissed.subscribe(() => (dismissed = true));
    (component as any)._dismiss();
    expect(dismissed).toBe(true);
    tick(5000); // ensure the original timer was cleared and doesn't double-fire
  }));
});
