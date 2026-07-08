import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotificationDefDirective } from './notification-def.directive';

@Component({
  standalone: true,
  imports: [NotificationDefDirective],
  template: `<ng-template emrNotificationDef></ng-template>`,
})
class HostComponent {
  @ViewChild(NotificationDefDirective) directive!: NotificationDefDirective;
}

describe('NotificationDefDirective', () => {
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
