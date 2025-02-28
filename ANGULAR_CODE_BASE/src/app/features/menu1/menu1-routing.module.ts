import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Menu1Component } from './component/menu1/menu1.component';
import { DashboardComponent } from 'app/common/components/dashboard-main/dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'new',
        component: Menu1Component,
        data:{title:'Menu',icon:'bi bi-menu-down'}
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Menu1RoutingModule { }
