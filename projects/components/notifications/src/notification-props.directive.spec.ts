import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotificationPropsDirective } from './notification-props.directive';

@Component({
  standalone: true,
  imports: [NotificationPropsDirective],
  template: `<div emrNotificationProps></div>`,
})
class HostComponent {
  @ViewChild(NotificationPropsDirective) directive!: NotificationPropsDirective;
}

describe('NotificationPropsDirective', () => {
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
