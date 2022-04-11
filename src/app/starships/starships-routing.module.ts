import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StarshipDetailsComponent } from './components/starship-details/starship-details.component';
import { StarshipResolver } from './starship.resolver';
import { StarshipsComponent } from './starships.component';

const routes: Routes = [
  {
    path: '', component: StarshipsComponent
  },
  {
    path: ':id',
    component: StarshipDetailsComponent,
    resolve: {
      starship: StarshipResolver
    }
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StarshipsRoutingModule { }
