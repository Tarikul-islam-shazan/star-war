import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PeopleDetailsComponent } from './components/people-details/people-details.component';
import { PeopleComponent } from './people.component';
import { PeopleResolver } from './people.resolver';

const routes: Routes = [
  {
    path: '',
    component: PeopleComponent,
  },
  {
    path: ':id',
    component: PeopleDetailsComponent,
    resolve: {
      people: PeopleResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PeopleRoutingModule { }
