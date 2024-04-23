import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, DocumentReference, DocumentData, doc, setDoc, CollectionReference, getDoc, deleteDoc } from '@angular/fire/firestore';
import { Animal } from '../api/animal';
import { Observable } from 'rxjs';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  usersCollection!: CollectionReference<DocumentData>;

  constructor(private fs: Firestore,private apiService:ApiService) {
    this.usersCollection = collection(this.fs, 'favorites');
  }

  async addToFavorites(animal: Animal): Promise<void> {
    // // Create a new document with a custom ID in the "favorites" collection
    // const animalDoc = doc(this.usersCollection, animal.id.toString());
    // await setDoc(animalDoc, animal);
    // Check if the animal already exists in the favorites
  const animalRef = doc(this.usersCollection, animal.id.toString());
  const animalSnapshot = await getDoc(animalRef);

  if (animalSnapshot.exists()) {
    // If the animal exists in the favorites, delete it
    await deleteDoc(animalRef);
    this.apiService.openSnackBar("Deleted from Favorites","X")
  } else {
    // If the animal does not exist in the favorites, add it
    await setDoc(animalRef, animal);
    this.apiService.openSnackBar("Added to Favorites","X")
  }
  }

  getFavorites(): Observable<DocumentData[]> {
    return collectionData<DocumentData>(this.usersCollection);
  }
}
