import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationListComponent } from './notification-list.component';
import { NotificationDefDirective } from '../notification-def.directive';

@Component({
  imports: [NotificationListComponent, NotificationDefDirective],
  template: `
    <emr-notification-list [static]="false">
      <ng-template emrNotificationDef="comment">Comment tpl</ng-template>
    </emr-notification-list>
  `
})
class HostComponent {
  @ViewChild(NotificationListComponent) list!: NotificationListComponent<any>;
}

describe('NotificationListComponent (no controls def)', () => {
  let fixture: ComponentFixture<HostComponent>;
  let host: HostComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [HostComponent] }).compileComponents();
    fixture = TestBed.createComponent(HostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should return undefined controlsTpl when no controls def was projected', () => {
    expect(host.list.controlsTpl).toBeUndefined();
  });

  it('should reflect the static input as a host class', () => {
    expect(fixture.nativeElement.querySelector('emr-notification-list').classList.contains('is-static')).toBe(false);
  });
});
