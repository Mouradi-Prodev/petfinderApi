import { animate, group, query, stagger, style, transition, trigger } from '@angular/animations';
import { HttpParams } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import { getAuth, Auth, User, onAuthStateChanged } from '@angular/fire/auth';
import { DocumentData } from '@angular/fire/firestore';
import { FormControl } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Animal, AnimalResponse, Breed, Types } from 'src/app/api/animal';
import { ApiService } from 'src/app/api/api.service';
import { FavoriteService } from 'src/app/favorite/favorite.service';
import { LoaderService } from 'src/app/loader.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  animations: []
})
export class HomeComponent implements OnInit {
  private auth: Auth;
  ResponseAnimals: AnimalResponse | null = null;
  Animals: Animal[] = [];
  User: User | null = null;
  params: HttpParams;
  Types: Types[] = [];
  Breeds: Breed[] = [];
  Genders:[]=[];
  favorites: DocumentData[] = [];
  type_selected = new FormControl<string>({ value: "", disabled: false });
  breed_selected = new FormControl<string>({ value: "", disabled: false });
  gender_selected = new FormControl<string>({ value: "", disabled: false });
  constructor(private apiService: ApiService, private router: Router, private loadingService: LoaderService,
    private favoriteService: FavoriteService) {
    this.auth = getAuth();
    this.params = new HttpParams();
    this.favoriteService.getFavorites().subscribe(response => {
      this.favorites = response;
      
    });
  }

  ngOnInit(): void {
    // Get all animals for the homepage
    //authenticate to get the token !!
    onAuthStateChanged(this.auth, (user) => {
      if (user?.emailVerified) {


        //  for making authenticated requests
        this.apiService.authenticate().subscribe(
          response => {
            this.apiService.setAccessToken(response.access_token);
            this.GetAnimals(this.params);
            this.apiService.getTypes().subscribe(
              response => {
                this.Types = response.types
                this.Genders = response.types[0].genders;
            
                console.log(this.Types)
              }
            )
          },
          error => {
            console.error('Authentication failed:', error);
          }
        );


      } else {
        this.router.navigate(['/verify-email']);
      }
    });

  }




  async GetAnimals(params: HttpParams) {
    this.loadingService.setLoading(true)


    this.apiService.getAnimals(params).subscribe(
      animals => {

        this.ResponseAnimals = animals;
        this.Animals = animals.animals
        console.log(this.ResponseAnimals);
        this.loadingService.setLoading(false)
      },
      error => {
        console.error('Failed to fetch animals:', error);
      }
    );
  }

  handlePageEvent($event: PageEvent) {
    const type = this.type_selected.value;
    const breed = this.breed_selected.value;
    const gender = this.gender_selected.value;
    // console.log($event)
    const page = $event.pageIndex + 1
    this.loadingService.setLoading(true)
    //  for making authenticated requests
    this.apiService.authenticate().subscribe(
      response => {
        this.apiService.setAccessToken(response.access_token);
        this.GetAnimals(this.params.set('page', page).set('type', type!).set('gender', gender!).set('breed', breed!));

      },
      error => {
        console.error('Authentication failed:', error);
      }
    );

  }
  getBreeds(breedUrl: string) {
    this.loadingService.setLoading(true)
    this.apiService.getBreeds(breedUrl).subscribe(
      response => {
        console.log(response);
        this.Breeds = response.breeds;
        this.loadingService.setLoading(false)
      }
    )
  }

  Filter() {
    const type = this.type_selected.value;
    const breed = this.breed_selected.value;
    const gender = this.gender_selected.value;
    this.apiService.authenticate().subscribe(
      response => {
        this.apiService.setAccessToken(response.access_token);
        this.GetAnimals(this.params.set('type', type!).set('breed', breed!).set('gender', gender!).set('page', 1))
      },
      err => { console.log("Error") },
      (): void => { }
    )
  }

  addToFavorites(animal: Animal): void {
    this.favoriteService.addToFavorites(animal)
      .then(() => {
       
      })
      .catch((error: any) => {
        this.apiService.openSnackBar(error.message, "X");
      });
  }
  isFavorite(animal: Animal): boolean {
    return this.favorites.some(favorite => favorite["id"] === animal.id);
  }
}
