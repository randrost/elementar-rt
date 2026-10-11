import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchItemComponent } from './search-item.component';
import { SEARCH } from '../types';

describe('SearchItemComponent', () => {
  let component: SearchItemComponent;
  let fixture: ComponentFixture<SearchItemComponent>;
  let selectItem: jasmine.Spy;

  beforeEach(async () => {
    selectItem = jasmine.createSpy('selectItem');
    await TestBed.configureTestingModule({
      imports: [SearchItemComponent],
      providers: [{ provide: SEARCH, useValue: { selectItem } }]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchItemComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('value', 42);
    fixture.detectChanges();
  });

  it('should create with option semantics', () => {
    expect(component).toBeTruthy();
    expect(fixture.nativeElement.getAttribute('role')).toBe('option');
    expect(fixture.nativeElement.id).toBe(component.id);
  });

  it('should notify the search on click', () => {
    fixture.nativeElement.click();
    expect(selectItem).toHaveBeenCalledWith(42);
  });

  it('should reflect active styles', () => {
    component.setActiveStyles();
    fixture.detectChanges();
    expect(fixture.nativeElement.getAttribute('aria-selected')).toBe('true');
    component.setInactiveStyles();
    fixture.detectChanges();
    expect(fixture.nativeElement.getAttribute('aria-selected')).toBe('false');
  });
});
