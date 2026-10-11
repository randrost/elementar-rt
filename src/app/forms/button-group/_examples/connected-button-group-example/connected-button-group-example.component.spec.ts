import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectedButtonGroupExampleComponent } from './connected-button-group-example.component';

describe('ConnectedButtonGroupExampleComponent', () => {
  let component: ConnectedButtonGroupExampleComponent;
  let fixture: ComponentFixture<ConnectedButtonGroupExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConnectedButtonGroupExampleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConnectedButtonGroupExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
