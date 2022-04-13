import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Starship } from '../../models/starship';
import { Location } from '@angular/common';

@Component({
  selector: 'app-starship-details',
  templateUrl: './starship-details.component.html',
  styleUrls: ['./starship-details.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StarshipDetailsComponent implements OnInit {
  starship!: Starship;

  constructor(
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private changeDetectionRef: ChangeDetectorRef,
    ) { }

  ngOnInit(): void {
    this.getStarshipDetails();
  }

  getStarshipDetails() : void {
    this.activatedRoute.data.subscribe(response => {
      this.starship = response['starship'];
      this.changeDetectionRef.markForCheck();
    });
  }

  backClicked() : void {
    this.location.back();
  }

}
