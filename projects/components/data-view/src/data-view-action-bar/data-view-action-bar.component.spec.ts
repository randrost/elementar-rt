import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataViewActionBarComponent } from './data-view-action-bar.component';

describe('DataViewActionBarComponent', () => {
  let fixture: ComponentFixture<DataViewActionBarComponent>;
  let component: DataViewActionBarComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [DataViewActionBarComponent] }).compileComponents();
    fixture = TestBed.createComponent(DataViewActionBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should not force visibility by default', () => {
    const host: HTMLElement = fixture.nativeElement;
    expect(host.classList.contains('force-visible')).toBe(false);
  });

  it('should force visibility via the forceVisible input', () => {
    fixture.componentRef.setInput('forceVisible', true);
    fixture.detectChanges();
    const host: HTMLElement = fixture.nativeElement;
    expect(host.classList.contains('force-visible')).toBe(true);
  });

  it('should force visibility via the api', () => {
    component.api.setForceVisible(true);
    fixture.detectChanges();
    const host: HTMLElement = fixture.nativeElement;
    expect(host.classList.contains('force-visible')).toBe(true);
  });
});
