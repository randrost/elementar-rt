import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbarComponent } from './toolbar.component';

describe('ToolbarComponent', () => {
  let fixture: ComponentFixture<ToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [ToolbarComponent] }).compileComponents();
    fixture = TestBed.createComponent(ToolbarComponent);
    fixture.detectChanges();
  });

  it('should reflect dense and sticky inputs as host classes', () => {
    fixture.componentRef.setInput('dense', true);
    fixture.componentRef.setInput('sticky', true);
    fixture.detectChanges();

    expect(fixture.nativeElement.classList.contains('is-dense')).toBe(true);
    expect(fixture.nativeElement.classList.contains('is-sticky')).toBe(true);
  });
});
