import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { NavigationComponent } from '../navigation/navigation.component';
import { NavigationItemComponent } from './navigation-item.component';
import { NavigationGroupComponent } from '../navigation-group/navigation-group.component';
import { NavigationGroupMenuComponent } from '../navigation-group-menu/navigation-group-menu.component';
import { NavigationStore } from '../navigation.store';

@Component({
  imports: [NavigationComponent, NavigationItemComponent, NavigationGroupComponent, NavigationGroupMenuComponent],
  template: `
    <emr-navigation (itemClicked)="onItemClicked($event)">
      <emr-navigation-item key="item-a">A</emr-navigation-item>
      <emr-navigation-group>
        <emr-navigation-group-menu>
          <emr-navigation-item key="item-b">B</emr-navigation-item>
        </emr-navigation-group-menu>
      </emr-navigation-group>
    </emr-navigation>
  `
})
class HostComponent {
  clickedKeys: any[] = [];
  onItemClicked(key: any) { this.clickedKeys.push(key); }
}

describe('NavigationItemComponent', () => {
  let fixture: ComponentFixture<HostComponent>;
  let store: InstanceType<typeof NavigationStore>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [HostComponent] }).compileComponents();
    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    store = fixture.debugElement.children[0].injector.get(NavigationStore);
  });

  it('should mark itself active and emit itemClicked on click, without a parent group', () => {
    const itemA = fixture.nativeElement.querySelectorAll('emr-navigation-item')[0];
    itemA.click();
    fixture.detectChanges();

    expect(fixture.componentInstance.clickedKeys).toEqual(['item-a']);
    expect(itemA.classList.contains('is-active')).toBe(true);
    expect(store.activeGroupKey()).toBeNull();
  });

  it('should set the parent group as the active group when a grouped item is clicked', () => {
    const itemB = fixture.nativeElement.querySelectorAll('emr-navigation-item')[1];
    itemB.click();
    fixture.detectChanges();

    expect(store.activeKey()).toBe('item-b');
    expect(store.activeGroupKey()).not.toBeNull();
  });

});

@Component({
  imports: [NavigationComponent, NavigationItemComponent],
  template: `<emr-navigation><emr-navigation-item key="a" forceActive>A</emr-navigation-item></emr-navigation>`
})
class ForceActiveHostComponent {}

describe('NavigationItemComponent (forceActive)', () => {
  it('should stay active via forceActive even though the store has no matching active key', async () => {
    await TestBed.configureTestingModule({ imports: [ForceActiveHostComponent] }).compileComponents();
    const fixture = TestBed.createComponent(ForceActiveHostComponent);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('emr-navigation-item').classList.contains('is-active')).toBe(true);
  });
});

describe('NavigationItemComponent (default key)', () => {
  @Component({
    imports: [NavigationComponent, NavigationItemComponent],
    template: `<emr-navigation><emr-navigation-item>A</emr-navigation-item><emr-navigation-item>B</emr-navigation-item></emr-navigation>`
  })
  class DefaultKeyHostComponent {}

  it('should assign each item a unique default key when none is provided', async () => {
    await TestBed.configureTestingModule({ imports: [DefaultKeyHostComponent] }).compileComponents();
    const fixture = TestBed.createComponent(DefaultKeyHostComponent);
    fixture.detectChanges();

    const items = fixture.debugElement.queryAll(By.directive(NavigationItemComponent));
    expect(items[0].componentInstance.key()).not.toBe(items[1].componentInstance.key());
  });
});
