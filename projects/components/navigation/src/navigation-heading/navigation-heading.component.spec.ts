import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationHeadingComponent } from './navigation-heading.component';

describe('NavigationHeadingComponent', () => {
  let fixture: ComponentFixture<NavigationHeadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [NavigationHeadingComponent] }).compileComponents();
    fixture = TestBed.createComponent(NavigationHeadingComponent);
    fixture.detectChanges();
  });

  it('should apply its host class', () => {
    expect(fixture.nativeElement.classList.contains('emr-navigation-heading')).toBe(true);
  });
});
