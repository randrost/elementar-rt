import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullscreenSearchExampleComponent } from './fullscreen-search-example.component';

describe('FullscreenSearchExampleComponent', () => {
  let component: FullscreenSearchExampleComponent;
  let fixture: ComponentFixture<FullscreenSearchExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FullscreenSearchExampleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FullscreenSearchExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
