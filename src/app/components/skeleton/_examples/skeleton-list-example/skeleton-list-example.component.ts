import { Component } from '@angular/core';
import {
  SkeletonComponent, SkeletonCircleComponent, SkeletonLineComponent
} from '@elementar-rt/components/skeleton';

@Component({
  selector: 'app-skeleton-list-example',
  imports: [SkeletonComponent, SkeletonCircleComponent, SkeletonLineComponent],
  templateUrl: './skeleton-list-example.component.html',
  styleUrl: './skeleton-list-example.component.scss'
})
export class SkeletonListExampleComponent {}
