import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationBarTwoWayBindingExampleComponent } from './navigation-bar-two-way-binding-example.component';

describe('NavigationBarTwoWayBindingExampleComponent', () => {
  let component: NavigationBarTwoWayBindingExampleComponent;
  let fixture: ComponentFixture<NavigationBarTwoWayBindingExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavigationBarTwoWayBindingExampleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavigationBarTwoWayBindingExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
