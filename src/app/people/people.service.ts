import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HomeWorld } from './models/homeworld';
import { People, PeopleData } from './models/people';

@Injectable()
export class PeopleService {
  apiEndpoint = environment.apiUrl + 'people/';

  constructor(private http: HttpClient) { }

  getPeople(page: number): Observable<People>{
    return this.http.get<People>(this.apiEndpoint + '?page=' + page);
  }

  searchPeopleList(query: string): Observable<any> {
    return this.http.get(this.apiEndpoint + '?search=' + query)
  }

  getPeopleDetails(id: number): Observable<PeopleData> {
    return this.http.get<PeopleData>(this.apiEndpoint + id);
  }

  getHomeWorld(url: string): Observable<HomeWorld>{
    return this.http.get<HomeWorld>(url);
  }
}
