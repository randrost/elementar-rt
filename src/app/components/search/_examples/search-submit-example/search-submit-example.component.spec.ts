import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchSubmitExampleComponent } from './search-submit-example.component';

describe('SearchSubmitExampleComponent', () => {
  let component: SearchSubmitExampleComponent;
  let fixture: ComponentFixture<SearchSubmitExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchSubmitExampleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchSubmitExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
