import { Component } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  constructor(
    private auth: AuthService,
    private router: Router,
    private formBuilder: FormBuilder

  ) {
  }
  username: string = '';
  email: string = '';
  password: string = '';
  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
  });

  ngOnInit(): void {
    
    this.form = this.formBuilder.group(
      {
        username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(40),
          ],
        ],

      },
    );
    this.auth.logout().subscribe();
  }
  submitted = false;
  passInputType: string = 'password';

  togglePassType() {
    this.passInputType === 'password' ? this.passInputType = 'text' : this.passInputType = 'password';
  }
  showError = false;
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.showError = false
    this.signUp();
  }
 
  errorText: string = ''
  
  signUp() {
    this.auth.signup(this.form.value.username, this.form.value.email, this.form.value.password).subscribe(
      {
        next: (n) => {
          this.login(  this.form.value.email, this.form.value.password);
        },
        error: (e) => {
          this.errorText = e.error;
          this.showError = true;
        }
      }
    );
  }
  login(email:string,password:string) {
    this.auth.authenticate( email,password).subscribe({
      next: (n) => {
        this.router.navigate(['/dashboard']);
      },
      error: (e) => {
        this.errorText = e.error || e.message;
        this.showError = true;
      }
    })
  }
}
