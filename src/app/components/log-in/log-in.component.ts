import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent {
  constructor(private formBuilder: FormBuilder, private authService: AuthService,private router: Router) { }
  registrationForm!: FormGroup;
  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }
  signIn(): void {
    if(this.registrationForm.valid){
      const email = this.registrationForm.get('email')?.value;
      const password = this.registrationForm.get('password')?.value;
      this.authService.signIn(email,password)
    }
  }
  ForgotPasswordRedirect():void {
    this.router.navigate(['forgot-password'])
  }
}
