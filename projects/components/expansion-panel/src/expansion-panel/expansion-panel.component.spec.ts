import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpansionPanelComponent } from './expansion-panel.component';

describe('ExpansionPanelComponent', () => {
  let fixture: ComponentFixture<ExpansionPanelComponent>;
  let component: ExpansionPanelComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [ExpansionPanelComponent] }).compileComponents();
    fixture = TestBed.createComponent(ExpansionPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should toggle the expanded model and emit expandedChange', () => {
    const emitted: boolean[] = [];
    component.expandedChange.subscribe(v => emitted.push(v));

    (component as any)._toggle();
    fixture.detectChanges();
    expect(component.expanded()).toBe(true);
    expect(fixture.nativeElement.classList.contains('is-expanded')).toBe(true);
    expect(emitted).toEqual([true]);

    (component as any)._toggle();
    fixture.detectChanges();
    expect(component.expanded()).toBe(false);
    expect(emitted).toEqual([true, false]);
  });

  it('should not toggle when disabled', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();

    const emitted: boolean[] = [];
    component.expandedChange.subscribe(v => emitted.push(v));

    (component as any)._toggle();

    expect(component.expanded()).toBe(false);
    expect(emitted).toEqual([]);
    expect(fixture.nativeElement.classList.contains('is-disabled')).toBe(true);
  });
});
