import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PeopleRoutingModule } from './people-routing.module';
import { PeopleComponent } from './people.component';
import { PeopleService } from './people.service';
import { HomeWorldComponent } from './components/home-world/home-world.component';
import { PeopleDetailsComponent } from './components/people-details/people-details.component';
import { PeopleResolver } from './people.resolver';
import { PeopleHeightPipe } from './pipes/people-height.pipe';

@NgModule({
  declarations: [
    PeopleComponent,
    HomeWorldComponent,
    PeopleDetailsComponent,
    PeopleHeightPipe,
  ],
  imports: [
    CommonModule,
    PeopleRoutingModule,

  ],
  providers:[PeopleService, PeopleResolver]
})
export class PeopleModule { }
