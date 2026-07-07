import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { InlineTextEditComponent } from './inline-text-edit.component';

describe('InlineTextEditComponent', () => {
  let fixture: ComponentFixture<InlineTextEditComponent>;
  let component: InlineTextEditComponent;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [InlineTextEditComponent] }).compileComponents();
    fixture = TestBed.createComponent(InlineTextEditComponent);
    component = fixture.componentInstance;
    el = fixture.nativeElement;
    el.textContent = 'Hello';
    fixture.detectChanges();
  });

  it('should be marked contenteditable', () => {
    expect(el.getAttribute('contenteditable')).toBe('true');
  });

  it('should track focused state', () => {
    component.onFocus();
    expect(component.isFocused()).toBe(true);
    component.onBlur();
    expect(component.isFocused()).toBe(false);
  });

  it('should emit contentChanged with the trimmed new text on blur after an edit', () => {
    const emitted: string[] = [];
    component.contentChanged.subscribe((v) => emitted.push(v));
    el.textContent = '  Updated text  ';
    component.onInput();
    component.onBlur();
    expect(emitted).toEqual(['Updated text']);
  });

  it('should not emit when the content is unchanged', () => {
    const emitted: string[] = [];
    component.contentChanged.subscribe((v) => emitted.push(v));
    component.onInput();
    component.onBlur();
    expect(emitted).toEqual([]);
  });

  it('should finish editing and emit on Enter, preventing the default newline', () => {
    const emitted: string[] = [];
    component.contentChanged.subscribe((v) => emitted.push(v));
    el.textContent = 'New value';
    component.onInput();
    const event = new KeyboardEvent('keydown', { key: 'Enter', cancelable: true });
    component.onEnter(event);
    expect(event.defaultPrevented).toBe(true);
    expect(emitted).toEqual(['New value']);
  });

  it('should revert to the previous content on Escape and cancel a pending emission', fakeAsync(() => {
    fixture.componentRef.setInput('delay', 100);
    fixture.detectChanges();
    const emitted: string[] = [];
    component.contentChanged.subscribe((v) => emitted.push(v));
    el.textContent = 'Changed';
    component.onInput();
    component.onEscape();
    expect(el.textContent).toBe('Hello');
    tick(100);
    expect(emitted).toEqual([]);
  }));

  it('should delay emission by the configured number of milliseconds', fakeAsync(() => {
    fixture.componentRef.setInput('delay', 200);
    fixture.detectChanges();
    const emitted: string[] = [];
    component.contentChanged.subscribe((v) => emitted.push(v));
    el.textContent = 'Delayed value';
    component.onInput();
    component.onBlur();
    expect(emitted).toEqual([]);
    tick(200);
    expect(emitted).toEqual(['Delayed value']);
  }));

  it('should insert plain text on paste, ignoring rich clipboard formatting', () => {
    spyOn(document, 'execCommand');
    const dataTransfer = new DataTransfer();
    dataTransfer.setData('text/plain', 'pasted text');
    const event = new ClipboardEvent('paste', { clipboardData: dataTransfer, cancelable: true });
    component.onPaste(event);
    expect(event.defaultPrevented).toBe(true);
    expect(document.execCommand).toHaveBeenCalledWith('insertText', false, 'pasted text');
  });
});
