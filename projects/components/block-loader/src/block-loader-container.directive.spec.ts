import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BlockLoaderContainerDirective } from './block-loader-container.directive';

@Component({
  standalone: true,
  imports: [BlockLoaderContainerDirective],
  template: `<div emrBlockLoaderContainer></div>`,
})
class HostComponent {
  @ViewChild(BlockLoaderContainerDirective) directive!: BlockLoaderContainerDirective;
}

describe('BlockLoaderContainerDirective', () => {
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HostComponent],
    });
    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    expect(fixture.componentInstance.directive).toBeTruthy();
  });
});
