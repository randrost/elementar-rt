import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderComponent } from './slider.component';

describe('SliderComponent', () => {
  let fixture: ComponentFixture<SliderComponent>;
  let component: SliderComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [SliderComponent] }).compileComponents();
    fixture = TestBed.createComponent(SliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should update the value and propagate it through the CVA on input', () => {
    const onChange = jasmine.createSpy('onChange');
    component.registerOnChange(onChange);
    (component as any)._onInput({ target: { value: '42' } });
    expect(component.value()).toBe(42);
    expect(onChange).toHaveBeenCalledWith(42);
  });

  it('should update valueHigh when the "high" thumb changes in range mode', () => {
    fixture.componentRef.setInput('range', true);
    fixture.detectChanges();
    const onChange = jasmine.createSpy('onChange');
    component.registerOnChange(onChange);
    (component as any)._onInput({ target: { value: '80' } }, 'high');
    expect(component.valueHigh()).toBe(80);
    expect(onChange).toHaveBeenCalledWith([component.value(), 80]);
  });

  it('should populate value/valueHigh from a two-element array via writeValue', () => {
    component.writeValue([10, 90]);
    expect(component.value()).toBe(10);
    expect(component.valueHigh()).toBe(90);
  });

  it('should populate a single value via writeValue', () => {
    component.writeValue(55);
    expect(component.value()).toBe(55);
  });

  it('should compute the fill style as a percentage of min/max for a single value', () => {
    fixture.componentRef.setInput('min', 0);
    fixture.componentRef.setInput('max', 200);
    component.writeValue(50);
    fixture.detectChanges();
    expect((component as any)._fillStyle).toEqual({ left: '0%', width: '25%' });
  });

  it('should compute the fill style spanning both thumbs in range mode', () => {
    fixture.componentRef.setInput('range', true);
    fixture.componentRef.setInput('min', 0);
    fixture.componentRef.setInput('max', 100);
    component.value.set(20);
    component.valueHigh.set(70);
    fixture.detectChanges();
    expect((component as any)._fillStyle).toEqual({ left: '20%', width: '50%' });
  });
});
