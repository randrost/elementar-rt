import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { DebounceTimeDirective } from './debounce-time.directive';

@Component({
  standalone: true,
  imports: [DebounceTimeDirective, FormsModule],
  template: `<input emrDebounceTime [ngModel]="value">`,
})
class HostComponent {
  value = '';
  @ViewChild(DebounceTimeDirective) directive!: DebounceTimeDirective;
}

describe('DebounceTimeDirective', () => {
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HostComponent],
    });
    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    expect(fixture.componentInstance.directive).toBeTruthy();
  });
});
