import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContextMenuDataExampleComponent } from './context-menu-data-example.component';

describe('ContextMenuDataExampleComponent', () => {
  let component: ContextMenuDataExampleComponent;
  let fixture: ComponentFixture<ContextMenuDataExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContextMenuDataExampleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContextMenuDataExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
