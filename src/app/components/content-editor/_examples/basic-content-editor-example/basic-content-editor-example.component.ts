import { Component, signal } from '@angular/core';
import { ContentEditorComponent } from '@elementar-rt/components/content-editor';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-basic-content-editor-example',
  imports: [ContentEditorComponent, FormsModule],
  templateUrl: './basic-content-editor-example.component.html',
  styleUrl: './basic-content-editor-example.component.scss'
})
export class BasicContentEditorExampleComponent {
  content = signal('');
}
