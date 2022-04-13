import { ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import { SearchService } from './core/services/search.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent{
  title = 'star-wars';
  searchQuery = '';
  suggestString: string[] = [];


  constructor(
    public searchService: SearchService,
    private changeDetectionRef: ChangeDetectorRef,
  ){
      this.searchService.getLocaStorageData().subscribe(query => {
        console.log(query);
          this.suggestString = query;
        this.changeDetectionRef.markForCheck();
      });

      this.searchService.searchQuery.subscribe((query) => {
        if(query.length> 0) this.searchService.storeInlocalStorage(query);
        this.suggestString = this.searchService.sreachArray;
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
}
