import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuComponent } from './menu.component';

describe('MenuComponent', () => {
  let fixture: ComponentFixture<MenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [MenuComponent] }).compileComponents();
    fixture = TestBed.createComponent(MenuComponent);
    fixture.detectChanges();
  });

  it('should expose a menu role and reflect the open input as a host class', () => {
    expect(fixture.nativeElement.getAttribute('role')).toBe('menu');
    expect(fixture.nativeElement.classList.contains('is-open')).toBe(false);

    fixture.componentRef.setInput('open', true);
    fixture.detectChanges();

    expect(fixture.nativeElement.classList.contains('is-open')).toBe(true);
  });
});
