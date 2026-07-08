import { ApplicationRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { EmrGuidedTour } from './guided-tour.service';

function waitForAnimationFrame(): Promise<void> {
  return new Promise(resolve => requestAnimationFrame(() => resolve()));
}

describe('EmrGuidedTour', () => {
  let service: EmrGuidedTour;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmrGuidedTour);
  });

  afterEach(() => {
    service.stop();
    localStorage.clear();
  });

  it('should report a tour as not completed until localStorage records it', () => {
    expect(service.isCompleted('onboarding')).toBe(false);

    localStorage.setItem('emr-tour-onboarding', 'completed');

    expect(service.isCompleted('onboarding')).toBe(true);
  });

  it('should attach a guided tour overlay to the document body on start', () => {
    service.start([{ target: 'body', title: 'Hi', description: 'Welcome' }]);

    const overlay = document.body.querySelector('.tour-backdrop');
    expect(overlay).not.toBeNull();

    service.stop();
    expect(document.body.querySelector('.tour-backdrop')).toBeNull();
  });

  it('should mark the tour completed in localStorage and remove the overlay when finished', () => {
    service.start([{ target: 'body', title: 'Hi', description: 'Welcome' }], 'onboarding');

    // Drive completion through the DOM (Done button on the last/only step).
    const doneButton = Array.from(document.body.querySelectorAll('.tour-btn')).find(
      (btn: any) => btn.textContent.trim() === 'Done'
    ) as HTMLButtonElement;
    doneButton.click();

    expect(localStorage.getItem('emr-tour-onboarding')).toBe('completed');
    expect(document.body.querySelector('.tour-backdrop')).toBeNull();
  });

  it('should remove the overlay without marking completion when skipped', () => {
    service.start([{ target: 'body', title: 'Hi', description: 'Welcome' }], 'onboarding');

    const skipButton = document.body.querySelector('.tour-btn--skip') as HTMLButtonElement;
    skipButton.click();

    expect(localStorage.getItem('emr-tour-onboarding')).toBeNull();
    expect(document.body.querySelector('.tour-backdrop')).toBeNull();
  });

  it('should replace an existing tour when start is called again', async () => {
    service.start([{ target: 'body', title: 'First', description: 'a' }]);
    service.start([{ target: 'body', title: 'Second', description: 'b' }]);
    await waitForAnimationFrame();
    TestBed.inject(ApplicationRef).tick();

    const overlays = document.body.querySelectorAll('.tour-backdrop');
    expect(overlays.length).toBe(1);
    expect(document.body.querySelector('.tour-title')?.textContent).toContain('Second');
  });
});
