import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuDividerComponent } from './menu-divider.component';

describe('MenuDividerComponent', () => {
  let fixture: ComponentFixture<MenuDividerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [MenuDividerComponent] }).compileComponents();
    fixture = TestBed.createComponent(MenuDividerComponent);
    fixture.detectChanges();
  });

  it('should expose a separator role and host class', () => {
    expect(fixture.nativeElement.getAttribute('role')).toBe('separator');
    expect(fixture.nativeElement.classList.contains('emr-menu-divider')).toBe(true);
  });
});
