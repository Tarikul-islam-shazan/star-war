import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StarshipsRoutingModule } from './starships-routing.module';
import { StarshipsComponent } from './starships.component';
import { StarshipsService } from './starships.service';
import { StarshipLengthComponent } from './components/starship-length/starship-length.component';
import { StarshipDetailsComponent } from './components/starship-details/starship-details.component';
import { StarshipResolver } from './starship.resolver';


@NgModule({
  declarations: [
    StarshipsComponent,
    StarshipLengthComponent,
    StarshipDetailsComponent,
  ],
  imports: [
    CommonModule,
    StarshipsRoutingModule
  ],
  providers:[
    StarshipsService,
    StarshipResolver
  ]
})
export class StarshipsModule { }
