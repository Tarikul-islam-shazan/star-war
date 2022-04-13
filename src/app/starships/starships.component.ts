import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SearchService } from '../core/services/search.service';
import { Starship, StrashipList } from './models/starship';
import { StarshipsService } from './starships.service';

@Component({
  selector: 'app-starships',
  templateUrl: './starships.component.html',
  styleUrls: ['./starships.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StarshipsComponent implements OnInit {

  starships:Starship[] =  [];
  starshipsServiceSubscription = Subscription.EMPTY;
  searchServiceSubscription = Subscription.EMPTY;
  page: number = 1;
  totalPage: number = 0;
  prevPage: number = 0;
  nextPage: number = 0;
  isPrevious: boolean = false;
  isNext: boolean = false;
  prevText: string = 'prev';
  nextText: string = 'next';

  constructor(
    private starshipsService: StarshipsService,
    private searchService: SearchService,
    private changeDetectionRef: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.searchOnStarshipList();
    this.getStarShip(this.page);
  }

  searchOnStarshipList() : void {
    this.searchServiceSubscription = this.searchService.searchQuery.subscribe(query => {
      if(query.length != 0){
        this.starshipsService.searchStarshipList(query).subscribe(starship => {
          this.isPrevious = false;
          this.isNext = false;
          this.starships = starship.results;
          this.changeDetectionRef.markForCheck();
        })
      } else {
        this.getStarShip(this.page);
      }
  });
}

  getStarShip(page: number) {
    this.starshipsServiceSubscription = this.starshipsService.getStarships(page).subscribe(starshipList => {
      const { count, results, previous, next } = starshipList;
      if(page == 1) this.totalPage = Math.ceil(count/results.length)
      this.pagination(previous, next);
      this.starships = results;
      this.changeDetectionRef.markForCheck();
    })
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
    this.getStarShip(this.page);
  }

  ngOnDestroy(): void {
    this.starshipsServiceSubscription.unsubscribe();
    this.searchServiceSubscription.unsubscribe();
  }
}
