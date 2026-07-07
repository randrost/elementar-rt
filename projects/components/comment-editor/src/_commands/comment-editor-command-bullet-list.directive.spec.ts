import { TestBed } from '@angular/core/testing';

import { COMMENT_EDITOR, CommentEditor } from '../types';
import { CommentEditorCommandBulletListDirective } from './comment-editor-command-bullet-list.directive';

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

describe('CommentEditorCommandBulletListDirective', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: COMMENT_EDITOR, useValue: commentEditorStub }],
    });
  });

  it('should create an instance', () => {
    const directive = TestBed.runInInjectionContext(() => new CommentEditorCommandBulletListDirective());
    expect(directive).toBeTruthy();
  });
});
