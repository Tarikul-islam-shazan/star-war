import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Starship, StrashipList } from "../starships/models/starship";
import { StarshipsService } from "../starships/starships.service";
import { getTestStarships } from "./mock-starships";

@Injectable()
export class MockService extends StarshipsService{
  expectedStarshipList: StrashipList = getTestStarships();

  constructor() {
    super(null!)
   }

  override getStarships(page: number): Observable<StrashipList>{
    return of(this.expectedStarshipList)
  }

  // override searchStarshipList(query: string): Observable<StrashipList>{
  //   return of(this.expectedStarshipList.results.filter(value => value.name.match(query)));
  // }

  override getStarship(id: number ): Observable<Starship>{
    return of(this.expectedStarshipList.results[0]);
  }
}
