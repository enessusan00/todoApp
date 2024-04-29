
import { DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, EventEmitter, Inject, Injectable, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';
import { NgbModal, NgbModalConfig, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/auth/auth.service';
import { TodoService } from 'src/app/todo.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  providers: [NgbModalConfig, NgbModal, MatButtonModule, MatButtonModule]
})

@Injectable()
export class UserListComponent implements OnInit {
  constructor(
    private todoService: TodoService,
    config: NgbModalConfig,
    @Inject(DIALOG_DATA) public data: { team: any },
    public dialogRef: MatDialogRef<UserListComponent>,
    private auth: AuthService
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }



  team: any[] = [];


  ngOnInit(): void {
    this.team = this.data.team;
   
  }


  closeModal() {
    this.dialogRef.close();
  }


}