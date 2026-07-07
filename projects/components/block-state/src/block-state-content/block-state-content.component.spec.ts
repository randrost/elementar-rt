import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockStateContentComponent } from './block-state-content.component';

describe('BlockStateContentComponent', () => {
  let fixture: ComponentFixture<BlockStateContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [BlockStateContentComponent] }).compileComponents();
    fixture = TestBed.createComponent(BlockStateContentComponent);
    fixture.detectChanges();
  });

  it('should apply its host class', () => {
    expect(fixture.nativeElement.classList.contains('emr-block-state-content')).toBe(true);
  });
});
