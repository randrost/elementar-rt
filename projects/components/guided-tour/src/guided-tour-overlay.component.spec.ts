import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuidedTourOverlayComponent } from './guided-tour-overlay.component';

function waitForAnimationFrame(): Promise<void> {
  return new Promise(resolve => requestAnimationFrame(() => resolve()));
}

describe('GuidedTourOverlayComponent', () => {
  let fixture: ComponentFixture<GuidedTourOverlayComponent>;
  let component: GuidedTourOverlayComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [GuidedTourOverlayComponent] }).compileComponents();
    fixture = TestBed.createComponent(GuidedTourOverlayComponent);
    component = fixture.componentInstance;
    component.steps = [
      { target: '.step-1', title: 'Step one', description: 'First' },
      { target: '.step-2', title: 'Step two', description: 'Second' },
      { target: '.step-3', title: 'Step three', description: 'Third' },
    ];
    fixture.detectChanges();
  });

  it('should start on the first step and show the step count', async () => {
    // _step (used by .tour-title) is only populated once requestAnimationFrame fires.
    await waitForAnimationFrame();
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.tour-step-count').textContent).toContain('Step 1 of 3');
    expect(fixture.nativeElement.querySelector('.tour-title').textContent).toContain('Step one');
  });

  it('should advance to the next step and back', () => {
    (component as any).next();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.tour-step-count').textContent).toContain('Step 2 of 3');

    (component as any).prev();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.tour-step-count').textContent).toContain('Step 1 of 3');
  });

  it('should not advance past the last step or before the first', () => {
    (component as any).prev();
    fixture.detectChanges();
    expect((component as any)._current()).toBe(0);

    (component as any).next();
    (component as any).next();
    (component as any).next();
    fixture.detectChanges();
    expect((component as any)._current()).toBe(2);
  });

  it('should emit tourComplete when completing the last step', () => {
    const emitted: void[] = [];
    component.tourComplete.subscribe(() => emitted.push(undefined));

    (component as any).complete();

    expect(emitted.length).toBe(1);
  });

  it('should emit tourSkipped when skipping', () => {
    const emitted: void[] = [];
    component.tourSkipped.subscribe(() => emitted.push(undefined));

    (component as any).skip();

    expect(emitted.length).toBe(1);
  });
});
