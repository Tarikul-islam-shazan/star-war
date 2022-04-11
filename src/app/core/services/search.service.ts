import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  searchQuery = new Subject<string>();
  key = 'serach-key';
  sreachArray: string[] = [];
  numberOfSearchToStore = environment.numberOfSerach;

  constructor() {}

  storeInlocalStorage(query: string) {
    if(this.sreachArray.length < this.numberOfSearchToStore){
      this.sreachArray.push(query);
    } else {
      const index = this.numberOfSearchToStore - 1;
      this.sreachArray[index] = query;
    }
    localStorage.setItem (this.key,JSON.stringify(this.sreachArray));
  }
  getLocaStorageData(): Observable<string[]>{
    return of(JSON.parse(localStorage.getItem (this.key) || ''));
  }

}
