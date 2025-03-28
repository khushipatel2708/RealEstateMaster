import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { AboutComponent } from './about/about.component';
import { PropertyComponent } from './property/property.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { ServiceComponent } from './service/service.component';
import { PropertyDetailComponent } from './property-detail/property-detail.component';
import { PaymentComponent } from './payment/payment.component';
import { ProfileComponent } from './profile/profile.component';
import { PaymentsuccessComponent } from './paymentsuccess/paymentsuccess.component';
import { Payment1Component } from './payment1/payment1.component';
import { Payment2Component } from './payment2/payment2.component';
import { PaymentFailedComponent } from './payment-failed/payment-failed.component';


// const routes: Routes = [
//   {
//     path: '',
//     component: MainComponent,
//     loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule)
     
//   },

//   {
//     path: 'menu1',
//     component: MainComponent,
//     loadChildren: () => import('./features/menu1/menu1.module').then(m => m.Menu1Module)
      
//   },  
//   {
//     path: 'property',
//     component: MainComponent,
//     loadChildren: () => import('./features/property/property.module').then(m => m.PropertyModule)
  
//   },
//   {
//     path: 'role',
//     component: MainComponent,
//     loadChildren: () => import('./features/role/role.module').then(m => m.RoleModule)
      
//   },
//   {
//     path: 'users',
//     component: MainComponent,
//     loadChildren: () => import('./features/features.module').then(m => m.FeaturesModule)
     
//   },
//   {
//     path: 'permission',
//     component: MainComponent,
//     loadChildren: () => import('./features/permission/permission.module').then(m => m.PermissionModule)
    
//   },
//   {
//     path: 'builder',
//     component: MainComponent,
//     loadChildren: () => import('./features/builder/builder.module').then(m => m.BuilderModule)
    
//   },
//   {
//     path: 'admin',
//     component: MainComponent,
//      loadChildren: () => import('./features/admin/admin.module').then(m => m.AdminModule),
//       data: { isAdmin: true }
//   },
//   {
//     path: '**',
//     component: NotFoundComponent,

//   }
// ]
const routes=[
  {path:'',component:HomeComponent},
  {path:'login',component:LoginComponent},
  {path:'sign-up',component:RegistrationComponent},
  {path:'about',component:AboutComponent},
  {path:'property',component:PropertyComponent},
  {path:'contact-us',component:ContactUsComponent},
  {path:'service',component:ServiceComponent},
  {path:'property-detail/:id',component:PropertyDetailComponent},
  {path:'payment/:id',component:PaymentComponent},
  {path:'payment-success',component:PaymentsuccessComponent},
  {path:'payment1/:id',component:Payment1Component},
  {path:'payment2',component:Payment2Component},
  {path:'payment-failed',component:PaymentFailedComponent},
  {
    path:'profile',component:ProfileComponent
  },
  {path:'**',redirectTo:''},
  
];

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
