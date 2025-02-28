import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BuilderComponent } from './builder.component';
import { DashboardComponent } from 'app/common/components/dashboard-main/dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'new',
        component: BuilderComponent,
        data:{title:'Builder',icon:'bi bi-person-fill-gear'}
      },
    ],
  },
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BuilderRoutingModule { }
