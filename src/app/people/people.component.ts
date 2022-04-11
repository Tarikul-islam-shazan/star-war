import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, SimpleChanges } from '@angular/core';
import { PeopleData, People } from './models/people';
import { PeopleService } from './people.service';
import * as _ from 'lodash';
import { Subscription } from 'rxjs';
import { SearchService } from '../core/services/search.service';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PeopleComponent implements OnInit {

  peoples: PeopleData[] = [];
  page: number = 1;
  totalPage: number = 0;
  prevPage: number = 0;
  nextPage: number = 0;
  isPrevious: boolean = false;
  isNext: boolean = false;
  getPeoplesService = Subscription.EMPTY;
  subs: Subscription[] = [];
  data: string = '';

  constructor(
    private changeDetectionRef: ChangeDetectorRef,
    private peopleService: PeopleService,
    private searchService: SearchService
  ) { }

  ngOnInit(): void {
    this.searchOnPeopleList();
    this.getPeoples(this.page);
  }

  searchOnPeopleList() : void{
      this.searchService.searchQuery.subscribe(query => {
        if(query.length != 0){
          this.peopleService.searchPeopleList(query).subscribe(people => {
            console.log('search',people);
            this.isPrevious = false;
            this.isNext = false;
            this.peoples = people.results;
            this.changeDetectionRef.markForCheck();
          })
        } else {
          this.getPeoples(this.page);
        }
    });
  }


  getPeoples(page: number): void {
    this.getPeoplesService = this.peopleService.getPeople(page).subscribe( peoples => {
      if(page == 1) this.totalPage = Math.ceil(peoples.count/peoples.results.length)
      this.pagination(peoples);
      this.peoples = peoples.results;
      this.changeDetectionRef.markForCheck();
    });
  }

  getIndex(urlString : string): number{
    const url  = urlString.split('/');
    return  Number(url[5]);
  }

  getPageNumber(urlString : string): number{
    const url = new URL(urlString);
    const pageNumber = url.searchParams.get('page');
    return  Number(pageNumber);
  }

  pagination(peoples: People): void{
    if(peoples.previous) {
      this.prevPage = this.getPageNumber(peoples.previous)
      this.isPrevious = true;
    }
    if(peoples.next){
      this.nextPage = this.getPageNumber(peoples.next);
      this.isNext = true;
    }
  }

  goToPrevPage(): void{
    this.page = this.prevPage;
    if(this.page === 1) {
      this.isPrevious = false;
      return;
    }
    this.getPeoples(this.page);
  }

  goToNextPage(): void{
    this.page = this.nextPage;
    if(this.page == this.totalPage ) {
      this.isNext = false;
      return;
    }
    //console.log("current page " + this.page);
    this.getPeoples(this.page);
  }

  ngOnDestroy(): void {
    this.getPeoplesService.unsubscribe();
  }

}
