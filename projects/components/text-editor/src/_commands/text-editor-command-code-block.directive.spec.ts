import { TestBed } from '@angular/core/testing';

import { TEXT_EDITOR, TextEditor } from '../types';
import { TextEditorCommandCodeBlockDirective } from './text-editor-command-code-block.directive';

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

describe('TextEditorCommandCodeBlockDirective', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: TEXT_EDITOR, useValue: textEditorStub }],
    });
  });

  it('should create an instance', () => {
    const directive = TestBed.runInInjectionContext(() => new TextEditorCommandCodeBlockDirective());
    expect(directive).toBeTruthy();
  });
});
