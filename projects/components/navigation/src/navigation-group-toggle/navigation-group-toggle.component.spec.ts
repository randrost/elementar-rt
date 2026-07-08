import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationGroupComponent } from '../navigation-group/navigation-group.component';
import { NavigationGroupToggleComponent } from './navigation-group-toggle.component';
import { NavigationStore } from '../navigation.store';

@Component({
  imports: [NavigationGroupComponent, NavigationGroupToggleComponent],
  template: `
    <emr-navigation-group>
      <emr-navigation-group-toggle>Toggle</emr-navigation-group-toggle>
    </emr-navigation-group>
  `,
  providers: [NavigationStore]
})
class HostComponent {}

describe('NavigationGroupToggleComponent', () => {
  let fixture: ComponentFixture<HostComponent>;
  let store: InstanceType<typeof NavigationStore>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [HostComponent] }).compileComponents();
    fixture = TestBed.createComponent(HostComponent);
    store = fixture.debugElement.injector.get(NavigationStore);
    fixture.detectChanges();
  });

  it('should activate the parent group on click and deactivate it on a second click', () => {
    const toggle = fixture.nativeElement.querySelector('emr-navigation-group-toggle');
    const group = fixture.debugElement.children[0].componentInstance as NavigationGroupComponent;

    toggle.click();
    fixture.detectChanges();
    expect(store.activeGroupKey()).toBe(group.key());
    expect(toggle.classList.contains('is-active')).toBe(true);

    toggle.click();
    fixture.detectChanges();
    expect(store.activeGroupKey()).toBeNull();
    expect(toggle.classList.contains('is-active')).toBe(false);
  });
});
