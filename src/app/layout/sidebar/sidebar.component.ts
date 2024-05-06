import { animate, query, stagger, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { WebSocketService } from 'src/app/auth/websocket.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  animations: [
    trigger('listAnimation', [
      transition('* => *', [
        query(':enter', [
          style({
            transform: 'translateY(0%)',
            'height': '0', opacity: 0,
          }),
          stagger(500, [
            animate('1s ease-in-out', style({ 'height': '*', transform: 'translateY(0%)', opacity: 1, }))
          ])
        ], { optional: true })
      ])
    ]),
    trigger('shrinkIn', [
      state('void', style({ transform: 'translateY(-100%' })),
      state('*', style({ transform: '*' })),
      transition('* <=> void', [animate('2s ease-in-out')]),
    ]),
  ]
})
export class SidebarComponent implements OnInit {
  private updatesSubscription: Subscription = new Subscription();

  constructor(public webSocketService: WebSocketService) { }
  notifications: any[] = [];
  ngOnInit(): void {
    this.open()
    this.updatesSubscription = this.webSocketService.getUpdates("notify").subscribe({
      next: (update) => {
        this.notifications.splice(0, 0, { update, time: new Date().toLocaleTimeString() });
      },
      error: (error) => console.error(error)
    });
  }

  open() {
    this.webSocketService.openWebSocket();
  }
}
