
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SearchService } from './core/services/search.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit{
  searchQuery = '';
  suggestString: string[] = [];
  searchServiceSubscription = Subscription.EMPTY;


  constructor(
    private router: Router,
    public searchService: SearchService,
    private changeDetectionRef: ChangeDetectorRef,
  ){}

  ngOnInit(): void {
    this.loadSearchDataFromStorage();
    this.loadSearchData();
  }

  loadSearchDataFromStorage(): void {
    this.searchServiceSubscription = this.searchService.getLocaStorageData().subscribe(query => {
      this.suggestString = query;
      this.changeDetectionRef.markForCheck();
    });
  }

  loadSearchData(): void {
    this.searchServiceSubscription = this.searchService.searchQuery.subscribe((query) => {
      if(query.length> 0) this.searchService.storeInlocalStorage(query);
      this.suggestString = this.searchService.searchArray;
      this.changeDetectionRef.markForCheck();
    });
  }

  suggestSearch(query: string): void {
    this.searchQuery = query;
    this.searchService.searchQuery.next(query);
  }

 doSearch(): void {
   this.searchService.searchQuery.next(this.searchQuery);
 }

 reloadCurrentPage(path: string): void {
  this.router.navigateByUrl('/', {skipLocationChange: true})
  .then(()=> this.router.navigate([path]));
 }

 ngOnDestroy(): void {
   this.searchServiceSubscription.unsubscribe();
 }
}
