import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TEXT_EDITOR, TextEditor } from '../types';
import { TextEditorBubbleMenuComponent } from './text-editor-bubble-menu.component';

// The bubble menu injects TEXT_EDITOR; provide a no-op stub so it can render.
const textEditorStub: TextEditor = {
  api: {
    isCommandDisabled: () => false,
    isActive: () => false,
    runCommand: () => {},
    editor: () => ({ getAttributes: () => ({}) }) as any,
  },
};

describe('TextEditorBubbleMenuComponent', () => {
  let component: TextEditorBubbleMenuComponent;
  let fixture: ComponentFixture<TextEditorBubbleMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextEditorBubbleMenuComponent],
      providers: [{ provide: TEXT_EDITOR, useValue: textEditorStub }],
    }).compileComponents();

    fixture = TestBed.createComponent(TextEditorBubbleMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
