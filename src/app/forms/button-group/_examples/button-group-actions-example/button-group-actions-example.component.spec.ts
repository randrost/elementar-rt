import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonGroupActionsExampleComponent } from './button-group-actions-example.component';

describe('ButtonGroupActionsExampleComponent', () => {
  let component: ButtonGroupActionsExampleComponent;
  let fixture: ComponentFixture<ButtonGroupActionsExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonGroupActionsExampleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonGroupActionsExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
