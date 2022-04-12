import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  page: number = 1;
  totalPage: number = 0;
  prevPage: number = 0;
  nextPage: number = 0;
  isPrevious: boolean = false;
  isNext: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  getPageNumber(urlString : string): number{
    const url = new URL(urlString);
    const pageNumber = url.searchParams.get('page');
    return  Number(pageNumber);
  }

}
