import { TestBed } from '@angular/core/testing';

import { BreadcrumbsStore } from './breadcrumbs.store';
import { Breadcrumb } from './types';

describe('BreadcrumbsStore', () => {
  it('should start with an empty breadcrumbs list', () => {
    TestBed.configureTestingModule({});
    const store = TestBed.inject(BreadcrumbsStore);
    expect(store.breadcrumbs()).toEqual([]);
  });

  it('should update breadcrumbs via setBreadcrumbs', () => {
    TestBed.configureTestingModule({});
    const store = TestBed.inject(BreadcrumbsStore);
    const crumbs: Breadcrumb[] = [{ id: 1, name: 'Home', type: 'link' }];
    store.setBreadcrumbs(crumbs);
    expect(store.breadcrumbs()).toEqual(crumbs);
  });
});
