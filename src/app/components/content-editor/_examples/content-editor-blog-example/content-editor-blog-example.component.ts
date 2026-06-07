import { Component, signal } from '@angular/core';
import { ContentEditorComponent } from '@elementar-rt/components/content-editor';
import { FormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-content-editor-blog-example',
  imports: [
    ContentEditorComponent,
    FormsModule,
    MatButton
  ],
  templateUrl: './content-editor-blog-example.component.html',
  styleUrl: './content-editor-blog-example.component.scss'
})
export class ContentEditorBlogExampleComponent {
  content = signal(`<h2>Getting started with Angular</h2><p>Angular is a platform and framework for building single-page client applications using HTML and TypeScript.</p>`);
  saved = signal(false);

  save(): void {
    this.saved.set(true);
    setTimeout(() => this.saved.set(false), 2000);
  }
}
