import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpandComponent } from './expand.component';

describe('ExpandComponent', () => {
  let fixture: ComponentFixture<ExpandComponent>;
  let component: ExpandComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [ExpandComponent] }).compileComponents();
    fixture = TestBed.createComponent(ExpandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should toggle expanded state and emit expandedChange via the api', () => {
    const emitted: boolean[] = [];
    component.expandedChange.subscribe(v => emitted.push(v));

    component.api.toggle();
    fixture.detectChanges();
    expect(fixture.nativeElement.classList.contains('is-expanded')).toBe(true);
    expect(emitted).toEqual([true]);

    component.api.toggle();
    fixture.detectChanges();
    expect(fixture.nativeElement.classList.contains('is-expanded')).toBe(false);
    expect(emitted).toEqual([true, false]);
  });

  it('should expand and collapse explicitly via the api', () => {
    component.api.expand();
    fixture.detectChanges();
    expect(fixture.nativeElement.classList.contains('is-expanded')).toBe(true);

    component.api.collapse();
    fixture.detectChanges();
    expect(fixture.nativeElement.classList.contains('is-expanded')).toBe(false);
  });

  it('should reflect the expanded input as the initial state', () => {
    const fixture2 = TestBed.createComponent(ExpandComponent);
    fixture2.componentRef.setInput('expanded', true);
    fixture2.detectChanges();

    expect(fixture2.nativeElement.classList.contains('is-expanded')).toBe(true);
  });

  it('should apply the color and height as important css custom properties', () => {
    fixture.componentRef.setInput('color', '#fff');
    fixture.componentRef.setInput('height', '400px');
    fixture.detectChanges();

    const style = (fixture.nativeElement as HTMLElement).style;
    expect(style.getPropertyValue('--emr-expand-fade-color')).toBe('#fff');
    expect(style.getPropertyValue('--emr-expand-expanded-height')).toBe('400px');
    expect(style.getPropertyPriority('--emr-expand-fade-color')).toBe('important');
  });
});
