import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import { MatInput, MatLabel } from '@angular/material/input';
import { MatFormField } from '@angular/material/form-field';
import { BlockLoaderComponent } from '@elementar-rt/components/block-loader';

@Component({
  selector: 'app-block-loader-modal',
  imports: [
    FormsModule,
    MatButton,
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    MatFormField,
    MatInput,
    MatLabel,
    MatDialogClose,
    BlockLoaderComponent
  ],
  templateUrl: './block-loader-modal.component.html',
  styleUrl: './block-loader-modal.component.scss'
})
export class BlockLoaderModalComponent implements OnInit {
  private dialogRef = inject(MatDialogRef<BlockLoaderModalComponent>);

  readonly loaded = signal(false);

  ngOnInit() {
    // loading data
    setTimeout(() => {
      this.loaded.set(true);
    }, 3000);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
