import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockStateImageComponent } from './block-state-image.component';

describe('BlockStateImageComponent', () => {
  let fixture: ComponentFixture<BlockStateImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [BlockStateImageComponent] }).compileComponents();
    fixture = TestBed.createComponent(BlockStateImageComponent);
    fixture.detectChanges();
  });

  it('should apply its host class', () => {
    expect(fixture.nativeElement.classList.contains('emr-block-state-image')).toBe(true);
  });
});
