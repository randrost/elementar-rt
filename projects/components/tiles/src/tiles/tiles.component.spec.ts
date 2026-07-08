import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TilesComponent } from './tiles.component';

describe('TilesComponent', () => {
  let fixture: ComponentFixture<TilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [TilesComponent] }).compileComponents();
    fixture = TestBed.createComponent(TilesComponent);
    fixture.detectChanges();
  });

  it('should default the columns css variable to 3 and leave gap unset', () => {
    const style = (fixture.nativeElement as HTMLElement).style;
    expect(style.getPropertyValue('--emr-tiles-cols')).toBe('3');
    expect(style.getPropertyValue('--emr-tiles-gap')).toBe('');
  });

  it('should reflect columns and gap input changes as css variables', () => {
    fixture.componentRef.setInput('columns', 4);
    fixture.componentRef.setInput('gap', '2rem');
    fixture.detectChanges();

    const style = (fixture.nativeElement as HTMLElement).style;
    expect(style.getPropertyValue('--emr-tiles-cols')).toBe('4');
    expect(style.getPropertyValue('--emr-tiles-gap')).toBe('2rem');
  });
});
