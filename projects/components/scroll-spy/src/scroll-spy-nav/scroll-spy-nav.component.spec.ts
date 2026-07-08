import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrollSpyNavComponent } from './scroll-spy-nav.component';
import { ScrollSpyOnComponent } from '../scroll-spy-on/scroll-spy-on.component';

@Component({
  standalone: true,
  imports: [ScrollSpyNavComponent, ScrollSpyOnComponent],
  template: `
    <div class="emr-layout-body" style="height:100px; overflow:auto;">
      <div id="section-a" style="height:50px;margin-top:0;"></div>
      <div id="section-b" style="height:50px;margin-top:0;"></div>
    </div>
    <nav emr-scroll-spy-nav>
      <a emr-scroll-spy-on targetId="section-a">A</a>
      <a emr-scroll-spy-on targetId="section-b">B</a>
    </nav>
  `,
})
class HostComponent {
  @ViewChild(ScrollSpyNavComponent) nav!: ScrollSpyNavComponent;
}

describe('ScrollSpyNavComponent', () => {
  let fixture: ComponentFixture<HostComponent>;
  let nav: ScrollSpyNavComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HostComponent] });
    fixture = TestBed.createComponent(HostComponent);
    document.body.appendChild(fixture.nativeElement);
    fixture.detectChanges();
    nav = fixture.componentInstance.nav;
  });

  afterEach(() => {
    fixture.nativeElement.remove();
  });

  it('should register the projected scroll-spy items', () => {
    expect((nav as any)._items().length).toBe(2);
  });

  it('should scroll the layout body to the target section and mark it active', () => {
    const layoutBody = fixture.nativeElement.querySelector('.emr-layout-body') as HTMLElement;
    const scrollSpy = spyOn(layoutBody, 'scroll');

    nav.scrollTo('section-b');

    expect(nav.activeId).toBe('section-b');
    expect(scrollSpy).toHaveBeenCalled();
    const args = scrollSpy.calls.mostRecent().args[0] as ScrollToOptions;
    expect(args.behavior).toBe('smooth');
  });

  it('should do nothing when there is no scrollable layout body ancestor', () => {
    // Simulate the "no scroll container found" path directly, since it's set
    // once during ngAfterContentInit based on document structure.
    (nav as any)._elementToScroll = undefined;
    expect(() => nav.scrollTo('section-a')).not.toThrow();
    expect(nav.activeId).toBeUndefined();
  });
});
