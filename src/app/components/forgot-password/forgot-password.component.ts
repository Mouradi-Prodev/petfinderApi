import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {

  resetForm: FormGroup

  constructor(private formBuilder: FormBuilder,private authService: AuthService) {

    this.resetForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }
  sendResetPassword():void{
    this.authService.sendPasswordResetEmail(this.resetForm.get('email')?.value)
  }
}
