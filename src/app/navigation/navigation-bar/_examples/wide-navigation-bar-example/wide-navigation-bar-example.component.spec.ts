import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WideNavigationBarExampleComponent } from './wide-navigation-bar-example.component';

describe('WideNavigationBarExampleComponent', () => {
  let component: WideNavigationBarExampleComponent;
  let fixture: ComponentFixture<WideNavigationBarExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WideNavigationBarExampleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WideNavigationBarExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
