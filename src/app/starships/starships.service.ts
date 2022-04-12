import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Starship, StrashipList } from './models/starship';

@Injectable()
export class StarshipsService {
  apiEndpoint = environment.apiUrl + 'starships/';

  constructor(private http: HttpClient) { }

  getStarships(page: number): Observable<StrashipList>{
    return this.http.get<StrashipList>(this.apiEndpoint + '?page=' + page);
  }

  searchStarshipList(query: string): Observable<StrashipList>{
    return this.http.get<StrashipList>(this.apiEndpoint + '?search=' + query);
  }

  getStarship(id: number ): Observable<Starship>{
    return this.http.get<Starship>(this.apiEndpoint + id);
  }
}
