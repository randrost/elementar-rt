import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingComponent } from './rating.component';

describe('RatingComponent', () => {
  let fixture: ComponentFixture<RatingComponent>;
  let component: RatingComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [RatingComponent] }).compileComponents();
    fixture = TestBed.createComponent(RatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should generate a star array matching max', () => {
    fixture.componentRef.setInput('max', 3);
    fixture.detectChanges();
    expect((component as any)._stars()).toEqual([1, 2, 3]);
  });

  it('should select a value and propagate it through the CVA', () => {
    const onChange = jasmine.createSpy('onChange');
    component.registerOnChange(onChange);
    const emitted: number[] = [];
    component.ratingChange.subscribe((v) => emitted.push(v));

    const rect = { left: 0, width: 20 } as DOMRect;
    (component as any)._onSelect(3, { clientX: 15, currentTarget: { getBoundingClientRect: () => rect } });

    expect(onChange).toHaveBeenCalledWith(3);
    expect(emitted).toEqual([3]);
  });

  it('should select a half-star value when allowHalf is enabled and the click is on the left half', () => {
    fixture.componentRef.setInput('allowHalf', true);
    fixture.detectChanges();
    const rect = { left: 0, width: 20 } as DOMRect;
    (component as any)._onSelect(3, { clientX: 5, currentTarget: { getBoundingClientRect: () => rect } });
    expect((component as any)._value()).toBe(2.5);
  });

  it('should ignore selection when disabled', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    const emitted: number[] = [];
    component.ratingChange.subscribe((v) => emitted.push(v));
    (component as any)._onSelect(3, { clientX: 15, currentTarget: { getBoundingClientRect: () => ({ left: 0, width: 20 }) } });
    expect(emitted).toEqual([]);
  });

  it('should report full/half/empty star fill based on the current value', () => {
    component.writeValue(2.5);
    fixture.componentRef.setInput('allowHalf', true);
    fixture.detectChanges();
    expect((component as any)._getStarFill(2)).toBe('full');
    expect((component as any)._getStarFill(3)).toBe('half');
    expect((component as any)._getStarFill(4)).toBe('empty');
  });

  it('should show the hovered value while hovering, then revert on mouse leave', () => {
    (component as any)._onMouseMove(4, { currentTarget: { getBoundingClientRect: () => ({ left: 0, width: 20 }) }, clientX: 15 });
    expect((component as any)._displayValue()).toBe(4);
    (component as any)._onMouseLeave();
    expect((component as any)._displayValue()).toBe(0);
  });

  it('should restore a written value via the CVA', () => {
    component.writeValue(4);
    expect((component as any)._value()).toBe(4);
    component.writeValue(null as any);
    expect((component as any)._value()).toBe(0);
  });
});
