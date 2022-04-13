import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

const  key = 'serach-key';
@Injectable()
export class SearchService {

  searchQuery = new Subject<string>();
  searchArray: string[] = [];
  numberOfSearchToStore = environment.numberOfSerach;

  constructor() {}

  storeInlocalStorage(query: string): void {
    let uniqueQueries;
    if(this.searchArray.length < this.numberOfSearchToStore){
      this.searchArray.push(query);
      uniqueQueries = [...new Set(this.searchArray)];
    } else {
      const index = this.numberOfSearchToStore - 1;
      this.searchArray[index] = query;
      uniqueQueries = [...new Set(this.searchArray)];
    }
    this.searchArray = uniqueQueries;
    localStorage.setItem (key,JSON.stringify(this.searchArray));
  }

  getLocaStorageData(): Observable<string[]>{
    return  localStorage.getItem (key) ? of(JSON.parse(localStorage.getItem (key) || '')) : of('') ;
  }

}
