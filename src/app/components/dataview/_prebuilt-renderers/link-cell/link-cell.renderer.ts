import { Component, input } from '@angular/core';
import { DataViewCellRendererComponent } from '@elementar-rt/components/data-view';
import { ContentFadeComponent } from '@elementar-rt/components/content-fade';

@Component({
  selector: 'app-link-cell',
  imports: [
    ContentFadeComponent
  ],
  templateUrl: './link-cell.renderer.html',
  styleUrl: './link-cell.renderer.scss'
})
export class LinkCellRenderer implements DataViewCellRendererComponent {
  element = input();
  columnDef = input();
  fieldData = input<string>();
}
