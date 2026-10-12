import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicContextMenuExampleComponent } from './basic-context-menu-example.component';

describe('BasicContextMenuExampleComponent', () => {
  let component: BasicContextMenuExampleComponent;
  let fixture: ComponentFixture<BasicContextMenuExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BasicContextMenuExampleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BasicContextMenuExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
