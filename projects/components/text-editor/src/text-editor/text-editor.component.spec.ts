import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextEditorComponent } from './text-editor.component';

describe('TextEditorComponent', () => {
  let fixture: ComponentFixture<TextEditorComponent>;
  let component: TextEditorComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [TextEditorComponent] }).compileComponents();
    fixture = TestBed.createComponent(TextEditorComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('content', '<p>Hello world</p>');
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should initialize a real tiptap Editor instance with the given content', () => {
    expect(component.api.editor()).toBeTruthy();
    expect(component.api.editor().getHTML()).toContain('Hello world');
  });

  it('should toggle bold via runCommand and reflect it through isActive', () => {
    component.api.editor().commands.selectAll();
    component.api.runCommand('toggleBold');
    expect(component.api.isActive('bold')).toBe(true);
    component.api.runCommand('toggleBold');
    expect(component.api.isActive('bold')).toBe(false);
  });

  it('should report a command as not disabled when it can run', () => {
    expect(component.api.isCommandDisabled('toggleBold')).toBeFalsy();
  });
});
