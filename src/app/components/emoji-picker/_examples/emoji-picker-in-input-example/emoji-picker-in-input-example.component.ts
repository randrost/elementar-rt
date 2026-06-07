import { Component, signal } from '@angular/core';
import { EmojiPickerComponent, EmojiPickerTriggerForDirective } from '@elementar-rt/components/emoji-picker';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-emoji-picker-in-input-example',
  imports: [
    EmojiPickerComponent,
    EmojiPickerTriggerForDirective,
    MatIconButton,
    MatIcon,
    FormsModule
  ],
  templateUrl: './emoji-picker-in-input-example.component.html',
  styleUrl: './emoji-picker-in-input-example.component.scss'
})
export class EmojiPickerInInputExampleComponent {
  message = signal('');

  onEmojiSelected(emoji: string): void {
    this.message.update(v => v + emoji);
  }
}
