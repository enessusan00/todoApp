import { Component, HostListener } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private auth: AuthService) { }
  @HostListener('window:unload', ['$event'])
  unloadHandler(event: Event) {
    // unload olayında yapılacak işlemler
    this.auth.status().subscribe()
  }
}

