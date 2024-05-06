
import { DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, EventEmitter, Inject, Injectable, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';
import { NgbModal, NgbModalConfig, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/auth/auth.service';
import { TodoService } from 'src/app/todo.service';

@Component({
  selector: 'todo-modal',
  templateUrl: './todo-modal.component.html',
  styleUrls: ['./todo-modal.component.scss'],
  providers: [MatButtonModule]
})

@Injectable()
export class TodoModalComponent implements OnInit {
  constructor(
    private todoService: TodoService,
    config: NgbModalConfig,
    @Inject(DIALOG_DATA) public data: { todo: any, component?: any },
    public dialogRef: MatDialogRef<TodoModalComponent>,
    private auth: AuthService
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }
  todo: any


  toggleEdit(id: string) {
    const input = document.getElementById(id) as HTMLInputElement;
    if (input) {
      input.disabled = !input.disabled;
      if (input.disabled) {
        this.updateTodo();
      }
    }

    setTimeout(() => {
      this.focusToInput(id);
    }, 100);
  }
  removeTodo(id: number) {
    this.todoService.deleteTodo(id.toString()).subscribe((todo: any) => {
      this.closeModal();
    });
  }
  canEdit = true;
  ngOnInit(): void {
    this.todo = this.data.todo;
    if (this.data.component) {
      this.canEdit = this.isAdmin();
    }
    this.getImages();
  }
  isAdmin() {
    return this.auth.isAdmin;
  }
  focusToInput(id: string) {
    const input = document.getElementById(id) as HTMLInputElement;
    if (input) {
      input.focus();
      input.select();
    }
  }
  updateStatus(status: string) {
    this.todo.status = status;
    this.updateTodo();
  }
  updateTodo() {
    this.todoService.updateTodo(this.todo.id, this.todo).subscribe((todo: any) => {
    }
    );
  }
  closeModal() {
    this.dialogRef.close();
  }

  uploadImage(event: any) {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('images', file);
    this.todoService.uploadImage(formData, this.todo.id).subscribe((data: any) => {
      this.getImages();
    });
  }
  images: any;
  getImages() {
    this.todoService.getTodoImages(this.todo.id).subscribe((data: any) => {
      this.images = data.map((image: any) => {
        return {
          id: image.id,
          url: 'http://localhost:8080/' + image.imagePath
        }
      }).reverse();
    });
  }
  deleteTodoImage(id: number) {
    this.todoService.deleteTodoImage(id).subscribe((todo: any) => {
      this.getImages()
    }
    );
  }
}