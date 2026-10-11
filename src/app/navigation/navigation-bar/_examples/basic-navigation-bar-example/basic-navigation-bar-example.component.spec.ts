import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicNavigationBarExampleComponent } from './basic-navigation-bar-example.component';

describe('BasicNavigationBarExampleComponent', () => {
  let component: BasicNavigationBarExampleComponent;
  let fixture: ComponentFixture<BasicNavigationBarExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BasicNavigationBarExampleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BasicNavigationBarExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
