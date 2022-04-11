import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  title = 'star-wars';
  searchQuery = ''
  //@Output() searchQueryString = new EventEmitter<String>();

  constructor(){}

  // searchThis(){
  //   console.log('called');
  //   this.searchQueryString.emit(this.searchQuery);
  // }

  // setSearchQuery() {
  //   //console.log('query', this.searchQuery);
  //   if(this.searchQuery.length >= 3){
  //     this.searchService.setSearchQuery(this.searchQuery);
  //   }
  //}
}
