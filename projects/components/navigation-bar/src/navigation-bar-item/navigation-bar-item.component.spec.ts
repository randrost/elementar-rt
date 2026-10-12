import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationBarComponent } from '../navigation-bar/navigation-bar.component';
import { NavigationBarItemComponent } from './navigation-bar-item.component';

describe('NavigationBarItemComponent', () => {
  let component: NavigationBarItemComponent;
  let fixture: ComponentFixture<NavigationBarItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavigationBarItemComponent],
      providers: [NavigationBarComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(NavigationBarItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit activated on click', () => {
    let emitted = false;
    component.activated.subscribe(() => emitted = true);
    fixture.nativeElement.click();
    expect(emitted).toBeTrue();
  });
});
