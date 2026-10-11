import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicButtonGroupExampleComponent } from './basic-button-group-example.component';

describe('BasicButtonGroupExampleComponent', () => {
  let component: BasicButtonGroupExampleComponent;
  let fixture: ComponentFixture<BasicButtonGroupExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BasicButtonGroupExampleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BasicButtonGroupExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
