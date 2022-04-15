import { Injectable } from "@angular/core";
import { Observable, of, Subject } from "rxjs";
import { SearchService } from "../core/services/search.service";

@Injectable()
export class MockSearchService extends SearchService{
  mockSearchQuery = new Subject<string>();

  constructor() {
    super();
   }

   override getLocaStorageData(): Observable<string[]> {
       return of(['to','ok','l']);
   }

   override storeInlocalStorage(query: string): void {
    return;
   }
}
