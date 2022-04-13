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
  searchServiceSubscription = Subscription.EMPTY;
  prevText: string = 'prev';
  nextText: string = 'next';


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
      this.searchServiceSubscription = this.searchService.searchQuery.subscribe(query => {
        if(query.length != 0){
          this.peopleService.searchPeopleList(query).subscribe(people => {
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
      const { count, results, previous, next } = peoples;
      if(page == 1) this.totalPage = Math.ceil(count/results.length)
      this.pagination(previous,next);
      this.peoples = results;
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

  pagination(previous: string, next: string): void{
    if(previous) {
      this.prevPage = this.getPageNumber(previous)
      this.isPrevious = true;
    }
    if(next){
      this.nextPage = this.getPageNumber(next);
      this.isNext = true;
    }
  }

  pageChange(choice: string){
    if(choice == this.prevText){
      this.page = this.prevPage;
      if(this.page === 1) {
        this.isPrevious = false;
        return;
      }
    }
    if(choice == this.nextText){
      this.page = this.nextPage;
      if(this.page == this.totalPage ) {
        this.isNext = false;
        return;
      }
    }
    this.getPeoples(this.page);
  }

  ngOnDestroy(): void {
    this.getPeoplesService.unsubscribe();
    this.searchServiceSubscription.unsubscribe();
  }

}
