import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationBarComponent } from './navigation-bar.component';
import { NavigationBarItemComponent } from '../navigation-bar-item/navigation-bar-item.component';
import { NavigationBarItemIconDirective } from '../navigation-bar-item-icon.directive';

@Component({
  imports: [NavigationBarComponent, NavigationBarItemComponent, NavigationBarItemIconDirective],
  template: `
    <emr-navigation-bar [(activeKey)]="activeKey" [wide]="wide()">
      <button emr-navigation-bar-item key="home"><i emrNavigationBarItemIcon>home</i>Home</button>
      <button emr-navigation-bar-item key="search"><i emrNavigationBarItemIcon>search</i>Search</button>
      <button emr-navigation-bar-item [active]="forced()"><i emrNavigationBarItemIcon>person</i>Profile</button>
    </emr-navigation-bar>
  `
})
class TestHostComponent {
  activeKey = signal<unknown>('home');
  wide = signal(false);
  forced = signal<boolean | undefined>(undefined);
}

describe('NavigationBarComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let host: TestHostComponent;

  const items = (): HTMLElement[] =>
    Array.from(fixture.nativeElement.querySelectorAll('.emr-navigation-bar-item'));

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should mark the item matching activeKey as active', () => {
    expect(items()[0].classList).toContain('is-active');
    expect(items()[0].getAttribute('aria-current')).toBe('page');
    expect(items()[1].classList).not.toContain('is-active');
  });

  it('should activate an item on click and update the two-way binding', () => {
    items()[1].click();
    fixture.detectChanges();
    expect(host.activeKey()).toBe('search');
    expect(items()[1].classList).toContain('is-active');
    expect(items()[0].classList).not.toContain('is-active');
  });

  it('should let the active input override key matching', () => {
    host.forced.set(true);
    fixture.detectChanges();
    expect(items()[2].classList).toContain('is-active');
  });

  it('should not change activeKey when an item without key is clicked', () => {
    items()[2].click();
    fixture.detectChanges();
    expect(host.activeKey()).toBe('home');
  });

  it('should toggle the wide layout', () => {
    const bar: HTMLElement = fixture.nativeElement.querySelector('emr-navigation-bar');
    expect(bar.classList).not.toContain('is-wide');
    host.wide.set(true);
    fixture.detectChanges();
    expect(bar.classList).toContain('is-wide');
  });
});
