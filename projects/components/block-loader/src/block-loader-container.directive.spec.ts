import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockLoaderContainerDirective } from './block-loader-container.directive';

@Component({
  imports: [BlockLoaderContainerDirective],
  template: `<div emrBlockLoaderContainer></div>`
})
class HostComponent {}

describe('BlockLoaderContainerDirective', () => {
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [HostComponent] }).compileComponents();
    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
  });

  it('should set position relative on init and remove it on destroy', () => {
    const el = fixture.nativeElement.querySelector('div') as HTMLElement;
    expect(el.style.position).toBe('relative');

    fixture.destroy();

    expect(el.style.position).toBe('');
  });
});
