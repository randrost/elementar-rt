import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmojiPickerTriggerForDirective } from './emoji-picker-trigger-for.directive';

@Component({
  standalone: true,
  imports: [EmojiPickerTriggerForDirective],
  template: `<button [emrEmojiPickerTriggerFor]="tpl"></button><ng-template #tpl></ng-template>`,
})
class HostComponent {
  @ViewChild(EmojiPickerTriggerForDirective) directive!: EmojiPickerTriggerForDirective;
}

describe('EmojiPickerTriggerForDirective', () => {
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
