import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockStateTitleComponent } from './block-state-title.component';

describe('BlockStateTitleComponent', () => {
  let fixture: ComponentFixture<BlockStateTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [BlockStateTitleComponent] }).compileComponents();
    fixture = TestBed.createComponent(BlockStateTitleComponent);
    fixture.detectChanges();
  });

  it('should apply its host class', () => {
    expect(fixture.nativeElement.classList.contains('emr-block-state-title')).toBe(true);
  });
});
