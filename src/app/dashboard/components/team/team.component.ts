import {
  CdkDragDrop,
  CdkDrag,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { WebSocketService } from 'src/app/auth/websocket.service';
import { TodoModalComponent } from 'src/app/shared/todo-modal/todo-modal.component';
import { UserListComponent } from 'src/app/shared/user-list/user-list.component';
import { TodoService } from 'src/app/todo.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit, OnDestroy {
  private adminSubscription: Subscription = new Subscription();
  private updatesSubscription: Subscription = new Subscription();
  todo: any = {
    title: 'Todo 1',
    description: 'This is the first todo',
    status: 'on going',
    id: 1
  }
  @ViewChild('dialogTemplate') dialogTemplate: TemplateRef<any> = {} as TemplateRef<any>;
  userTodos: any[];

  not_started: any[];
  in_progress: any[];
  done: any[];
  status = ['not started', 'in progress', 'done'];

  constructor(
    public dialog: MatDialog,
    private todoService: TodoService,
    private auth: AuthService,
    private websocketService: WebSocketService,
    private route: Router
  ) {
    this.dialogTemplate = {} as TemplateRef<any>;
    this.userTodos = [];
    this.not_started = [];
    this.in_progress = [];
    this.done = [];
  }
  returnList(status: string) {
    if (status === 'not started') {
      return Object(this.not_started);
    } else if (status === 'in progress') {
      return Object(this.in_progress);
    } else if (status === 'done') {
      return Object(this.done);
    }
    return [];
  }
  openDialog(item: any) {
    const dialogRef = this.dialog.open(TodoModalComponent, {
      data: {
        todo: item,
        component: this
      }

    }
    );
    dialogRef.afterClosed().subscribe(result => {
      this.getTodos();
    });
  }

  team: any[] = [];
  ngOnInit(): void {
    this.getTodos();
    if (this.isAdmin()) {
      this.getUserList();
      this.adminSubscription = this.websocketService.getUpdates("admin").subscribe({
        next: (update) => {
          this.team.find((user: any) => user.id === Number(update.userId)).online = update.status;
        },
        error: (error) => console.error(error)
      });
    }

    this.updatesSubscription = this.websocketService.getUpdates("notify").subscribe({
      next: (update) => {
        this.getTodos();
      },
      error: (error) => console.error(error)
    });


  }
  ngOnDestroy(): void {
    this.updatesSubscription.unsubscribe();
  }

  getUserList() {
    this.auth.getUserList().subscribe((users: any) => {
      this.team = users;


    });
  }
  getActiveCount() {
    return this.team.filter((user: any) => user.online == true).length;
  }
  showUserList() {
    const dialogRef = this.dialog.open(UserListComponent, {
      data: {
        team: this.team
      }
    }
    );

  }
  isAdmin() {
    return this.auth.isAdmin;
  }

  getTodos() {
    this.todoService.getTeamTodos().subscribe(
      {
        next: (todos: any) => {
          this.userTodos = todos;
          this.not_started = this.userTodos.filter(todo => todo.status === 'not started');
          this.not_started.sort((a, b) => b.id - a.id);
          this.in_progress = this.userTodos.filter(todo => todo.status === 'in progress');
          this.in_progress.sort((a, b) => b.id - a.id);
          this.done = this.userTodos.filter(todo => todo.status === 'done');
          this.done.sort((a, b) => b.id - a.id);
        },
        error: (e) => {
          this.auth.logout().subscribe();
          this.route.navigate(['/signin']);
        }
      }
    );
  }

  createTodo() {
    this.todoService.createTodo(this.todo).subscribe((todo: any) => {
    });
  }
  addTodo() {
    const todo: any = {
      title: 'New Task !',
      description: 'Do something',
      status: 'not started',
      type: 'team',
      id: localStorage.getItem('USER_ID')
    }
    this.todoService.createTodo(todo).subscribe((todo: any) => {

      this.userTodos.splice(0,0,todo);
      const dialogRef = this.dialog.open(TodoModalComponent, {
        data: {
          todo: todo
        }
      }
      );
      dialogRef.afterClosed().subscribe(
        (result) => {
          this.getTodos();
  
  
        }
      );
    }
    );
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      const todo = event.container.data[event.currentIndex] as any;


      if (event.container.id === "cdk-drop-list-0") {
        todo.status = 'not started';
      }
      else if (event.container.id === "cdk-drop-list-1") {
        todo.status = 'in progress';
      }
      else if (event.container.id === "cdk-drop-list-2") {

        todo.status = 'done';
      }
      this.todoService.updateTodo(todo.id, todo).subscribe((todo: any) => {

      }
      );
    }
  }
}
