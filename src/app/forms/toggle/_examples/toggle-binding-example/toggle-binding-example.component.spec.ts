import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToggleBindingExampleComponent } from './toggle-binding-example.component';

describe('ToggleBindingExampleComponent', () => {
  let component: ToggleBindingExampleComponent;
  let fixture: ComponentFixture<ToggleBindingExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToggleBindingExampleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToggleBindingExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
