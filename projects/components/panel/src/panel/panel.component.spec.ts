import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelComponent } from '@elementar-rt/components/panel';

describe('PanelComponent', () => {
  let fixture: ComponentFixture<PanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [PanelComponent] }).compileComponents();
    fixture = TestBed.createComponent(PanelComponent);
    fixture.detectChanges();
  });

  it('should reflect the absolute input as a host class', () => {
    expect(fixture.nativeElement.classList.contains('is-absolute')).toBe(false);

    fixture.componentRef.setInput('absolute', true);
    fixture.detectChanges();

    expect(fixture.nativeElement.classList.contains('is-absolute')).toBe(true);
  });
});
