import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { BreadcrumbsGlobalComponent } from './breadcrumbs-global.component';
import { BreadcrumbsStore } from '../breadcrumbs.store';

describe('BreadcrumbsGlobalComponent', () => {
  let fixture: ComponentFixture<BreadcrumbsGlobalComponent>;
  let component: BreadcrumbsGlobalComponent;
  let store: InstanceType<typeof BreadcrumbsStore>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BreadcrumbsGlobalComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(BreadcrumbsGlobalComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(BreadcrumbsStore);
    fixture.detectChanges();
  });

  it('should reflect the breadcrumbs from the global store', () => {
    store.setBreadcrumbs([{ id: 1, name: 'Home', type: 'link' }]);
    expect(component.breadcrumbs()).toEqual([{ id: 1, name: 'Home', type: 'link' }]);
  });

  it('should default the separator to a slash', () => {
    expect(component.separator()).toBe('/');
  });
});
