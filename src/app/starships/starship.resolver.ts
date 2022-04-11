import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Starship } from './models/starship';
import { StarshipsService } from './starships.service';

@Injectable({
  providedIn: 'root'
})
export class StarshipResolver implements Resolve<Starship> {

  constructor(private starshipService: StarshipsService){}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): Observable<Starship> {
    return this.starshipService.getStarship(Number(route.paramMap.get('id')));
  }
}
