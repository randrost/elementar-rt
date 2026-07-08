import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvatarMoreComponent } from './avatar-more.component';

describe('AvatarMoreComponent', () => {
  let fixture: ComponentFixture<AvatarMoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [AvatarMoreComponent] }).compileComponents();
    fixture = TestBed.createComponent(AvatarMoreComponent);
    fixture.detectChanges();
  });

  it('should apply the emr-avatar-more host class', () => {
    expect(fixture.nativeElement.classList.contains('emr-avatar-more')).toBe(true);
  });
});
