import { ChangeDetectorRef, Pipe, PipeTransform } from '@angular/core';
import { PeopleService } from '../people.service';

@Pipe({
  name: 'homeworld',
  pure: false
})
export class HomeworldPipe implements PipeTransform {
  private planet: string = '';
  private cachedUrl: string = '';

  constructor(
    private peopleService: PeopleService,
    private changeDetectionRef: ChangeDetectorRef,
  ) {}

  transform(homeWorldUrl: string): string {
    if(homeWorldUrl != this.cachedUrl) {
      this.cachedUrl = homeWorldUrl;
      this.peopleService.getHomeWorld(homeWorldUrl).subscribe( homeWorld => {
        const { name } = homeWorld;
        this.planet = name;
        this.changeDetectionRef.markForCheck();
      });
    }

    return this.planet;
  }

}
