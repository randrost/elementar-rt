import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreadcrumbsComponent } from './breadcrumbs.component';

describe('BreadcrumbsComponent', () => {
  let component: BreadcrumbsComponent<unknown>;
  let fixture: ComponentFixture<BreadcrumbsComponent<unknown>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [BreadcrumbsComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(BreadcrumbsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
