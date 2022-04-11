import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, SimpleChanges } from '@angular/core';
import { PeopleData, People } from './models/people';
import { PeopleService } from './people.service';
import * as _ from 'lodash';
import { Subscription } from 'rxjs';

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

  constructor(
    private changeDetectionRef: ChangeDetectorRef,
    private peopleService: PeopleService,
  ) { }

  ngOnInit(): void {
    this.getPeoples(this.page);
  }

  // ngOnChanges(changes: SimpleChanges): void {
  //   console.log('Search => ', this.searchService.getSearchQuery());

  // }

  getPeoples(page: number): void {
    this.getPeoplesService = this.peopleService.getPeople(page).subscribe( peoples => {
      if(page == 1) this.totalPage = Math.ceil(peoples.count/peoples.results.length)
      this.pagination(peoples);
      this.peoples = peoples.results;
      this.changeDetectionRef.markForCheck();
    });
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
    console.log("current page " + this.page);
    this.getPeoples(this.page);
  }

  searchThis(){
    console.log('search this called');
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.getPeoplesService.unsubscribe();
  }

}
