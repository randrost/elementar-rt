import { Component } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { AlertComponent } from './alert.component';
import { AlertIconDirective } from '../alert-icon.directive';

describe('AlertComponent', () => {
  let fixture: ComponentFixture<AlertComponent>;
  let component: AlertComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [AlertComponent] }).compileComponents();
    fixture = TestBed.createComponent(AlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should reflect the variant input as a host attribute', () => {
    expect(fixture.nativeElement.getAttribute('emr-alert-variant')).toBe('default');

    fixture.componentRef.setInput('variant', 'negative');
    fixture.detectChanges();

    expect(fixture.nativeElement.getAttribute('emr-alert-variant')).toBe('negative');
  });

  it('should reflect the bordered input as a host class', () => {
    fixture.componentRef.setInput('bordered', true);
    fixture.detectChanges();
    expect(fixture.nativeElement.classList.contains('is-bordered')).toBe(true);
  });

  it('should remove itself from the DOM when closed via the api', () => {
    const parent = document.createElement('div');
    parent.appendChild(fixture.nativeElement);
    document.body.appendChild(parent);

    component.api.close();

    expect(parent.contains(fixture.nativeElement)).toBe(false);
    document.body.removeChild(parent);
  });

  it('should emit closed when the alert is closed via the api', () => {
    const closedSpy = jasmine.createSpy('closed');
    component.closed.subscribe(closedSpy);

    component.api.close();

    expect(closedSpy).toHaveBeenCalled();
  });

  it('should auto-close itself after the configured autoClose delay', fakeAsync(() => {
    const parent = document.createElement('div');
    parent.appendChild(fixture.nativeElement);
    document.body.appendChild(parent);

    fixture.componentRef.setInput('autoClose', 100);
    fixture.detectChanges();

    tick(99);
    expect(parent.contains(fixture.nativeElement)).toBe(true);

    tick(1);
    expect(parent.contains(fixture.nativeElement)).toBe(false);

    document.body.removeChild(parent);
  }));

  it('should not schedule an auto-close timer when autoClose is unset', fakeAsync(() => {
    const parent = document.createElement('div');
    parent.appendChild(fixture.nativeElement);
    document.body.appendChild(parent);

    tick(5000);
    expect(parent.contains(fixture.nativeElement)).toBe(true);

    document.body.removeChild(parent);
  }));
});

@Component({
  imports: [AlertComponent, AlertIconDirective],
  template: `<emr-alert><ng-template emrAlertIcon>icon</ng-template></emr-alert>`
})
class IconHostComponent {}

describe('AlertComponent (projected icon)', () => {
  it('should expose a projected icon template via iconRefTemplate', async () => {
    await TestBed.configureTestingModule({ imports: [IconHostComponent] }).compileComponents();
    const hostFixture = TestBed.createComponent(IconHostComponent);
    hostFixture.detectChanges();

    const alert = hostFixture.debugElement.children[0].componentInstance as AlertComponent;
    expect((alert as any).iconRefTemplate).toBeTruthy();
  });
});
