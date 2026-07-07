import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DragImageDirective } from './drag-image.directive';

@Component({
  standalone: true,
  imports: [DragImageDirective],
  template: `<div emrDragImage [scale]="1" [content]="'x'"></div>`,
})
class HostComponent {
  @ViewChild(DragImageDirective) directive!: DragImageDirective;
}

describe('DragImageDirective', () => {
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
