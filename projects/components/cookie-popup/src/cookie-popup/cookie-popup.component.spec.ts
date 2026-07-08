import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OverlayContainer } from '@angular/cdk/overlay';

import { CookiePopupComponent } from './cookie-popup.component';

describe('CookiePopupComponent', () => {
  let fixture: ComponentFixture<CookiePopupComponent>;
  let component: CookiePopupComponent;
  let overlayContainerEl: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [CookiePopupComponent] }).compileComponents();
    fixture = TestBed.createComponent(CookiePopupComponent);
    component = fixture.componentInstance;
    overlayContainerEl = TestBed.inject(OverlayContainer).getContainerElement();
    fixture.detectChanges();
  });

  afterEach(() => {
    TestBed.inject(OverlayContainer).ngOnDestroy();
  });

  it('should show the popup in an overlay by default', () => {
    expect(overlayContainerEl.querySelector('button')).not.toBeNull();
  });

  it('should hide the overlay when visible is set to false', () => {
    fixture.componentRef.setInput('visible', false);
    fixture.detectChanges();

    expect(overlayContainerEl.querySelector('button')).toBeNull();
  });

  it('should emit "necessary" and hide when accepting necessary cookies only', () => {
    const emitted: string[] = [];
    component.cookieAccepted.subscribe(v => emitted.push(v));

    component.acceptNecessaryCookiesOnly();
    fixture.detectChanges();

    expect(emitted).toEqual(['necessary']);
    expect(overlayContainerEl.querySelector('button')).toBeNull();
  });

  it('should emit "all" and hide when accepting all cookies', () => {
    const emitted: string[] = [];
    component.cookieAccepted.subscribe(v => emitted.push(v));

    component.acceptAllCookies();
    fixture.detectChanges();

    expect(emitted).toEqual(['all']);
    expect(overlayContainerEl.querySelector('button')).toBeNull();
  });
});
