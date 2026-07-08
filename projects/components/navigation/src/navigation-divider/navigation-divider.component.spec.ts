import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationDividerComponent } from './navigation-divider.component';

describe('NavigationDividerComponent', () => {
  let fixture: ComponentFixture<NavigationDividerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [NavigationDividerComponent] }).compileComponents();
    fixture = TestBed.createComponent(NavigationDividerComponent);
    fixture.detectChanges();
  });

  it('should apply its host class', () => {
    expect(fixture.nativeElement.classList.contains('emr-navigation-divider')).toBe(true);
  });
});
