import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl } from '@angular/forms';
import { ToggleFieldComponent } from './toggle-field.component';

describe('ToggleFieldComponent', () => {
  let component: ToggleFieldComponent;
  let fixture: ComponentFixture<ToggleFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToggleFieldComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ToggleFieldComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('control', new FormControl(''));
    fixture.componentRef.setInput('config', { name: 'field', type: 'text', kind: 'field', label: 'Field', validators: [] } as any);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
