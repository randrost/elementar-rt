import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { UploadTriggerDirective } from './upload-trigger.directive';

@Component({
  imports: [UploadTriggerDirective],
  template: `<div emrUploadTrigger [accept]="accept" [multiple]="multiple" (fileSelected)="onFileSelected($event)"></div>`
})
class HostComponent {
  accept: string | undefined;
  multiple = false;
  events: any[] = [];
  onFileSelected(e: any) { this.events.push(e); }
}

@Component({
  imports: [UploadTriggerDirective],
  template: `<div emrUploadTrigger [attr.accept]="'.jpg'" (fileSelected)="onFileSelected($event)"></div>`
})
class FallbackAcceptHostComponent {
  events: any[] = [];
  onFileSelected(e: any) { this.events.push(e); }
}

function captureCreatedInput(directive: UploadTriggerDirective): { get(): HTMLInputElement } {
  let captured!: HTMLInputElement;
  spyOn((directive as any)._renderer, 'createElement').and.callFake((name: string) => {
    captured = document.createElement(name) as HTMLInputElement;
    spyOn(captured, 'click');
    return captured;
  });
  return { get: () => captured };
}

function dispatchChangeWithFiles(input: HTMLInputElement, files: File[]) {
  const dataTransfer = new DataTransfer();
  files.forEach(f => dataTransfer.items.add(f));
  Object.defineProperty(input, 'files', { value: dataTransfer.files, configurable: true });
  input.dispatchEvent(new Event('change'));
}

describe('UploadTriggerDirective', () => {
  it('should create a hidden file input with the accept and multiple attributes set', () => {
    const fixture: ComponentFixture<HostComponent> = TestBed.configureTestingModule({ imports: [HostComponent] })
      .createComponent(HostComponent);
    fixture.componentInstance.accept = '.png,.jpg';
    fixture.componentInstance.multiple = true;
    fixture.detectChanges();

    const directive = fixture.debugElement.query(By.directive(UploadTriggerDirective)).injector.get(UploadTriggerDirective);
    const input = captureCreatedInput(directive);

    fixture.debugElement.query(By.directive(UploadTriggerDirective)).nativeElement.click();

    expect(input.get().type).toBe('file');
    expect(input.get().getAttribute('accept')).toBe('.png,.jpg');
    expect(input.get().hasAttribute('multiple')).toBe(true);
  });

  it('should emit fileSelected with the chosen files when the input changes', () => {
    const fixture: ComponentFixture<HostComponent> = TestBed.configureTestingModule({ imports: [HostComponent] })
      .createComponent(HostComponent);
    fixture.detectChanges();

    const directive = fixture.debugElement.query(By.directive(UploadTriggerDirective)).injector.get(UploadTriggerDirective);
    const input = captureCreatedInput(directive);

    fixture.debugElement.query(By.directive(UploadTriggerDirective)).nativeElement.click();

    const file = new File(['x'], 'a.txt', { type: 'text/plain' });
    dispatchChangeWithFiles(input.get(), [file]);

    expect(fixture.componentInstance.events.length).toBe(1);
    expect(fixture.componentInstance.events[0].files).toEqual([file]);
    expect(fixture.componentInstance.events[0].multiple).toBe(false);
  });

  it('should fall back to the host element accept attribute when the accept input is unset', () => {
    const fixture: ComponentFixture<FallbackAcceptHostComponent> = TestBed.configureTestingModule({ imports: [FallbackAcceptHostComponent] })
      .createComponent(FallbackAcceptHostComponent);
    fixture.detectChanges();

    const directive = fixture.debugElement.query(By.directive(UploadTriggerDirective)).injector.get(UploadTriggerDirective);
    const input = captureCreatedInput(directive);

    fixture.debugElement.query(By.directive(UploadTriggerDirective)).nativeElement.click();

    expect(input.get().getAttribute('accept')).toBe('.jpg');
  });
});
