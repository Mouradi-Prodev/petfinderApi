import { Injectable } from '@angular/core';
import {
  getAuth, createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut, Auth, UserCredential, sendEmailVerification,
  updateProfile,
  sendPasswordResetEmail
} from "firebase/auth";

import { Observable, config } from 'rxjs';
import { User } from '../model/user.interface';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { onAuthStateChanged } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: User | null = null;
  auth: Auth;
  private router: Router
  constructor(private _snackBar: MatSnackBar) {
    this.router = new Router();

    this.auth = getAuth();
    onAuthStateChanged(this.auth, (user) => {
      this.user = user;
    })
    // this.user = new Observable(subscriber => {
    //   const unsubscribe = this.auth.onAuthStateChanged(subscriber);
    //   return unsubscribe;
    // });

  }

  async signUp(email: string, password: string,username:string): Promise<void> {
    try {
      const userCredential: UserCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      await sendEmailVerification(userCredential.user);
      await updateProfile(userCredential.user,{displayName: username});
      // this.router.navigateByUrl('/verify-email')
    
    } catch (error) {
      alert('Erreur lors de l\'inscription :' + error);

    }
  }

  async signIn(email: string, password: string): Promise<void> {
    try {
      const User = await signInWithEmailAndPassword(this.auth, email, password);

     
    } catch (error) {

      this.openSnackBar(error, "Fermer")

    }
  }

  async signOut(): Promise<void> {
    try {
      await signOut(this.auth);
      this.router.navigateByUrl('/login')
    } catch (error) {
      console.error('Erreur lors de la déconnexion :', error);

    }
  }

  openSnackBar(message: any, action: string) {
    this._snackBar.open(message, action, { verticalPosition: 'top', duration: 5000 });
  }
  sendPasswordResetEmail(email: string) {
    sendPasswordResetEmail(this.auth,email).then(()=>{
      this.openSnackBar("Un mail vous a été envoyé pour réinitialiser votre mot de passe", "OK");
    }).catch((error)=>{
      this.openSnackBar("Cet utilisateur n'existe pas ou il est inactif.", "OK");
    })
  }

  
  
 
}
