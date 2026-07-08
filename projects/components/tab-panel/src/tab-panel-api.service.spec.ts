import { TabPanelApiService } from './tab-panel-api.service';

describe('TabPanelApiService', () => {
  let service: TabPanelApiService;

  beforeEach(() => {
    service = new TabPanelApiService();
  });

  it('should report nothing active initially', () => {
    expect(service.hasActive()).toBe(false);
    expect(service.isActive('a')).toBe(false);
  });

  it('should mark an id active on activate', () => {
    service.activate('a');
    expect(service.isActive('a')).toBe(true);
    expect(service.hasActive()).toBe(true);
  });

  it('should emit itemIdChanged when activating with the default emitEvent', () => {
    const emitted: any[] = [];
    service.itemIdChanged.subscribe((id) => emitted.push(id));
    service.activate('b');
    expect(emitted).toEqual(['b']);
  });

  it('should not emit itemIdChanged when emitEvent is false', () => {
    const emitted: any[] = [];
    service.itemIdChanged.subscribe((id) => emitted.push(id));
    service.activate('c', false);
    expect(emitted).toEqual([]);
    expect(service.isActive('c')).toBe(true);
  });

  it('should only keep one id active at a time (single selection)', () => {
    service.activate('a');
    service.activate('b');
    expect(service.isActive('a')).toBe(false);
    expect(service.isActive('b')).toBe(true);
  });
});
