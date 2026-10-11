import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectedButtonGroupLabelsExampleComponent } from './connected-button-group-labels-example.component';

describe('ConnectedButtonGroupLabelsExampleComponent', () => {
  let component: ConnectedButtonGroupLabelsExampleComponent;
  let fixture: ComponentFixture<ConnectedButtonGroupLabelsExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConnectedButtonGroupLabelsExampleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConnectedButtonGroupLabelsExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
