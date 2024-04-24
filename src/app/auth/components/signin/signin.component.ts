import { Component } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent {
  constructor(
    private auth: AuthService,
    private router: Router,
    private formBuilder: FormBuilder

  ) {
  }
  form: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  ngOnInit(): void {
    
    this.form = this.formBuilder.group(
      {
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
    this.login(this.form.value.email,this.form.value.password);
  }
 
  errorText: string = ''
  login(email:string,password:string) {
    this.auth.authenticate( email,password).subscribe({
      next: (n) => {
        // this.auth.isAdmin ? this.router.navigate(['/admin-dashboard']) :
        // this.router.navigate(['/dashboard']);
      },
      error: (e) => {
        this.errorText = e.error || e.message;
        this.showError = true;
      }
    })
  }
}