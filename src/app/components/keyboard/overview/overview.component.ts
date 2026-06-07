import { Component } from '@angular/core';
import { PlaygroundComponent } from '@meta/playground/playground.component';
import { BasicKeyboardExampleComponent } from '../_examples/basic-keyboard-example/basic-keyboard-example.component';
import { KeyboardShortcutsExampleComponent } from '../_examples/keyboard-shortcuts-example/keyboard-shortcuts-example.component';
import { PageComponent } from '@meta/page/page.component';
import { PageContentDirective } from '@meta/page/page-content.directive';
import { PageTitleDirective } from '@meta/page/page-title.directive';
import { MatDivider } from '@angular/material/divider';

@Component({
  imports: [
    PlaygroundComponent,
    BasicKeyboardExampleComponent,
    KeyboardShortcutsExampleComponent,
    PageComponent, PageContentDirective, PageTitleDirective, MatDivider
  ],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss'
})
export class OverviewComponent {}
