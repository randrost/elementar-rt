import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingIndicatorInContextExampleComponent } from './loading-indicator-in-context-example.component';

describe('LoadingIndicatorInContextExampleComponent', () => {
  let component: LoadingIndicatorInContextExampleComponent;
  let fixture: ComponentFixture<LoadingIndicatorInContextExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadingIndicatorInContextExampleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoadingIndicatorInContextExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
