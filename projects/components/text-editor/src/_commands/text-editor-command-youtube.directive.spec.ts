import { TestBed } from '@angular/core/testing';

import { TEXT_EDITOR, TextEditor } from '../types';
import { TextEditorCommandYoutubeDirective } from './text-editor-command-youtube.directive';

// Minimal editor stub so the injected TEXT_EDITOR token resolves. The command
// directives only read from `api`, so a no-op implementation is sufficient to
// construct them.
const textEditorStub: TextEditor = {
  api: {
    isCommandDisabled: () => false,
    isActive: () => false,
    runCommand: () => {},
    editor: () => ({}) as any,
  },
};

describe('TextEditorCommandYoutubeDirective', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: TEXT_EDITOR, useValue: textEditorStub }],
    });
  });

  it('should create an instance', () => {
    const directive = TestBed.runInInjectionContext(() => new TextEditorCommandYoutubeDirective());
    expect(directive).toBeTruthy();
  });
});
