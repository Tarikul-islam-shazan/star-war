import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
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
  page: number = 1;
  totalPage: number = 0;
  prevPage: number = 0;
  nextPage: number = 0;
  isPrevious: boolean = false;
  isNext: boolean = false;

  constructor(
    private starshipsService: StarshipsService,
    private searchService: SearchService,
    private changeDetectionRef: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.searchOnStarshipList();
    this.getStarShip(this.page);
  }

  searchOnStarshipList() : void{
    this.searchService.searchQuery.subscribe(query => {
      if(query.length != 0){
        this.starshipsService.searchStarshipList(query).subscribe(starship => {
          //console.log('search',people);
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
    this.starshipsService.getStarships(page).subscribe(starshipList => {
      //console.log(starshipList);
      if(page == 1) this.totalPage = Math.ceil(starshipList.count/starshipList.results.length)
      this.pagination(starshipList);
      this.starships = starshipList.results;
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

  pagination(starships: StrashipList): void{
    if(starships.previous) {
      this.prevPage = this.getPageNumber(starships.previous)
      this.isPrevious = true;
    }
    if(starships.next){
      this.nextPage = this.getPageNumber(starships.next);
      this.isNext = true;
    }
  }

  goToPrevPage(): void{
    this.page = this.prevPage;
    if(this.page === 1) {
      this.isPrevious = false;
      return;
    }
    this.getStarShip(this.page);
  }

  goToNextPage(): void{
    this.page = this.nextPage;
    if(this.page == this.totalPage ) {
      this.isNext = false;
      return;
    }
    this.getStarShip(this.page);
  }

}
