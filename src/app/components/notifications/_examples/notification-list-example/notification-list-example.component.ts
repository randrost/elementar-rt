import { Component } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import {
  NotificationAvatarDirective,
  NotificationActorComponent,
  NotificationComponent,
  NotificationControlsDefDirective,
  NotificationDefDirective,
  NotificationListComponent,
  NotificationMessageComponent,
  NotificationTimeComponent,
  NotificationContentComponent
} from '@elementar-rt/components/notifications';
import { MatIcon } from '@angular/material/icon';
import { DicebearComponent } from '@elementar-rt/components/avatar';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-notification-list-example',
  imports: [
    MatIconButton,
    MatIcon,
    MatMenuItem,
    MatMenu,
    NotificationControlsDefDirective,
    NotificationDefDirective,
    NotificationListComponent,
    MatMenuTrigger,
    NotificationComponent,
    DicebearComponent,
    NotificationAvatarDirective,
    NotificationActorComponent,
    NotificationMessageComponent,
    NotificationTimeComponent,
    RouterLink,
    NotificationContentComponent
  ],
  templateUrl: './notification-list-example.component.html',
  styleUrl: './notification-list-example.component.scss'
})
export class NotificationListExampleComponent {
  notifications: any[] = [
    {
      actor: {
        id: 1,
        name: 'Justin Hansen',
        username: 'justin.hansen',
        avatarUrl: 'assets/avatars/6.svg'
      },
      notifier: {
        id: 2,
        name: 'Elma Johnson',
        username: 'elma.johnson',
        avatarUrl: 'assets/avatars/4.svg'
      },
      message: 'what did you say?',
      isUnread: true,
      type: 'mentionedInComment',
      createdAt: '1 hour ago'
    },
    {
      actor: {
        id: 3,
        name: 'Johnny Gladden',
        username: 'johnny.gladden',
        avatarUrl: 'assets/avatars/3.svg'
      },
      notifier: {
        id: 4,
        name: 'Angela Naylor',
        username: 'angela.naylor',
        avatarUrl: 'assets/avatars/1.svg'
      },
      payload: {
        folderName: 'My New Project'
      },
      isUnread: true,
      type: 'inviteToEditFilesInFolder',
      createdAt: '2 hours ago'
    },
    {
      actor: {
        id: 1,
        name: 'Justin Hansen',
        username: 'justin.hansen',
        avatarUrl: 'assets/avatars/7.svg'
      },
      notifier: {
        id: 2,
        name: 'Elma Johnson',
        username: 'elma.johnson',
        avatarUrl: 'assets/avatars/8.svg'
      },
      payload: {
        content: 'what did you say?'
      },
      type: 'mentionedInComment',
      createdAt: '1 hour ago'
    },
  ];
}
