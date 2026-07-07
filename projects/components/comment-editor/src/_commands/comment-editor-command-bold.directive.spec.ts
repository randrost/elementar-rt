import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { COMMENT_EDITOR, CommentEditor } from '../types';
import { CommentEditorCommandBoldDirective } from './comment-editor-command-bold.directive';

// A spy-backed editor stub so we can assert the directive drives the editor API.
function createEditorStub(): jasmine.SpyObj<CommentEditor['api']> {
  return jasmine.createSpyObj<CommentEditor['api']>('CommentEditorApi', {
    isCommandDisabled: false,
    isActive: false,
    runCommand: undefined,
    editor: {} as any,
    isToolbarActive: false,
    toggleToolbar: undefined,
    isEditorActivated: true,
  });
}

@Component({
  standalone: true,
  imports: [CommentEditorCommandBoldDirective],
  template: `<button emrCommentEditorCommandBold></button>`,
})
class HostComponent {}

describe('CommentEditorCommandBoldDirective', () => {
  let fixture: ComponentFixture<HostComponent>;
  let api: jasmine.SpyObj<CommentEditor['api']>;

  beforeEach(() => {
    api = createEditorStub();
    TestBed.configureTestingModule({
      imports: [HostComponent],
      providers: [{ provide: COMMENT_EDITOR, useValue: { api } }],
    });
    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    const directive = fixture.debugElement
      .query(By.directive(CommentEditorCommandBoldDirective))
      .injector.get(CommentEditorCommandBoldDirective);
    expect(directive).toBeTruthy();
  });

  it('should run the toggleBold command when the host is clicked', () => {
    const button = fixture.debugElement.query(By.directive(CommentEditorCommandBoldDirective));
    button.nativeElement.click();
    expect(api.runCommand).toHaveBeenCalledWith('toggleBold');
  });

  it('should reflect the active state on the host element', () => {
    api.isActive.and.returnValue(true);
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.directive(CommentEditorCommandBoldDirective));
    expect(button.nativeElement.classList.contains('active')).toBe(true);
  });
});
