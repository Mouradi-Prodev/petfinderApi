import { Component } from '@angular/core';
import { DocumentData } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Animal } from 'src/app/api/animal';
import { ApiService } from 'src/app/api/api.service';
import { FavoriteService } from 'src/app/favorite/favorite.service';
import { LoaderService } from 'src/app/loader.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.css'
})
export class FavoritesComponent {
  Favorites: DocumentData[] = [];
  constructor(private apiService: ApiService, private router: Router, private loadingService: LoaderService,
    private favoriteService: FavoriteService) {
   this.loadingService.setLoading(true);
    this.favoriteService.getFavorites().subscribe(response => {
      this.Favorites = response;
      this.loadingService.setLoading(false);
    });
  }
  

  addToFavorites(animal: DocumentData): void {
    const animalData = animal as Animal;
    this.favoriteService.addToFavorites(animalData)
      .then(() => {
       
      })
      .catch((error: any) => {
        this.apiService.openSnackBar(error.message, "X");
      });
  }
  isFavorite(animal: DocumentData): boolean {
    return this.Favorites.some(favorite => favorite["id"] === animal["id"]);
  }
}
