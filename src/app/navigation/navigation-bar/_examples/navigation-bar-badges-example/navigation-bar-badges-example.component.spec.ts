import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationBarBadgesExampleComponent } from './navigation-bar-badges-example.component';

describe('NavigationBarBadgesExampleComponent', () => {
  let component: NavigationBarBadgesExampleComponent;
  let fixture: ComponentFixture<NavigationBarBadgesExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavigationBarBadgesExampleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavigationBarBadgesExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
