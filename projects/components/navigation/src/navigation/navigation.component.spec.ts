import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import { NavigationComponent } from './navigation.component';
import { NavigationItemComponent } from '../navigation-item/navigation-item.component';
import { NavigationStore } from '../navigation.store';

@Component({
  imports: [NavigationComponent, NavigationItemComponent],
  template: `<emr-navigation [activeKey]="activeKey" [appearance]="appearance"><emr-navigation-item key="a">A</emr-navigation-item></emr-navigation>`
})
class HostComponent {
  activeKey: any;
  appearance: any;
}

describe('NavigationComponent', () => {
  let fixture: ComponentFixture<HostComponent>;
  let store: InstanceType<typeof NavigationStore>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [HostComponent] }).compileComponents();
    fixture = TestBed.createComponent(HostComponent);
    store = fixture.debugElement.children[0].injector.get(NavigationStore);
  });

  it('should push the activeKey input into the shared store', () => {
    fixture.componentInstance.activeKey = 'a';
    fixture.detectChanges();

    expect(store.activeKey()).toBe('a');
  });

  it('should reflect the appearance input as a data-appearance host attribute', () => {
    fixture.componentInstance.appearance = 'compact';
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('emr-navigation').getAttribute('data-appearance')).toBe('compact');
  });
});

@Component({
  imports: [NavigationComponent, NavigationItemComponent],
  template: `
    <emr-navigation activateByRoute>
      <a emr-navigation-item key="home" href="/home">Home</a>
      <a emr-navigation-item key="about" href="/about">About</a>
    </emr-navigation>
  `
})
class RouteHostComponent {}

describe('NavigationComponent (activateByRoute)', () => {
  it('should activate the item whose href matches the current location path', async () => {
    await TestBed.configureTestingModule({
      imports: [RouteHostComponent],
      providers: [
        { provide: Location, useValue: { path: () => '/about' } },
        { provide: Router, useValue: { events: new Subject().asObservable() } }
      ]
    }).compileComponents();

    const fixture = TestBed.createComponent(RouteHostComponent);
    fixture.detectChanges();

    const store = fixture.debugElement.children[0].injector.get(NavigationStore);
    expect(store.activeKey()).toBe('about');
  });
});
