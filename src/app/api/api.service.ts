import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { User, UserProfile } from '@angular/fire/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Animal } from './animal';



@Injectable({
  providedIn: 'root'
})
export class ApiService{
  private apiUrl = environment.apiUrl;
  private oAuthUrl = environment.oAuthUrl;
  private accessToken: string | null = null;
  private User:User | null = null;

  constructor(private http: HttpClient,private _snackBar: MatSnackBar){}
  

  authenticate(): Observable<any> {
    const body = {
      grant_type: 'client_credentials',
      client_id: "9mobydIp033SLUZ2o1cMetAGKRkfmbVhr5AptsJLtTXm49WiWh",
      client_secret: "L2Cu6EbIEsFSuQBenIn3VDRrTxrq3MUuHgA4B6wq"
    };
    return this.http.post<any>(`${this.apiUrl + this.oAuthUrl}`, body);
  }

  setAccessToken(token: string): void {
    this.accessToken = token;
  }


  getAnimals(params: HttpParams): Observable<any> {
    if (!this.accessToken) {
      throw new Error('Access token is not set. Please authenticate first.');
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.accessToken}`
    });
   
    return this.http.get<any>(`${this.apiUrl}/v2/animals`, { headers ,params});
  }


  getTypes(){
    if(!this.accessToken) {
      throw new Error("Session ended");
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.accessToken}`
    })
    return this.http.get<any>(`${this.apiUrl}/v2/types`, {headers});
  }
  getBreeds(breedUrl:string){
    if(!this.accessToken) {
      throw new Error("Session ended");
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.accessToken}`
    })
    return this.http.get<any>(`${this.apiUrl}${breedUrl}`, {headers});
  }

  

  openSnackBar(message: any, action: string) {
    this._snackBar.open(message, action, { verticalPosition: 'top', duration: 5000 });
  }
  
}
