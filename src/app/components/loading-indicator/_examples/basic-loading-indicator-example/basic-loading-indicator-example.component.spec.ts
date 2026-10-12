import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicLoadingIndicatorExampleComponent } from './basic-loading-indicator-example.component';

describe('BasicLoadingIndicatorExampleComponent', () => {
  let component: BasicLoadingIndicatorExampleComponent;
  let fixture: ComponentFixture<BasicLoadingIndicatorExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BasicLoadingIndicatorExampleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BasicLoadingIndicatorExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
