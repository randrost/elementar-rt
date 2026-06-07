import { Component } from '@angular/core';
import { ToolbarComponent } from '@elementar-rt/components/toolbar';
import { MatIcon } from '@angular/material/icon';
import { MatButton, MatIconButton } from '@angular/material/button';

@Component({
  selector: 'app-toolbar-with-actions-example',
  imports: [ToolbarComponent, MatIcon, MatButton, MatIconButton],
  templateUrl: './toolbar-with-actions-example.component.html',
  styleUrl: './toolbar-with-actions-example.component.scss'
})
export class ToolbarWithActionsExampleComponent {}
