import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatCard, MatCardContent, MatCardFooter } from '@angular/material/card';
import { OrderByPipe } from '@elementar-rt/components/core';

@Component({
  imports: [
    RouterLink,
    MatCard,
    MatCardContent,
    MatCardFooter,
    OrderByPipe
  ],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss'
})
export class OverviewComponent {
  items = signal([
    {
      routerLink: '/components/divider',
      imageUrl: 'assets/overview/divider.svg',
      name: 'Divider'
    },
    {
      routerLink: '/components/command-bar',
      imageUrl: 'assets/overview/command-bar.svg',
      name: 'Command Bar'
    },
    {
      routerLink: '/components/table',
      imageUrl: 'assets/overview/table.svg',
      name: 'Table'
    },
    {
      routerLink: '/components/dataview',
      imageUrl: 'assets/overview/data-view.svg',
      name: 'Data View'
    },
    {
      routerLink: '/components/announcement',
      imageUrl: 'assets/overview/announcement.svg',
      name: 'Announcement'
    },
    {
      routerLink: '/components/expansion-panel',
      imageUrl: 'assets/overview/accordion.svg',
      name: 'Expansion Panel'
    },
    {
      routerLink: '/components/dialog',
      imageUrl: 'assets/overview/dialog.svg',
      name: 'Dialog'
    },
    {
      routerLink: '/forms/radio',
      imageUrl: 'assets/overview/radio.svg',
      name: 'Radio'
    },
    {
      routerLink: '/components/list',
      imageUrl: 'assets/overview/list.svg',
      name: 'List'
    },
    {
      routerLink: '/components/datepicker',
      imageUrl: 'assets/overview/datepicker.svg',
      name: 'Date Picker'
    },
    {
      routerLink: '/components/number-input',
      imageUrl: 'assets/overview/number-input.svg',
      name: 'Number Input'
    },
    {
      routerLink: '/components/skeleton',
      imageUrl: 'assets/overview/skeleton.svg',
      name: 'Skeleton'
    },
    {
      routerLink: '/components/upload',
      imageUrl: 'assets/overview/upload.svg',
      name: 'Upload'
    },
    {
      routerLink: '/components/filter-builder',
      imageUrl: 'assets/overview/filter-builder.svg',
      name: 'Filter Builder'
    },
    {
      routerLink: '/forms/input',
      imageUrl: 'assets/overview/input.svg',
      name: 'Input'
    },
    {
      routerLink: '/components/badge',
      imageUrl: 'assets/overview/badge.svg',
      name: 'Badge'
    },
    {
      routerLink: '/components/snackbar',
      imageUrl: 'assets/overview/snackbar.svg',
      name: 'Snackbar'
    },
    {
      routerLink: '/components/progress-spinner',
      imageUrl: 'assets/overview/spinner.svg',
      name: 'Progress Spinner'
    },
    {
      routerLink: '/components/stepper',
      imageUrl: 'assets/overview/stepper.svg',
      name: 'Stepper'
    },
    {
      routerLink: '/forms/slide-toggle',
      imageUrl: 'assets/overview/slide-toggle.svg',
      name: 'Slide Toggle'
    },
    {
      routerLink: '/forms/pin-input',
      imageUrl: 'assets/overview/pin-input.svg',
      name: 'Pin Input'
    },
    {
      routerLink: '/forms/button-toggle',
      imageUrl: 'assets/overview/button-toggle.svg',
      name: 'Button Toggle'
    },
    {
      routerLink: '/components/popover',
      imageUrl: 'assets/overview/popover.svg',
      name: 'Popover'
    },
    {
      routerLink: '/components/tooltip',
      imageUrl: 'assets/overview/tooltip.svg',
      name: 'Tooltip'
    },
    {
      routerLink: '/components/menu',
      imageUrl: 'assets/overview/menu.svg',
      name: 'Menu'
    },
    {
      routerLink: '/components/slider',
      imageUrl: 'assets/overview/slider.svg',
      name: 'Slider'
    },
    {
      routerLink: '/components/layout',
      imageUrl: 'assets/overview/layout.svg',
      name: 'Layout'
    },
    {
      routerLink: '/components/icon',
      imageUrl: 'assets/overview/icons.svg',
      name: 'Icon'
    },
    {
      routerLink: '/components/tag',
      imageUrl: 'assets/overview/tag.svg',
      name: 'Tag',
      isNew: true
    },
    {
      routerLink: '/components/rating',
      imageUrl: 'assets/overview/rating.svg',
      name: 'Rating',
      isNew: true
    },
    {
      routerLink: '/components/keyboard',
      imageUrl: 'assets/overview/keyboard.svg',
      name: 'Keyboard',
      isNew: true
    },
    {
      routerLink: '/components/step-tracker',
      imageUrl: 'assets/overview/step-tracker.svg',
      name: 'Step Tracker',
      isNew: true
    },
    {
      routerLink: '/components/sort',
      imageUrl: 'assets/overview/sort.svg',
      name: 'Sort',
      isNew: true
    },
    {
      routerLink: '/components/digit-roller',
      imageUrl: 'assets/overview/digit-roller.svg',
      name: 'Digit Roller',
      isNew: true
    },
    {
      routerLink: '/components/content-editor',
      imageUrl: 'assets/overview/content-editor.svg',
      name: 'Content Editor',
      isNew: true
    },
    {
      routerLink: '/components/video-player',
      imageUrl: 'assets/overview/video-player.svg',
      name: 'Video Player',
      isNew: true
    },
    {
      routerLink: '/components/video-viewer',
      imageUrl: 'assets/overview/video-viewer.svg',
      name: 'Video Viewer',
      isNew: true
    },
    {
      routerLink: '/components/calendar',
      imageUrl: 'assets/overview/calendar.svg',
      name: 'Calendar',
      isNew: true
    },
    {
      routerLink: '/components/filter-select',
      imageUrl: 'assets/overview/filter-select.svg',
      name: 'Filter Select',
      isNew: true
    },
    {
      routerLink: '/components/image-zoom-viewer',
      imageUrl: 'assets/overview/image-zoom-viewer.svg',
      name: 'Image Zoom Viewer',
      isNew: true
    },
    {
      routerLink: '/components/split-pane',
      imageUrl: 'assets/overview/split-pane.svg',
      name: 'Split Pane',
      isNew: true
    },
    {
      routerLink: '/components/image-resizer',
      imageUrl: 'assets/overview/image-resizer.svg',
      name: 'Image Resizer',
      isNew: true
    },
    {
      routerLink: '/components/resizable-container',
      imageUrl: 'assets/overview/resizable-container.svg',
      name: 'Resizable Container',
      isNew: true
    },
    {
      routerLink: '/components/cookie-popup',
      imageUrl: 'assets/overview/cookie-popup.svg',
      name: 'Cookie Popup',
      isNew: true
    },
    {
      routerLink: '/components/emoji-picker',
      imageUrl: 'assets/overview/emoji-picker.svg',
      name: 'Emoji Picker',
      isNew: true
    },
    {
      routerLink: '/components/signature-pad',
      imageUrl: 'assets/overview/signature-pad.svg',
      name: 'Signature Pad',
      isNew: true
    },
    {
      routerLink: '/components/suggestions',
      imageUrl: 'assets/overview/suggestions.svg',
      name: 'Suggestions',
      isNew: true
    },
    {
      routerLink: '/components/comparison-slider',
      imageUrl: 'assets/overview/comparison-slider.svg',
      name: 'Comparison Slider',
      isNew: true
    },
    {
      routerLink: '/components/crop',
      imageUrl: 'assets/overview/crop.svg',
      name: 'Crop',
      isNew: true
    },
    {
      routerLink: '/components/action-required',
      imageUrl: 'assets/overview/action-required.svg',
      name: 'Action Required',
      isNew: true
    },
    {
      routerLink: '/components/screen-loader',
      imageUrl: 'assets/overview/screen-loader.svg',
      name: 'Screen Loader',
      isNew: true
    },
  ]);
}
