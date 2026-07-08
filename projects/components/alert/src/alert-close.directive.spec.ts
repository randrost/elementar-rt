import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertComponent } from './alert/alert.component';
import { AlertCloseDirective } from './alert-close.directive';

@Component({
  imports: [AlertComponent, AlertCloseDirective],
  template: `<emr-alert><button emrAlertClose>close</button></emr-alert>`
})
class HostComponent {}

describe('AlertCloseDirective', () => {
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [HostComponent] }).compileComponents();
    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
  });

  it('should close the parent alert when clicked', () => {
    const alert = fixture.debugElement.children[0].componentInstance as AlertComponent;
    spyOn(alert as any, '_close').and.callThrough();

    fixture.nativeElement.querySelector('button').click();

    expect((alert as any)._close).toHaveBeenCalled();
  });
});
