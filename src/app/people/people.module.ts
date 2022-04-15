import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PeopleRoutingModule } from './people-routing.module';
import { PeopleComponent } from './people.component';
import { PeopleService } from './people.service';
import { PeopleDetailsComponent } from './components/people-details/people-details.component';
import { PeopleResolver } from './people.resolver';
import { PeopleHeightPipe } from './pipes/people-height.pipe';
import { HomeworldPipe } from './pipes/homeworld.pipe';

@NgModule({
  declarations: [
    PeopleComponent,
    PeopleDetailsComponent,
    PeopleHeightPipe,
    HomeworldPipe,
  ],
  imports: [
    CommonModule,
    PeopleRoutingModule,

  ],
  providers:[PeopleService, PeopleResolver]
})
export class PeopleModule { }
