import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StarshipsRoutingModule } from './starships-routing.module';
import { StarshipsComponent } from './starships.component';
import { StarshipsService } from './starships.service';


@NgModule({
  declarations: [
    StarshipsComponent
  ],
  imports: [
    CommonModule,
    StarshipsRoutingModule
  ],
  providers:[
    StarshipsService
  ]
})
export class StarshipsModule { }
