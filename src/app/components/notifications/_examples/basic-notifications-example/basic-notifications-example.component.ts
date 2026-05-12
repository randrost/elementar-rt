import { Component } from '@angular/core';
import {
  NotificationAvatarDirective,
  NotificationActorComponent,
  NotificationComponent,
  NotificationMessageComponent,
  NotificationTimeComponent, NotificationContentComponent
} from '@elementar-rt/components/notifications';
import { DicebearComponent } from '@elementar-rt/components/avatar';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-basic-notifications-example',
  imports: [
    NotificationComponent,
    DicebearComponent,
    NotificationAvatarDirective,
    NotificationMessageComponent,
    NotificationTimeComponent,
    RouterLink,
    NotificationActorComponent,
    NotificationContentComponent
  ],
  templateUrl: './basic-notifications-example.component.html',
  styleUrl: './basic-notifications-example.component.scss'
})
export class BasicNotificationsExampleComponent {
  notifications: any[] = [
    {
      actor: {
        id: 1,
        name: 'Justin Hansen',
        username: 'justin.hansen',
        avatarUrl: 'assets/avatars/5.svg'
      },
      notifier: {
        id: 2,
        name: 'Elma Johnson',
        username: 'elma.johnson',
        avatarUrl: 'assets/avatars/2.svg'
      },
      payload: {
        message: 'what did you say?'
      },
      type: 'mentionedInComment',
      createdAt: '1 hour ago'
    }
  ];
}
