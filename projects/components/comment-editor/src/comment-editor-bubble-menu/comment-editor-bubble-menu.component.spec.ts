import { ComponentFixture, TestBed } from '@angular/core/testing';

import { COMMENT_EDITOR, CommentEditor } from '../types';
import { CommentEditorBubbleMenuComponent } from './comment-editor-bubble-menu.component';

// The bubble menu injects COMMENT_EDITOR; provide a no-op stub so it can render.
const commentEditorStub: CommentEditor = {
  api: {
    isCommandDisabled: () => false,
    isActive: () => false,
    runCommand: () => {},
    editor: () => ({ getAttributes: () => ({}) }) as any,
    isToolbarActive: () => false,
    toggleToolbar: () => {},
    isEditorActivated: () => true,
  },
};

describe('CommentEditorBubbleMenuComponent', () => {
  let component: CommentEditorBubbleMenuComponent;
  let fixture: ComponentFixture<CommentEditorBubbleMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommentEditorBubbleMenuComponent],
      providers: [{ provide: COMMENT_EDITOR, useValue: commentEditorStub }],
    }).compileComponents();

    fixture = TestBed.createComponent(CommentEditorBubbleMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
