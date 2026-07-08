import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChipListComponent } from './chip-list.component';

describe('ChipListComponent', () => {
  let fixture: ComponentFixture<ChipListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [ChipListComponent] }).compileComponents();
    fixture = TestBed.createComponent(ChipListComponent);
    fixture.detectChanges();
  });

  it('should expose a listbox role for accessibility', () => {
    expect(fixture.nativeElement.getAttribute('role')).toBe('listbox');
  });
});
