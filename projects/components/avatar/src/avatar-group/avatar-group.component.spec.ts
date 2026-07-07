import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvatarGroupComponent } from './avatar-group.component';

describe('AvatarGroupComponent', () => {
  let fixture: ComponentFixture<AvatarGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [AvatarGroupComponent] }).compileComponents();
    fixture = TestBed.createComponent(AvatarGroupComponent);
    fixture.detectChanges();
  });

  it('should apply the emr-avatar-group host class', () => {
    expect(fixture.nativeElement.classList.contains('emr-avatar-group')).toBe(true);
  });
});
