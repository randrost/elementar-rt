import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompactContextMenuExampleComponent } from './compact-context-menu-example.component';

describe('CompactContextMenuExampleComponent', () => {
  let component: CompactContextMenuExampleComponent;
  let fixture: ComponentFixture<CompactContextMenuExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompactContextMenuExampleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompactContextMenuExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
