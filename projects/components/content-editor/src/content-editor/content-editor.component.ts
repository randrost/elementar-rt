import {
  Component, input, output, forwardRef, signal, ChangeDetectionStrategy,
  booleanAttribute, ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import {
  TextEditorComponent, TextEditorToolbarComponent, TextEditorDividerComponent,
  TextEditorBubbleMenuComponent,
  TextEditorCommandBoldDirective, TextEditorCommandItalicDirective,
  TextEditorCommandStrikeDirective, TextEditorCommandBulletListDirective,
  TextEditorCommandOrderedListDirective, TextEditorCommandBlockquoteDirective,
  TextEditorCommandCodeBlockDirective, TextEditorCommandHeadingDirective,
  TextEditorCommandHorizontalRuleDirective,
} from '@elementar-rt/components/text-editor';

@Component({
  selector: 'emr-content-editor',
  standalone: true,
  imports: [
    TextEditorComponent,
    TextEditorToolbarComponent,
    TextEditorDividerComponent,
    TextEditorBubbleMenuComponent,
    TextEditorCommandBoldDirective,
    TextEditorCommandItalicDirective,
    TextEditorCommandStrikeDirective,
    TextEditorCommandBulletListDirective,
    TextEditorCommandOrderedListDirective,
    TextEditorCommandBlockquoteDirective,
    TextEditorCommandCodeBlockDirective,
    TextEditorCommandHeadingDirective,
    TextEditorCommandHorizontalRuleDirective,
  ],
  template: `
    <div class="ce-wrapper">
      <emr-text-editor
        class="ce-editor"
        [content]="_value()"
        (contentChange)="_onContentChange($event)"
        (editorReady)="editorReady.emit($event)"
        #editor
      >
        <emr-text-editor-toolbar class="ce-toolbar">
          <button emrTextEditorCommandHeading [level]="1" title="Heading 1">H1</button>
          <button emrTextEditorCommandHeading [level]="2" title="Heading 2">H2</button>
          <button emrTextEditorCommandHeading [level]="3" title="Heading 3">H3</button>
          <emr-text-editor-divider />
          <button emrTextEditorCommandBold title="Bold"><b>B</b></button>
          <button emrTextEditorCommandItalic title="Italic"><i>I</i></button>
          <button emrTextEditorCommandStrike title="Strikethrough"><s>S</s></button>
          <emr-text-editor-divider />
          <button emrTextEditorCommandBulletList title="Bullet list">• List</button>
          <button emrTextEditorCommandOrderedList title="Numbered list">1. List</button>
          <emr-text-editor-divider />
          <button emrTextEditorCommandBlockquote title="Blockquote">" Quote</button>
          <button emrTextEditorCommandCodeBlock title="Code block">{ } Code</button>
          <button emrTextEditorCommandHorizontalRule title="Divider">— HR</button>
        </emr-text-editor-toolbar>

        <emr-text-editor-bubble-menu>
          <button emrTextEditorCommandBold><b>B</b></button>
          <button emrTextEditorCommandItalic><i>I</i></button>
          <button emrTextEditorCommandStrike><s>S</s></button>
        </emr-text-editor-bubble-menu>
      </emr-text-editor>
    </div>
  `,
  styles: [`
    @reference 'tailwindcss';

    :host { display: block; }

    .ce-wrapper {
      border: 1px solid var(--color-outline-variant);
      border-radius: theme(--radius-xl);
      overflow: hidden;
      background: var(--color-surface);
    }

    .ce-toolbar {
      border-bottom: 1px solid var(--color-outline-variant);
      padding: --spacing(2);
      display: flex;
      flex-wrap: wrap;
      gap: --spacing(0.5);
      background: var(--color-surface-container);

      button {
        padding: --spacing(1) --spacing(2);
        border-radius: theme(--radius-md);
        font-size: theme(--text-sm);
        font-weight: 500;
        background: transparent;
        border: none;
        cursor: pointer;
        color: var(--color-on-surface-variant);
        &:hover { background: var(--color-surface-container-high); color: var(--color-on-surface); }
        &[data-active] { background: var(--color-primary-container); color: var(--color-on-primary-container); }
      }
    }

    .ce-editor {
      ::ng-deep .ProseMirror {
        padding: --spacing(4) --spacing(5);
        min-height: --spacing(48);
        outline: none;
        line-height: 1.6;
        color: var(--color-on-surface);

        h1 { font-size: 1.75rem; font-weight: 800; margin: --spacing(4) 0 --spacing(2); }
        h2 { font-size: 1.35rem; font-weight: 700; margin: --spacing(3) 0 --spacing(1.5); }
        h3 { font-size: 1.1rem; font-weight: 600; margin: --spacing(2) 0 --spacing(1); }
        p { margin: --spacing(2) 0; }
        ul, ol { padding-left: --spacing(6); margin: --spacing(2) 0; }
        li { margin: --spacing(1) 0; }
        blockquote { border-left: 4px solid var(--color-primary); padding-left: --spacing(4); margin: --spacing(4) 0; color: var(--color-on-surface-variant); font-style: italic; }
        pre { background: var(--color-surface-container); border-radius: theme(--radius-lg); padding: --spacing(4); margin: --spacing(3) 0; overflow-x: auto; }
        code { font-family: ui-monospace, monospace; font-size: 0.875em; background: var(--color-surface-container); padding: --spacing(0.5) --spacing(1); border-radius: theme(--radius-sm); }
        hr { border: none; border-top: 1px solid var(--color-outline-variant); margin: --spacing(4) 0; }

        &.ProseMirror-focused { outline: none; }
        p.is-editor-empty:first-child::before { content: attr(data-placeholder); color: var(--color-on-surface-variant); opacity: 0.5; pointer-events: none; }
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ContentEditorComponent),
    multi: true
  }]
})
export class ContentEditorComponent implements ControlValueAccessor {
  placeholder = input('Start writing…');
  editorReady = output<unknown>();

  protected _value = signal('');
  private _onChange = (_: string) => {};
  private _onTouched = () => {};

  writeValue(val: string): void { this._value.set(val ?? ''); }
  registerOnChange(fn: (_: string) => void): void { this._onChange = fn; }
  registerOnTouched(fn: () => void): void { this._onTouched = fn; }

  protected _onContentChange(content: string): void {
    this._value.set(content);
    this._onChange(content);
    this._onTouched();
  }
}
