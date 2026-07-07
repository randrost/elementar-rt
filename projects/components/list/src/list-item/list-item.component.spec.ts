import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListItemComponent } from './list-item.component';

describe('ListItemComponent', () => {
  let fixture: ComponentFixture<ListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [ListItemComponent] }).compileComponents();
    fixture = TestBed.createComponent(ListItemComponent);
    fixture.detectChanges();
  });

  it('should expose a listitem role and reflect interactive/selected/disabled as host classes', () => {
    expect(fixture.nativeElement.getAttribute('role')).toBe('listitem');

    fixture.componentRef.setInput('interactive', true);
    fixture.componentRef.setInput('selected', true);
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();

    expect(fixture.nativeElement.classList.contains('is-interactive')).toBe(true);
    expect(fixture.nativeElement.classList.contains('is-selected')).toBe(true);
    expect(fixture.nativeElement.classList.contains('is-disabled')).toBe(true);
  });
});
