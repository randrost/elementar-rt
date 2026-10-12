import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicToggleExampleComponent } from './basic-toggle-example.component';

describe('BasicToggleExampleComponent', () => {
  let component: BasicToggleExampleComponent;
  let fixture: ComponentFixture<BasicToggleExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BasicToggleExampleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BasicToggleExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
