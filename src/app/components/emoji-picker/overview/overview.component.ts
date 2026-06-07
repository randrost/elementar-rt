import { Component } from '@angular/core';
import { PageContentDirective } from '@meta/page/page-content.directive';
import {
  BasicEmojiPickerExampleComponent
} from '../_examples/basic-emoji-picker-example/basic-emoji-picker-example.component';
import {
  EmojiPickerInInputExampleComponent
} from '../_examples/emoji-picker-in-input-example/emoji-picker-in-input-example.component';
import { PlaygroundComponent } from '@meta/playground/playground.component';
import { PageComponent } from '@meta/page/page.component';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { PageTitleDirective } from '@meta/page/page-title.directive';

@Component({
  selector: 'app-overview',
  imports: [
    PageContentDirective,
    BasicEmojiPickerExampleComponent,
    EmojiPickerInInputExampleComponent,
    PlaygroundComponent,
    PageComponent,
    MatTab,
    MatTabGroup,
    PageTitleDirective
  ],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss'
})
export class OverviewComponent {

}
