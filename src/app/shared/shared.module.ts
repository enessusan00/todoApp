import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { TodoModalComponent } from "./todo-modal/todo-modal.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgArrayPipesModule } from "ngx-pipes";
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from "@angular/material/dialog";
@NgModule({
  declarations: [
    TodoModalComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild([])
  ],
  exports: [
    TodoModalComponent,
    MatButtonModule,
    NgArrayPipesModule, 
    MatDialogModule,

  ]
})
export class SharedModule { }