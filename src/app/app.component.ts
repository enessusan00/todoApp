import { Component, OnInit } from '@angular/core';
import { TodoService } from './todo.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private ts: TodoService) { }
  todo = {
    title: '',
    status: 'pending',
    description: '',
    active: true
  }

  title = 'todoApp';
  todos: any[] = [];

  showIndex :any=null ;

  showTodo(index : number){
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
    console.log(data);
    this.getTodos();
  });
}

  ngOnInit() {
    this.getTodos();
  }
  deleteTodo(id: number) {
    this.ts.deleteTodo(id.toString()).subscribe((data: any) => {
      console.log(data);
      this.getTodos();
    });
  }
}

