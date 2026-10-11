import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingIndicatorSizesExampleComponent } from './loading-indicator-sizes-example.component';

describe('LoadingIndicatorSizesExampleComponent', () => {
  let component: LoadingIndicatorSizesExampleComponent;
  let fixture: ComponentFixture<LoadingIndicatorSizesExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadingIndicatorSizesExampleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoadingIndicatorSizesExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
