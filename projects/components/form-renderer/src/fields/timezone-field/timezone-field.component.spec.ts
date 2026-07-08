import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl } from '@angular/forms';
import { TimezoneFieldComponent } from './timezone-field.component';

describe('TimezoneFieldComponent', () => {
  let component: TimezoneFieldComponent;
  let fixture: ComponentFixture<TimezoneFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimezoneFieldComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TimezoneFieldComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('control', new FormControl(''));
    fixture.componentRef.setInput('config', { name: 'field', type: 'text', kind: 'field', label: 'Field', validators: [] } as any);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
