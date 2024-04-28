import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamComponent } from './components/team/team.component';
import { UserComponent } from './components/user/user.component';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '../shared/shared.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgArrayPipesModule } from 'ngx-pipes';



@NgModule({
  declarations: [
    TeamComponent,
    UserComponent,
  ],
  imports: [
    NgArrayPipesModule,
    DragDropModule,
    SharedModule,
    RouterModule,
    CommonModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
