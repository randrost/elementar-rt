import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockStateComponent } from './block-state.component';

describe('BlockStateComponent', () => {
  let fixture: ComponentFixture<BlockStateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [BlockStateComponent] }).compileComponents();
    fixture = TestBed.createComponent(BlockStateComponent);
    fixture.detectChanges();
  });

  it('should apply its host class', () => {
    expect(fixture.nativeElement.classList.contains('emr-block-state')).toBe(true);
  });
});
