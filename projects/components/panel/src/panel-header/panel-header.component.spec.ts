import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelHeaderComponent } from '@elementar-rt/components/panel';

describe('PanelHeaderComponent', () => {
  let fixture: ComponentFixture<PanelHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [PanelHeaderComponent] }).compileComponents();
    fixture = TestBed.createComponent(PanelHeaderComponent);
    fixture.detectChanges();
  });

  it('should set the header height css variable when height is provided', () => {
    fixture.componentRef.setInput('height', 64);
    fixture.detectChanges();

    expect((fixture.nativeElement as HTMLElement).style.getPropertyValue('--emr-panel-header-height')).toBe('64px');
  });

  it('should remove the css variable when height is unset', () => {
    fixture.componentRef.setInput('height', 64);
    fixture.detectChanges();
    fixture.componentRef.setInput('height', undefined);
    fixture.detectChanges();

    expect((fixture.nativeElement as HTMLElement).style.getPropertyValue('--emr-panel-header-height')).toBe('');
  });

  it('should remove the css variable on destroy', () => {
    fixture.componentRef.setInput('height', 64);
    fixture.detectChanges();

    fixture.destroy();

    expect((fixture.nativeElement as HTMLElement).style.getPropertyValue('--emr-panel-header-height')).toBe('');
  });
});
