import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PeopleData } from '../../models/people';

@Component({
  selector: 'app-people-details',
  templateUrl: './people-details.component.html',
  styleUrls: ['./people-details.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PeopleDetailsComponent implements OnInit {
  people!: PeopleData;

  constructor(
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private changeDetectionRef: ChangeDetectorRef,
    ) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(response => {
      this.people = response['people'];
      this.changeDetectionRef.markForCheck();
    });
  }

  backClicked() : void {
      this.location.back();
  }

}
