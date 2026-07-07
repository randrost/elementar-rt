import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import { OverlayScrollbarComponent } from './overlay-scrollbar.component';

function defineDomMetrics(el: HTMLElement, metrics: Partial<Record<'scrollHeight' | 'clientHeight' | 'scrollWidth' | 'clientWidth' | 'scrollTop' | 'scrollLeft', number>>) {
  Object.entries(metrics).forEach(([key, value]) => {
    Object.defineProperty(el, key, { value, configurable: true });
  });
}

describe('OverlayScrollbarComponent', () => {
  let fixture: ComponentFixture<OverlayScrollbarComponent>;
  let component: OverlayScrollbarComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OverlayScrollbarComponent],
      providers: [{ provide: Router, useValue: { events: new Subject().asObservable() } }]
    }).compileComponents();

    fixture = TestBed.createComponent(OverlayScrollbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should not show a vertical scrollbar when content fits within the container', () => {
    const content = (component as any).scrollableContentRef().nativeElement as HTMLElement;
    const trackY = (component as any).scrollTrackRef().nativeElement as HTMLElement;
    defineDomMetrics(content, { scrollHeight: 100, clientHeight: 100, scrollWidth: 100, clientWidth: 100 });
    defineDomMetrics(trackY, { clientHeight: 100 });

    (component as any).updateDimensions();

    expect((component as any).hasScrollY()).toBe(false);
    expect((component as any).isVisible()).toBe(false);
  });

  it('should show a vertical scrollbar sized to the visible ratio when content overflows', () => {
    const content = (component as any).scrollableContentRef().nativeElement as HTMLElement;
    const trackY = (component as any).scrollTrackRef().nativeElement as HTMLElement;
    const trackX = (component as any).scrollTrackXRef().nativeElement as HTMLElement;
    defineDomMetrics(content, { scrollHeight: 400, clientHeight: 100, scrollWidth: 100, clientWidth: 100 });
    defineDomMetrics(trackY, { clientHeight: 100 });
    defineDomMetrics(trackX, { clientWidth: 100 });

    (component as any).updateDimensions();

    expect((component as any).hasScrollY()).toBe(true);
    // ratio = 100/400 = 0.25, thumbHeight = max(100*0.25, minThumbHeight(20)) = 25
    expect((component as any).thumbHeight()).toBe(25);
  });

  it('should enforce a minimum thumb height for very long content', () => {
    const content = (component as any).scrollableContentRef().nativeElement as HTMLElement;
    const trackY = (component as any).scrollTrackRef().nativeElement as HTMLElement;
    defineDomMetrics(content, { scrollHeight: 100000, clientHeight: 100, scrollWidth: 100, clientWidth: 100 });
    defineDomMetrics(trackY, { clientHeight: 100 });

    (component as any).updateDimensions();

    expect((component as any).thumbHeight()).toBe((component as any).minThumbHeight);
  });

  it('should position the thumb proportionally to the current scroll offset', () => {
    const content = (component as any).scrollableContentRef().nativeElement as HTMLElement;
    const trackY = (component as any).scrollTrackRef().nativeElement as HTMLElement;
    defineDomMetrics(content, { scrollHeight: 300, clientHeight: 100, scrollWidth: 100, clientWidth: 100, scrollTop: 100 });
    defineDomMetrics(trackY, { clientHeight: 100 });

    (component as any).updateDimensions();

    // maxScrollTop = 300-100 = 200, thumbHeight = max(100*(100/300), 20) ~ 33.33, maxThumbTop = 100-33.33 = 66.67
    // thumbTop = (100/200) * 66.67 = 33.33
    expect((component as any).thumbTop()).toBeCloseTo(33.33, 1);
  });

  it('should become visible on hover when autoHide is enabled and there is overflow', () => {
    const content = (component as any).scrollableContentRef().nativeElement as HTMLElement;
    const trackY = (component as any).scrollTrackRef().nativeElement as HTMLElement;
    defineDomMetrics(content, { scrollHeight: 400, clientHeight: 100, scrollWidth: 100, clientWidth: 100 });
    defineDomMetrics(trackY, { clientHeight: 100 });
    (component as any).updateDimensions();

    expect((component as any).isVisible()).toBe(false);

    fixture.nativeElement.dispatchEvent(new MouseEvent('mouseenter'));

    expect((component as any).isHovering()).toBe(true);
    expect((component as any).isVisible()).toBe(true);
  });

  it('should always be visible when autoHide is disabled and there is overflow', () => {
    fixture.componentRef.setInput('autoHide', false);
    fixture.detectChanges();

    const content = (component as any).scrollableContentRef().nativeElement as HTMLElement;
    const trackY = (component as any).scrollTrackRef().nativeElement as HTMLElement;
    defineDomMetrics(content, { scrollHeight: 400, clientHeight: 100, scrollWidth: 100, clientWidth: 100 });
    defineDomMetrics(trackY, { clientHeight: 100 });
    (component as any).updateDimensions();

    expect((component as any).isVisible()).toBe(true);
  });

  it('should reflect the absolute input as a host class', () => {
    expect(fixture.nativeElement.classList.contains('is-absolute')).toBe(true);

    fixture.componentRef.setInput('absolute', false);
    fixture.detectChanges();

    expect(fixture.nativeElement.classList.contains('is-absolute')).toBe(false);
  });
});
