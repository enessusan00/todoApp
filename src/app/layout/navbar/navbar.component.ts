import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  constructor(private auth: AuthService,
    private router: Router,
  ) { }
  username: string = '';

  ngOnInit(): void {
    this.username = localStorage.getItem('USERNAME') as string;
  }
  logout() {
    this.auth.logout().subscribe();
    this.router.navigate(['/signin']);
  }
}
