import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './main/main.component';
import { NotFoundComponent } from './common/components/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule)
     
  },

  {
    path: 'menu1',
    component: MainComponent,
    loadChildren: () => import('./features/menu1/menu1.module').then(m => m.Menu1Module)
      
  },  
  {
    path: 'property',
    component: MainComponent,
    loadChildren: () => import('./features/property/property.module').then(m => m.PropertyModule)
  
  },
  {
    path: 'role',
    component: MainComponent,
    loadChildren: () => import('./features/role/role.module').then(m => m.RoleModule)
      
  },
  {
    path: 'users',
    component: MainComponent,
    loadChildren: () => import('./features/features.module').then(m => m.FeaturesModule)
     
  },
  {
    path: 'permission',
    component: MainComponent,
    loadChildren: () => import('./features/permission/permission.module').then(m => m.PermissionModule)
    
  },
  // {
  //   path: 'builder',
  //   component: MainComponent,
  //   loadChildren: () => import('./features/builder/builder.module').then(m => m.BuilderModule)
    
  // },
  {
    path: 'admin',
    component: MainComponent,
     loadChildren: () => import('./features/admin/admin.module').then(m => m.AdminModule),
      data: { isAdmin: true }
  },
  {
    path: '**',
    component: NotFoundComponent,

  }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes //, {enableTracing: true} 
    )
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
