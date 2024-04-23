import { Component } from '@angular/core';
import { Auth, getAuth, onAuthStateChanged, sendEmailVerification } from '@angular/fire/auth';
// import { MatButtonModule } from '@angular/material/button';
// import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
@Component({
  selector: 'app-verify-email',
 
  templateUrl: './verify-email.component.html',
  styleUrl: './verify-email.component.css'
})
export class VerifyEmailComponent {
  auth: Auth;
  constructor(private router: Router) {
    this.auth = getAuth();
    
    if(!this.auth.currentUser)
    {
       this.router.navigate([''])
    }else{
      onAuthStateChanged(this.auth,(user)=>{
        if(user?.emailVerified){
          this.router.navigate(['']);
        }
      });
    }
   
  
  }
  async sendEmail(){
    await sendEmailVerification(this.auth.currentUser!);
  }
}
