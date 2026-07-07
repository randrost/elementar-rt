import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelBodyComponent } from '@elementar-rt/components/panel';

describe('PanelBodyComponent', () => {
  let fixture: ComponentFixture<PanelBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [PanelBodyComponent] }).compileComponents();
    fixture = TestBed.createComponent(PanelBodyComponent);
    fixture.detectChanges();
  });

  it('should apply its host class', () => {
    expect(fixture.nativeElement.classList.contains('emr-panel-body')).toBe(true);
  });
});
