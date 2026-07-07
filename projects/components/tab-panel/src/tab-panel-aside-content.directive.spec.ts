import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabPanelAsideContentDirective } from './tab-panel-aside-content.directive';
import { TabPanelApiService } from './tab-panel-api.service';

@Component({
  imports: [TabPanelAsideContentDirective],
  template: `
    <ng-template emrTabPanelAsideContent="one">One</ng-template>
    <ng-template emrTabPanelAsideContent="two">Two</ng-template>
  `,
  providers: [TabPanelApiService]
})
class HostComponent {}

describe('TabPanelAsideContentDirective', () => {
  let fixture: ComponentFixture<HostComponent>;
  let api: TabPanelApiService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [HostComponent] }).compileComponents();
    fixture = TestBed.createComponent(HostComponent);
    api = fixture.debugElement.injector.get(TabPanelApiService);
  });

  it('should render nothing when no item is active yet', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent.trim()).toBe('');
  });

  it('should render only the content matching the initially active id', () => {
    api.activate('one', false);
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent.trim()).toBe('One');
  });

  it('should switch rendered content when the active id changes', () => {
    api.activate('one', false);
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent.trim()).toBe('One');

    api.activate('two');
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent.trim()).toBe('Two');
  });
});
