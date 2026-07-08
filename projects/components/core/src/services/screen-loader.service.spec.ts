import { TestBed } from '@angular/core/testing';

import { GlobalStore } from '../global.state';
import { ScreenLoaderService } from './screen-loader.service';

describe('ScreenLoaderService', () => {
  let service: ScreenLoaderService;
  let store: InstanceType<typeof GlobalStore>;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScreenLoaderService);
    store = TestBed.inject(GlobalStore);
  });

  it('should set screenLoading to true on show()', () => {
    store.setScreenLoading(false);
    service.show();
    expect(store.screenLoading()).toBe(true);
  });

  it('should set screenLoading to false on hide()', () => {
    store.setScreenLoading(true);
    service.hide();
    expect(store.screenLoading()).toBe(false);
  });
});
