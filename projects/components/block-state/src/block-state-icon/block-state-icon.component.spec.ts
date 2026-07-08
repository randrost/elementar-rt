import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockStateIconComponent } from './block-state-icon.component';

describe('BlockStateIconComponent', () => {
  let fixture: ComponentFixture<BlockStateIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [BlockStateIconComponent] }).compileComponents();
    fixture = TestBed.createComponent(BlockStateIconComponent);
    fixture.detectChanges();
  });

  it('should apply its host class', () => {
    expect(fixture.nativeElement.classList.contains('emr-block-state-icon')).toBe(true);
  });
});
