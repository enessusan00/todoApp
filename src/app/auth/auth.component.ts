import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  constructor(
    private auth: AuthService,
    private router: Router

  ) { }


  login() {

    this.auth.authenticate('dsd@gmail.com', 'pasasdfsword').subscribe((data: any) => {
     
      this.router.navigate(['/dashboard']);
    }
    );
  }

  signUp() {
    this.auth.signup('demousaaaaaaaeererer2sasdsd', 'dsd@gmail.com', 'pasasdfsword').subscribe((data: any) => {
      console.log(data);
    }
    );
  }
}
