import { Component, input, ChangeDetectionStrategy, booleanAttribute } from '@angular/core';
import { NgClass } from '@angular/common';

export type TagVariant = 'filled' | 'soft' | 'outlined';
export type TagColor = 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info';
export type TagSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'emr-tag',
  standalone: true,
  imports: [NgClass],
  templateUrl: './tag.component.html',
  styleUrl: './tag.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.data-variant]': 'variant()',
    '[attr.data-color]': 'color()',
    '[attr.data-size]': 'size()',
  }
})
export class TagComponent {
  variant = input<TagVariant>('soft');
  color = input<TagColor>('default');
  size = input<TagSize>('md');
  dot = input(false, { transform: booleanAttribute });
  icon = input<string>('');
}
