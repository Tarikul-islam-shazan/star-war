import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { HomeWorld } from '../../models/homeworld';
import { PeopleService } from '../../people.service';


@Component({
  selector: 'app-home-world',
  template:`{{ planet  }}`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeWorldComponent implements OnInit {
  @Input() homeWorldUrl = '';
  planet: string = '';
  peopleServiceSubscription = Subscription.EMPTY;

  constructor(private changeDetectionRef: ChangeDetectorRef,
    private peopleService: PeopleService) { }

  ngOnInit(): void {
    this.getHomeWorld(this.homeWorldUrl);
  }

  getHomeWorld( url: string) {
    this.peopleServiceSubscription = this.peopleService.getHomeWorld(url).subscribe( homeWorld => {
      this.planet = homeWorld.name;
      this.changeDetectionRef.markForCheck();
    });
  }

  ngOnDestroy(): void {
    this.peopleServiceSubscription.unsubscribe();
  }
}
