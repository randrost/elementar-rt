import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuItemComponent } from './menu-item.component';

describe('MenuItemComponent', () => {
  let fixture: ComponentFixture<MenuItemComponent>;
  let component: MenuItemComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [MenuItemComponent] }).compileComponents();
    fixture = TestBed.createComponent(MenuItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should emit itemClick when clicked and enabled', () => {
    const emitted: void[] = [];
    component.itemClick.subscribe(() => emitted.push(undefined));
    (component as any)._onClick();
    expect(emitted.length).toBe(1);
  });

  it('should not emit itemClick when disabled', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    const emitted: void[] = [];
    component.itemClick.subscribe(() => emitted.push(undefined));
    (component as any)._onClick();
    expect(emitted.length).toBe(0);
  });

  it('should reflect disabled/danger state via host classes', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.componentRef.setInput('danger', true);
    fixture.detectChanges();
    expect(fixture.nativeElement.classList.contains('is-disabled')).toBe(true);
    expect(fixture.nativeElement.classList.contains('is-danger')).toBe(true);
  });
});
