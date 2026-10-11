import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToggleSizesExampleComponent } from './toggle-sizes-example.component';

describe('ToggleSizesExampleComponent', () => {
  let component: ToggleSizesExampleComponent;
  let fixture: ComponentFixture<ToggleSizesExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToggleSizesExampleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToggleSizesExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
