import { Component } from '@angular/core';
import { KeyboardComponent } from '@elementar-rt/components/keyboard';

@Component({
  selector: 'app-keyboard-shortcuts-example',
  imports: [KeyboardComponent],
  templateUrl: './keyboard-shortcuts-example.component.html',
  styleUrl: './keyboard-shortcuts-example.component.scss'
})
export class KeyboardShortcutsExampleComponent {
  shortcuts = [
    { label: 'Save file', keys: 'ctrl+s' },
    { label: 'Undo', keys: 'ctrl+z' },
    { label: 'Redo', keys: 'ctrl+shift+z' },
    { label: 'Find', keys: 'ctrl+f' },
    { label: 'Select all', keys: 'ctrl+a' },
    { label: 'Toggle fullscreen', keys: 'f11' },
    { label: 'Close tab', keys: 'ctrl+w' },
    { label: 'Open new tab', keys: 'ctrl+t' },
  ];
}
