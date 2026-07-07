import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvatarTotalComponent } from './avatar-total.component';

describe('AvatarTotalComponent', () => {
  let fixture: ComponentFixture<AvatarTotalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [AvatarTotalComponent] }).compileComponents();
    fixture = TestBed.createComponent(AvatarTotalComponent);
    fixture.detectChanges();
  });

  it('should apply the emr-avatar-total host class', () => {
    expect(fixture.nativeElement.classList.contains('emr-avatar-total')).toBe(true);
  });
});
