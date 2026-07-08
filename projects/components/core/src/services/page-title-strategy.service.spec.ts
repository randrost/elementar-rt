import { TestBed } from '@angular/core/testing';
import { RouterStateSnapshot } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { GlobalStore } from '../global.state';
import { PageTitleStrategyService } from './page-title-strategy.service';

describe('PageTitleStrategyService', () => {
  let service: PageTitleStrategyService;
  let title: Title;
  let store: InstanceType<typeof GlobalStore>;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PageTitleStrategyService);
    title = TestBed.inject(Title);
    store = TestBed.inject(GlobalStore);
    store.setPageTitle('My App');
  });

  it('should append the route title to the global page title', () => {
    spyOn(service, 'buildTitle').and.returnValue('Settings');
    service.updateTitle({} as RouterStateSnapshot);
    expect(title.getTitle()).toBe('Settings | My App');
  });

  it('should fall back to just the global page title when the route has no title', () => {
    spyOn(service, 'buildTitle').and.returnValue(undefined);
    service.updateTitle({} as RouterStateSnapshot);
    expect(title.getTitle()).toBe('My App');
  });
});
