import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Subject } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';

import { SplashScreenComponent } from './splash-screen.component';
import { SplashScreenStore } from '../splash-screen.store';

describe('SplashScreenComponent', () => {
  let fixture: ComponentFixture<SplashScreenComponent>;
  let store: InstanceType<typeof SplashScreenStore>;
  let events$: Subject<any>;

  beforeEach(async () => {
    events$ = new Subject();

    await TestBed.configureTestingModule({
      imports: [SplashScreenComponent],
      providers: [
        { provide: Router, useValue: { events: events$.asObservable() } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SplashScreenComponent);
    store = TestBed.inject(SplashScreenStore);
  });

  it('should set the hide-animation-duration css custom property from the animationDuration input', () => {
    // ngOnInit only runs once, so the input must be set before the first
    // change detection for it to be reflected in the css custom property.
    fixture.componentRef.setInput('animationDuration', 250);
    fixture.detectChanges();

    expect((fixture.nativeElement as HTMLElement).style.getPropertyValue('--emr-splash-screen-hide-animation-duration')).toBe('0.25s');
  });

  it('should become visible again and drop the hide class when the store flips back to visible after being hidden', fakeAsync(() => {
    fixture.detectChanges();
    store.hide();
    fixture.detectChanges();
    tick(600);
    expect((fixture.nativeElement as HTMLElement).classList.contains('hide')).toBe(true);

    store.show();
    fixture.detectChanges();

    expect((fixture.nativeElement as HTMLElement).style.visibility).toBe('visible');
    expect((fixture.nativeElement as HTMLElement).classList.contains('hide')).toBe(false);
    tick(600);
  }));

  it('should hide itself automatically after a navigation end plus the hide delay', fakeAsync(() => {
    fixture.componentRef.setInput('hideDelay', 100);
    fixture.detectChanges();

    events$.next(new NavigationEnd(1, '/next', '/next'));
    tick(150);

    expect((fixture.nativeElement as HTMLElement).classList.contains('hide')).toBe(true);
    tick(600);
  }));
});
