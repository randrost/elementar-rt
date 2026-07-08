import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentEditorComponent } from './comment-editor.component';

describe('CommentEditorComponent', () => {
  let fixture: ComponentFixture<CommentEditorComponent>;
  let component: CommentEditorComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [CommentEditorComponent] }).compileComponents();
    fixture = TestBed.createComponent(CommentEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should initialize a real tiptap Editor instance', () => {
    expect(component.api.editor()).toBeTruthy();
  });

  it('should track typed content and emit it on send, then clear', () => {
    component.api.editor().commands.setContent('<p>Hello there</p>', true);
    fixture.detectChanges();

    const emitted: string[] = [];
    component.sent.subscribe((v) => emitted.push(v));
    component.send(new MouseEvent('click'));

    expect(emitted).toEqual(['<p>Hello there</p>']);
    expect(component.api.editor().isEmpty).toBe(true);
  });

  it('should emit canceled and clear the editor on cancel', () => {
    component.api.editor().commands.setContent('<p>Draft</p>');
    let canceled = false;
    component.canceled.subscribe(() => (canceled = true));

    component.cancel(new MouseEvent('click'));

    expect(canceled).toBe(true);
    expect(component.api.editor().isEmpty).toBe(true);
  });

  it('should toggle toolbar visibility via the api', () => {
    expect(component.api.isToolbarActive()).toBe(false);
    component.api.toggleToolbar();
    expect(component.api.isToolbarActive()).toBe(true);
  });

  it('should activate full view mode once and stay activated', () => {
    expect(component.api.isEditorActivated()).toBe(false);
    component.activateFullView();
    expect(component.api.isEditorActivated()).toBe(true);
  });

  it('should reflect active marks via isActive once a command runs', () => {
    component.api.editor().commands.selectAll();
    component.api.runCommand('toggleBold');
    expect(component.api.isActive('bold')).toBe(true);
  });
});
