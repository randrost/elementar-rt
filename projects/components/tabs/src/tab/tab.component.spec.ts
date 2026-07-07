import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabComponent } from './tab.component';

@Component({
  imports: [TabComponent],
  template: `<emr-tab label="First" icon="home">content</emr-tab>`
})
class HostComponent {
  @ViewChild(TabComponent) tab!: TabComponent;
}

describe('TabComponent', () => {
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [HostComponent] }).compileComponents();
    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
  });

  it('should expose label/icon/disabled inputs', () => {
    expect(fixture.componentInstance.tab.label()).toBe('First');
    expect(fixture.componentInstance.tab.icon()).toBe('home');
    expect(fixture.componentInstance.tab.disabled()).toBe(false);
  });

  it('should expose its projected content via contentRef as a usable template', () => {
    expect(fixture.componentInstance.tab.contentRef()).toBeInstanceOf(TemplateRef);
  });
});
