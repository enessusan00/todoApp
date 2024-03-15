import { Component, OnInit } from '@angular/core';
import { TodoService } from './todo.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('fadeOut', [
      state('void', style({ opacity: '0', transform: 'translateY(-15%)' })),
      state('*', style({ opacity: '*' })),
      transition('* <=> void', [animate('0.4s ease-in-out')]),
    ]),
  ]
})
export class AppComponent implements OnInit {
  constructor(private ts: TodoService) { }
  todo = {
    title: '',
    status: 'on going',
    description: '',
    active: true
  }

  title = 'todoApp';
  todos: any[] = [];

  showIndex :any=null ;

  showTodo(index : number){
    console.log(index);
    this.showIndex = this.todos[index];
  }

  getTodos() {
    this.ts.getTodos().subscribe((data: any) => {
      console.log(data);
      this.todos = data;
      this.todos.reverse();
    }
    );
  }

sendData() {
  this.ts.createTodo(this.todo).subscribe((data: any) => {
    this.todo.title = '';
    this.getTodos();
  });
}
deleteAllDisables(){
  this.ts.deleteAllDisables().subscribe((data: any) => {
    this.getTodos();
  });
}

  ngOnInit() {
    this.getTodos();
  }

  disableTodo (id: number) {
    this.ts.updateTodo(id.toString(), { active: false }).subscribe((data: any) => {
      this.getTodos();
    });
  }
  activeTodo (id: number) {
    this.ts.updateTodo(id.toString(), { active: true }).subscribe((data: any) => {
      this.getTodos();
    });
  }
  deleteTodo(id: number) {
    this.ts.deleteTodo(id.toString()).subscribe((data: any) => {
      this.getTodos();
    });
  }
  completeTodo(id: number) {
    this.ts.updateTodo(id.toString(), { status: 'done' }).subscribe((data: any) => {
      this.getTodos();
    });
  }
  startTodo (id: number) {
    this.ts.updateTodo(id.toString(), { status: 'in progress' }).subscribe((data: any) => {
      this.getTodos();
    });
  }
  resetTodo (id: number) {  
    this.ts.updateTodo(id.toString(), { status: 'on going' }).subscribe((data: any) => {
      this.getTodos();
    });
  }
  showDeleteds = false;
  showDeletedModal(){
    this.showDeleteds = !this.showDeleteds;
  }
}

