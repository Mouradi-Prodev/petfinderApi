import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AuthService } from './auth/auth.service';
import { onAuthStateChanged, getAuth, User } from "firebase/auth";
import { ApiService } from './api/api.service';
import { Animal, AnimalResponse } from './api/animal';
import { FavoriteService } from './favorite/favorite.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private auth: Auth;
  title = 'Petfinder';
  isLoggedIn = false;
  User: User | null = null;
  count!:number;
  constructor(private authService: AuthService, private router: Router, private favoriteService: FavoriteService) {
    this.auth = getAuth();
  }
  ngOnInit(): void {
    onAuthStateChanged(this.auth, (user) => {
      if ( user?.emailVerified == true) {
        this.User = user;
        console.log(user);
        this.isLoggedIn = true;
        this.favoriteService.getFavorites().subscribe(
          response=>{
             this.count = response.length;
             
          }
        );
        this.router.navigate(['/home'])
       
       
      }else if(user?.emailVerified == false){
        this.User = user;
        this.isLoggedIn = true;
        this.router.navigate(['/verify-email'])
      } 
      else {
        this.isLoggedIn = false;
        // Redirect to Login page when not logged in and trying to access other pages
        this.router.navigate(['/login']);
      }
    });

  
  }

  signOut() {
    this.authService.signOut();
    this.isLoggedIn = false;
  }

  showFavorite() {
    this.router.navigate(['/favorites'])
  }
}
