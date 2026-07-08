import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Subject } from 'rxjs';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';

import { PageLoadingBarComponent } from './page-loading-bar.component';

describe('PageLoadingBarComponent', () => {
  let fixture: ComponentFixture<PageLoadingBarComponent>;
  let events$: Subject<any>;

  beforeEach(async () => {
    events$ = new Subject();

    await TestBed.configureTestingModule({
      imports: [PageLoadingBarComponent],
      providers: [
        { provide: Router, useValue: { events: events$.asObservable() } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PageLoadingBarComponent);
    fixture.detectChanges();
  });

  it('should become visible when navigation starts and hide once navigation ends', fakeAsync(() => {
    expect(fixture.nativeElement.classList.contains('is-visible')).toBe(false);

    events$.next(new NavigationStart(1, '/next'));
    fixture.detectChanges();
    expect(fixture.nativeElement.classList.contains('is-visible')).toBe(true);

    tick(1500);
    fixture.detectChanges();

    events$.next(new NavigationEnd(1, '/next', '/next'));
    fixture.detectChanges();

    expect((fixture.componentInstance as any).visible).toBe(false);
  }));

  it('should restart progress from zero on a fresh navigation', fakeAsync(() => {
    events$.next(new NavigationStart(1, '/next'));
    fixture.detectChanges();
    tick(1500);

    events$.next(new NavigationStart(2, '/another'));
    fixture.detectChanges();

    expect((fixture.componentInstance as any).value).toBe(0);
    tick(1500);
  }));
});
