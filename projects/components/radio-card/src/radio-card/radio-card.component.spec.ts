import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RadioCardGroupComponent } from '../radio-card-group/radio-card-group.component';
import { RadioCardComponent } from './radio-card.component';

@Component({
  standalone: true,
  imports: [RadioCardComponent, RadioCardGroupComponent],
  template: `<emr-radio-card-group><emr-radio-card [value]="'a'"></emr-radio-card></emr-radio-card-group>`,
})
class HostComponent {
  @ViewChild(RadioCardComponent) directive!: RadioCardComponent;
}

describe('RadioCardComponent', () => {
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
