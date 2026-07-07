import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListComponent } from './list.component';

describe('ListComponent', () => {
  let fixture: ComponentFixture<ListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [ListComponent] }).compileComponents();
    fixture = TestBed.createComponent(ListComponent);
    fixture.detectChanges();
  });

  it('should expose a list role and reflect dense/divided as host classes', () => {
    expect(fixture.nativeElement.getAttribute('role')).toBe('list');

    fixture.componentRef.setInput('dense', true);
    fixture.componentRef.setInput('divided', true);
    fixture.detectChanges();

    expect(fixture.nativeElement.classList.contains('is-dense')).toBe(true);
    expect(fixture.nativeElement.classList.contains('is-divided')).toBe(true);
  });
});
