import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavComponent, SidenavContainerComponent } from './sidenav.component';

describe('SidenavComponent', () => {
  let fixture: ComponentFixture<SidenavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [SidenavComponent] }).compileComponents();
    fixture = TestBed.createComponent(SidenavComponent);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });
});

describe('SidenavContainerComponent', () => {
  let fixture: ComponentFixture<SidenavContainerComponent>;
  let component: SidenavContainerComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [SidenavContainerComponent] }).compileComponents();
    fixture = TestBed.createComponent(SidenavContainerComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('autoOpenBreakpoint', 0);
    fixture.detectChanges();
  });

  it('should default to the side mode and be open', () => {
    expect(fixture.nativeElement.getAttribute('data-mode')).toBe('side');
    expect(fixture.nativeElement.getAttribute('data-open')).toBe('true');
  });

  it('should open/close/toggle and emit openedChange', () => {
    const emitted: boolean[] = [];
    component.openedChange.subscribe(v => emitted.push(v));

    component.close();
    fixture.detectChanges();
    expect(fixture.nativeElement.getAttribute('data-open')).toBeNull();

    component.open();
    fixture.detectChanges();
    expect(fixture.nativeElement.getAttribute('data-open')).toBe('true');

    component.toggle();
    fixture.detectChanges();
    expect(fixture.nativeElement.getAttribute('data-open')).toBeNull();

    expect(emitted).toEqual([false, true, false]);
  });

  it('should close on backdrop click only in overlay mode', () => {
    (component as any)._onBackdropClick();
    expect((component as any)._open()).toBe(true);

    fixture.componentRef.setInput('mode', 'overlay');
    fixture.detectChanges();
    (component as any)._onBackdropClick();
    expect((component as any)._open()).toBe(false);
  });
});
