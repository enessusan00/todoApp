import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './auth/auth.guard';

import { SigninComponent } from './auth/components/signin/signin.component';
import { SignupComponent } from './auth/components/signup/signup.component';
import { LayoutComponent } from './layout/layout.component';
import { DashboardModule } from './dashboard/dashboard.module';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () =>
         import('./dashboard/dashboard.module').then((m):typeof DashboardModule => m.DashboardModule)
      }
    ]
  },
  {
    path: '',
    redirectTo: '/signin',
    pathMatch: 'full'
  },
  // {
  //   path: 'admin-dashboard',
  //   canActivate: [AuthGuard],
  //   data: { roles: ['admin'] },
  // },
  // {
  //   path: 'dashboard',
  //   canActivate: [ AuthGuard],
  //   component: DashboardComponent,
  //   data: { roles: ['user'] }
  // }
  
  // {
  //   path: 'dashboard',
  //   component: DashboardComponent,
  //   canActivate: [AuthGuard]
  // },
  {
    path:'signin',
    component: SigninComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
