import { TestBed } from '@angular/core/testing';

import { COMMENT_EDITOR, CommentEditor } from '../types';
import { CommentEditorCommandStrikeDirective } from './comment-editor-command-strike.directive';

// Minimal editor stub so the injected COMMENT_EDITOR token resolves. The command
// directives only read from `api`, so a no-op implementation is sufficient to
// construct them.
const commentEditorStub: CommentEditor = {
  api: {
    isCommandDisabled: () => false,
    isActive: () => false,
    runCommand: () => {},
    editor: () => ({}) as any,
    isToolbarActive: () => false,
    toggleToolbar: () => {},
    isEditorActivated: () => true,
  },
};

describe('CommentEditorCommandStrikeDirective', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: COMMENT_EDITOR, useValue: commentEditorStub }],
    });
  });

  it('should create an instance', () => {
    const directive = TestBed.runInInjectionContext(() => new CommentEditorCommandStrikeDirective());
    expect(directive).toBeTruthy();
  });
});
