import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelFooterComponent } from './panel-footer.component';

describe('PanelFooterComponent', () => {
  let fixture: ComponentFixture<PanelFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [PanelFooterComponent] }).compileComponents();
    fixture = TestBed.createComponent(PanelFooterComponent);
    fixture.detectChanges();
  });

  it('should set the footer height css variable when height is provided', () => {
    fixture.componentRef.setInput('height', 48);
    fixture.detectChanges();

    expect((fixture.nativeElement as HTMLElement).style.getPropertyValue('--emr-panel-footer-height')).toBe('48px');
  });

  it('should remove the css variable when height is unset', () => {
    fixture.componentRef.setInput('height', 48);
    fixture.detectChanges();
    fixture.componentRef.setInput('height', undefined);
    fixture.detectChanges();

    expect((fixture.nativeElement as HTMLElement).style.getPropertyValue('--emr-panel-footer-height')).toBe('');
  });
});
