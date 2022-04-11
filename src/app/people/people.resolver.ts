import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { PeopleData } from './models/people';
import { PeopleService } from './people.service';

@Injectable({
  providedIn: 'root'
})
export class PeopleResolver implements Resolve<PeopleData> {
  constructor(private peopleService: PeopleService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): Observable<PeopleData>  {
    return this.peopleService.getPeopleDetails(Number(route.paramMap.get('id')));
  }
}
