import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationGroupComponent } from './navigation-group.component';

describe('NavigationGroupComponent', () => {
  it('should assign each instance a unique key', async () => {
    await TestBed.configureTestingModule({ imports: [NavigationGroupComponent] }).compileComponents();
    const fixture1: ComponentFixture<NavigationGroupComponent> = TestBed.createComponent(NavigationGroupComponent);
    const fixture2: ComponentFixture<NavigationGroupComponent> = TestBed.createComponent(NavigationGroupComponent);
    fixture1.detectChanges();
    fixture2.detectChanges();

    expect(fixture1.componentInstance.key()).not.toBe(fixture2.componentInstance.key());
  });
});
