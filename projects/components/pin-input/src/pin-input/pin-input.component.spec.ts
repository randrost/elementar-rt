import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { PinInputComponent } from './pin-input.component';

describe('PinInputComponent', () => {
  let fixture: ComponentFixture<PinInputComponent>;
  let component: PinInputComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [PinInputComponent] }).compileComponents();
    fixture = TestBed.createComponent(PinInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render one form control per digit of the configured length', () => {
    expect(component.controls.length).toBe(4);
  });

  it('should render a custom number of inputs when length is set', () => {
    // length is only read during ngOnInit, so it must be set before the
    // first change detection pass runs.
    const freshFixture = TestBed.createComponent(PinInputComponent);
    freshFixture.componentRef.setInput('length', 6);
    freshFixture.detectChanges();
    expect(freshFixture.componentInstance.controls.length).toBe(6);
  });

  it('should populate each digit control from writeValue', () => {
    component.writeValue('1234');
    expect(component.controls.map((c) => c.value)).toEqual(['1', '2', '3', '4']);
  });

  it('should clear all controls when writeValue is called with a falsy value', () => {
    component.writeValue('1234');
    component.writeValue(null);
    expect(component.controls.map((c) => c.value)).toEqual(['', '', '', '']);
  });

  it('should reject digits that fail the acceptOnly pattern', () => {
    component.writeValue('1a34');
    expect(component.controls.map((c) => c.value)).toEqual(['1', '', '3', '4']);
  });

  it('should call the registered onChange callback with the numeric joined value on key input', () => {
    const onChange = jasmine.createSpy('onChange');
    component.registerOnChange(onChange);
    const inputs = fixture.debugElement.queryAll(By.css('input'));
    const firstInput = inputs[0].nativeElement as HTMLInputElement;

    // The key listener is a host binding on the component's own root element,
    // so the event must bubble up from the child input.
    firstInput.dispatchEvent(new KeyboardEvent('keyup', { key: '5', bubbles: true }));
    expect(onChange).toHaveBeenCalled();
  });

  it('should mark the component disabled via setDisabledState', () => {
    component.setDisabledState(true);
    expect((component as any).isDisabled()).toBe(true);
  });
});
