import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService } from '../../common/services/auth-guard.service';
import { PropertyNewComponent } from '../property/property-new/property-new.component';
import { FindPropertyComponent } from '../property/find-property/find-property.component';
import { PropertyListingComponent } from '../property/property-listing/property-listing.component';
import { EditPropertyComponent } from '../property/edit-property/edit-property.component';
import { PropertyMainComponent } from '../property/property-main/property-main.component';
import { PropertyViewComponent } from '../property/property-view/property-view.component';
import { DashboardComponent } from '../../common/components/dashboard-main/dashboard.component';
import { PropertyListComponent } from './property-list/property-list.component';

const ChildRoutes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'new',
        component: PropertyNewComponent,
        canActivate: [AuthGuardService],
        data:{title:'Add Property',icon:'bi bi-house door-fill'}
      },
      {
        path: 'search',
        component: FindPropertyComponent
      },
      {
        path:'list',
        component:PropertyListComponent,
        data:{title:'List Property',icon:'bi bi-house door-fill'}
      },
      {
        path: 'listing',
        component: PropertyMainComponent,
        children: [
          {
            path: 'all',
            component: PropertyListingComponent,
            data: { data: 'all' }
          },
          {
            path: 'active',
            component: PropertyListingComponent,
            data: { data: 'available' }
          },
          {
            path: 'sold',
            component: PropertyListingComponent,
            data: { data: 'sold' }
          },
          {
            path: 'inactive',
            component: PropertyListingComponent,
            data: { data: 'expired' }
          },
          {
            path: '',
            redirectTo: 'all'
          }
        ],
        canActivate: [AuthGuardService]
      },
      {
        path: 'edit/:propertySlug',
        component: EditPropertyComponent,
        canActivate: [AuthGuardService],
        data:{title:'Edit Property',icon:'bi bi-building'}
      },
      {
        path: 'view/:propertySlug',
        component: PropertyViewComponent,
        data:{title:'View Property',icon:'bi bi-building'}
      },
      {
        path: '',
        redirectTo: 'new'
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ChildRoutes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class PropertyRoutingModule { }
