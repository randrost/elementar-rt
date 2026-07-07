import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockStateActionsComponent } from './block-state-actions.component';

describe('BlockStateActionsComponent', () => {
  let fixture: ComponentFixture<BlockStateActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [BlockStateActionsComponent] }).compileComponents();
    fixture = TestBed.createComponent(BlockStateActionsComponent);
    fixture.detectChanges();
  });

  it('should apply its host class', () => {
    expect(fixture.nativeElement.classList.contains('emr-block-state-actions')).toBe(true);
  });
});
