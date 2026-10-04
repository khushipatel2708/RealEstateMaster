import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AvailabilityComponent } from './availability.component';
import { DashboardComponent } from 'app/common/components/dashboard-main/dashboard.component';
import { AvailabilityListComponent } from './availability-list/availability-list.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'availability',
        component: AvailabilityComponent,
        data:{title:'Builder Availability',icon:'bi bi-person-fill-gear'}
      },
      {
        path:'availability-list',
        component:AvailabilityListComponent,
        data:{title:'Availability-list',icon:'bi bi-person-fill-gear'}
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AvailabilityRoutingModule { }
