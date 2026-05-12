import { Component } from '@angular/core';

export interface File {
  name: string;
  state: 'uploaded' | 'uploading' | 'error';
  processing?: boolean;
  errorMessage?: string;
  remainingTime?: string;
  size?: string;
  progress?: number;
  type: string;
}

import {
  FileIconDirective,
  FilesGridComponent,
  GridFileComponent,
  GridFileControlDirective
} from '@elementar-rt/components/upload';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';

@Component({
  selector: 'app-file-grid-example',
  imports: [
    FilesGridComponent,
    GridFileComponent,
    MatIcon,
    GridFileControlDirective,
    MatIconButton,
    FileIconDirective
  ],
  templateUrl: './file-grid-example.component.html',
  styleUrl: './file-grid-example.component.scss'
})
export class FileGridExampleComponent {
  fileList: File[] = [
    {
      name: 'Annual Report.docx',
      state: 'uploaded',
      processing: false,
      type: 'doc'
    },
    {
      name: 'Workflow.pdf',
      state: 'uploading',
      processing: false,
      remainingTime: '(remaining time: 00:2:01)',
      size: '11MB',
      progress: 60,
      type: 'pdf'
    },
    {
      name: 'Financials.xlsx',
      state: 'error',
      errorMessage: 'An error occurred',
      type: 'xls'
    }
  ];

  delete(index: number) {
    this.fileList.splice(index, 1);
  }
}
