import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicSearchExampleComponent } from './basic-search-example.component';

describe('BasicSearchExampleComponent', () => {
  let component: BasicSearchExampleComponent;
  let fixture: ComponentFixture<BasicSearchExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BasicSearchExampleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BasicSearchExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
