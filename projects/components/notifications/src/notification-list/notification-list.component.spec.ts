import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationListComponent } from './notification-list.component';
import { NotificationDefDirective } from '../notification-def.directive';
import { NotificationControlsDefDirective } from '../notification-controls-def.directive';

@Component({
  imports: [NotificationListComponent, NotificationDefDirective, NotificationControlsDefDirective],
  template: `
    <emr-notification-list>
      <ng-template emrNotificationDef="comment">Comment tpl</ng-template>
      <ng-template emrNotificationDef="like">Like tpl</ng-template>
      <ng-template emrNotificationControlsDef>Controls tpl</ng-template>
    </emr-notification-list>
  `
})
class HostComponent {
  @ViewChild(NotificationListComponent) list!: NotificationListComponent<any>;
}

describe('NotificationListComponent', () => {
  let fixture: ComponentFixture<HostComponent>;
  let host: HostComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [HostComponent] }).compileComponents();
    fixture = TestBed.createComponent(HostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should collect projected notification defs into the defs map keyed by type', () => {
    expect(host.list.getNotificationTemplate('comment')).toBeInstanceOf(TemplateRef);
    expect(host.list.getNotificationTemplate('like')).toBeInstanceOf(TemplateRef);
  });

  it('should throw when asked for a template of an unregistered type', () => {
    expect(() => host.list.getNotificationTemplate('unknown')).toThrowError('Invalid type "unknown" for notification def');
  });

  it('should expose the projected controls template via controlsTpl', () => {
    expect(host.list.controlsTpl).toBeInstanceOf(TemplateRef);
  });
});
