import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StarshipsRoutingModule } from './starships-routing.module';
import { StarshipsComponent } from './starships.component';
import { StarshipsService } from './starships.service';
import { StarshipDetailsComponent } from './components/starship-details/starship-details.component';
import { StarshipResolver } from './starship.resolver';
import { StarshipLengthPipe } from './pipes/starship-length.pipe';


@NgModule({
  declarations: [
    StarshipsComponent,
    StarshipDetailsComponent,
    StarshipLengthPipe,
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
