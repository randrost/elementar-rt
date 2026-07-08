import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorPickerInputDirective } from './color-picker-input.directive';

@Component({
  imports: [ColorPickerInputDirective],
  template: `<input inputChange [min]="'0'" [max]="'255'" (inputChange)="onChange($event)"/>`
})
class HostComponent {
  values: number[] = [];
  onChange(v: number) { this.values.push(v); }
}

describe('ColorPickerInputDirective', () => {
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [HostComponent] }).compileComponents();
    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
  });

  it('should emit the numeric value when within min/max range', () => {
    const input = fixture.nativeElement.querySelector('input');
    input.value = '128';
    input.dispatchEvent(new Event('input'));

    expect(fixture.componentInstance.values).toEqual([128]);
  });

  it('should not emit when the value is out of range or not numeric', () => {
    const input = fixture.nativeElement.querySelector('input');
    input.value = '300';
    input.dispatchEvent(new Event('input'));
    input.value = 'abc';
    input.dispatchEvent(new Event('input'));

    expect(fixture.componentInstance.values).toEqual([]);
  });
});
