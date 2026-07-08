import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuComponent } from './menu/menu.component';
import { MenuTriggerDirective } from './menu-trigger.directive';

@Component({
  standalone: true,
  imports: [MenuComponent, MenuTriggerDirective],
  template: `
    <button [emrMenuTrigger]="menu">Open</button>
    <emr-menu #menu></emr-menu>
  `,
})
class HostComponent {
  @ViewChild(MenuTriggerDirective) trigger!: MenuTriggerDirective;
}

describe('MenuTriggerDirective', () => {
  let fixture: ComponentFixture<HostComponent>;
  let button: HTMLButtonElement;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HostComponent] });
    fixture = TestBed.createComponent(HostComponent);
    document.body.appendChild(fixture.nativeElement);
    fixture.detectChanges();
    button = fixture.nativeElement.querySelector('button');
  });

  afterEach(() => {
    fixture.nativeElement.remove();
  });

  it('should open on click and close on a second click', () => {
    button.click();
    expect(fixture.componentInstance.trigger.isOpen()).toBe(true);
    button.click();
    expect(fixture.componentInstance.trigger.isOpen()).toBe(false);
  });

  it('should close when clicking outside the trigger element', () => {
    button.click();
    expect(fixture.componentInstance.trigger.isOpen()).toBe(true);
    document.body.click();
    expect(fixture.componentInstance.trigger.isOpen()).toBe(false);
  });
});
