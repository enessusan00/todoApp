import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  constructor( private auth : AuthService,
    private router: Router,
  ) { }
  logout() {
    this.auth.logout().subscribe();
    this.router.navigate(['/signin']);
  }
}
