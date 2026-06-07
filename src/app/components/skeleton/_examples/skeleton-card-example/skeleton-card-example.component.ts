import { Component } from '@angular/core';
import {
  SkeletonComponent, SkeletonCircleComponent,
  SkeletonLineComponent, SkeletonBlockComponent
} from '@elementar-rt/components/skeleton';

@Component({
  selector: 'app-skeleton-card-example',
  imports: [SkeletonComponent, SkeletonCircleComponent, SkeletonLineComponent, SkeletonBlockComponent],
  templateUrl: './skeleton-card-example.component.html',
  styleUrl: './skeleton-card-example.component.scss'
})
export class SkeletonCardExampleComponent {}
