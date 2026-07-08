import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidentsComponent } from './incidents.component';

describe('IncidentsComponent', () => {
  let fixture: ComponentFixture<IncidentsComponent>;
  let component: IncidentsComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [IncidentsComponent] }).compileComponents();
    fixture = TestBed.createComponent(IncidentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should start not visible and toggle the is-visible host class', () => {
    expect(fixture.nativeElement.classList.contains('is-visible')).toBe(false);

    component.toggleVisibility();
    fixture.detectChanges();
    expect(fixture.nativeElement.classList.contains('is-visible')).toBe(true);

    component.toggleVisibility();
    fixture.detectChanges();
    expect(fixture.nativeElement.classList.contains('is-visible')).toBe(false);
  });
});
