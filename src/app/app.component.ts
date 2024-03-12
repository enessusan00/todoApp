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
    status: 'pending'
  }

  title = 'todoApp';
  todos: any[] = [];



  getTodos() {
    this.ts.getTodos().subscribe((data: any) => {
      console.log(data);
      this.todos = data;
    }
    );
  }
sendData() {
  this.ts.createTodo(this.todo).subscribe((data: any) => {
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

