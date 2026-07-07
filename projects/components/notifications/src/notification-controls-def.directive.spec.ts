import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotificationControlsDefDirective } from './notification-controls-def.directive';

@Component({
  standalone: true,
  imports: [NotificationControlsDefDirective],
  template: `<ng-template emrNotificationControlsDef></ng-template>`,
})
class HostComponent {
  @ViewChild(NotificationControlsDefDirective) directive!: NotificationControlsDefDirective;
}

describe('NotificationControlsDefDirective', () => {
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
