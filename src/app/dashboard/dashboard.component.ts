import { Component, OnInit } from '@angular/core';
import { TodoService } from '../todo.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [
    trigger('fadeOut', [
      state('void', style({ opacity: '0', transform: 'translateY(-15%)' })),
      state('*', style({ opacity: '*' })),
      transition('* <=> void', [animate('0.4s ease-in-out')]),
    ]),
    trigger('fadeIn', [
      state('void', style({ opacity: '0' })),
      state('*', style({ opacity: '*' })),
      transition('void => *', [animate('0.4s ease-out')]),
    ]),
  ]
})
export class DashboardComponent implements OnInit {
  constructor(
    private ts: TodoService,
    private http: HttpClient,
    private auth: AuthService,
    private router: Router,

  ) { }
  todo = {
    userId: localStorage.getItem('USER_ID'),
    title: '',
    status: 'on going',
    description: '',
    active: true
  }
  username: string | null = '';
  title = 'todoApp';
  todos: any[] = [];

  showIndex: any = null;





  showTodo(index: number) {
    this.showIndex = this.todos[index];
  }

  getTodos() {
    this.ts.getTodos().subscribe((data: any) => {
      this.todos = data;
      this.todos.reverse();
    });
  }

  sendData() {
    this.ts.createTodo(this.todo).subscribe((data: any) => {
      this.todo.title = '';
      this.getTodos();
      this.toggleDetailModal(data);
    });
  }

  deleteAllDisables() {
    this.ts.deleteAllDisables().subscribe((data: any) => {
      this.getTodos();
    });
  }

  role: string | null = ''
  ngOnInit() {
    this.username = localStorage.getItem("USERNAME");
    this.role = localStorage.getItem("ROLE")
    this.getTodos();
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/auth']);
  }
  disableTodo(id: number) {
    this.enableDetailModal();
    this.showDetailModal = false;
    this.ts.updateTodo(id.toString(), { active: false }).subscribe((data: any) => {
      this.getTodos();
    });
  }

  activeTodo(id: number) {
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
    this.enableDetailModal();

    this.ts.updateTodo(id.toString(), { status: 'done' }).subscribe((data: any) => {
      this.getTodos();
    });
  }

  startTodo(id: number) {
    this.enableDetailModal();
    this.ts.updateTodo(id.toString(), { status: 'in progress' }).subscribe((data: any) => {
      this.getTodos();
    });
  }

  resetTodo(id: number) {
    this.enableDetailModal();

    this.ts.updateTodo(id.toString(), { status: 'on going' }).subscribe((data: any) => {
      this.getTodos();
    });
  }

  showDeleteds = false;

  showDeletedModal() {
    this.showDeleteds = !this.showDeleteds;
  }

  showSettingsModal = false;
  toggleSettingsModal() {
    this.showSettingsModal = !this.showSettingsModal
  }
  defaultTodo = {
    id: 0,
    title: '',
    status: 'on going',
    description: '',
    active: true
  }

  showDetailModal = false;
  isUpdating = false;
  enableDetailModal() {
    this.isUpdating = true;
    setTimeout(() => {
      this.isUpdating = false;
    }, 500);
  }
  toggleDetailModal(todo?: any) {
    if (this.isUpdating == true) return;
    if (todo) this.defaultTodo = todo;
    this.getTodoImages();
    this.showDetailModal = !this.showDetailModal;
  }

  editTitle = false;

  toggleEditTitle() {
    this.editTitle = !this.editTitle;
    if (this.editTitle) {
      // focus on input
    }
  }

  updateTitle() {
    this.ts.updateTodo(this.defaultTodo.id.toString(), { title: this.defaultTodo.title }).subscribe((data: any) => {
      this.getTodos();
    });
    this.editTitle = false;
  }

  cancelEditTitle() {
    this.editTitle = false;
    this.getTodos();
    this.defaultTodo.title = this.todos.find(todo => todo.id === this.defaultTodo.id).title;
  }

  editDescription = false;

  toggleEditDescription() {
    this.editDescription = !this.editDescription;
    if (this.editDescription) {
      // focus on input
    }
  }

  updateDescription() {
    this.ts.updateTodo(this.defaultTodo.id.toString(), { description: this.defaultTodo.description }).subscribe((data: any) => {
      this.getTodos();
    });
    this.editDescription = false;
  }

  cancelEditDescription() {
    this.editDescription = false;
    this.getTodos();
    this.defaultTodo.description = this.todos.find(todo => todo.id === this.defaultTodo.id).description;
  }

  updateStatus(status: string) {
    this.defaultTodo.status = status;
    this.ts.updateTodo(this.defaultTodo.id.toString(), { status }).subscribe((data: any) => {
      this.getTodos();
    });
  }


  uploadImage(event: any) {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('images', file);

    this.ts.uploadImage(formData, this.defaultTodo.id).subscribe((data: any) => {
      this.getTodoImages();
    });
  }
  defaultTodoImages: any[] = [];
  getTodoImages() {
    this.ts.getTodoImages(this.defaultTodo.id).subscribe((data: any) => {
      this.defaultTodoImages = data.map((image: any) => {
        return {
          id: image.id,
          url: 'http://localhost:8080/' + image.imagePath
        }
      });
    });
  }
  deleteTodoImage(id: number) {
    this.ts.deleteTodoImage(id).subscribe((data: any) => {
      this.getTodoImages();
    });
  }

  getImages(): Promise<string[]> {
    const imageUrls: string[] = [];
    const imageExtensions = ['.png', '.jpeg'];

    return new Promise<string[]>((resolve, reject) => {
      this.defaultTodoImages.forEach((image: any) => {
        const imageUrl = image.url;
        const extension = imageUrl.substring(imageUrl.lastIndexOf('.')).toLowerCase();

        if (imageExtensions.includes(extension)) {
          // Send request to fetch image
          // Assuming you are using HttpClient from Angular
          this.http.get(imageUrl, { responseType: 'blob' }).subscribe((response: Blob) => {
            const reader = new FileReader();
            reader.onloadend = () => {
              const base64data = reader.result as string;
              imageUrls.push(base64data);
              if (imageUrls.length === this.defaultTodoImages.length) {
                resolve(imageUrls);
              }
            };
            reader.readAsDataURL(response);
          }, (error: any) => {
            reject(error);
          });
        }
      });
    });
  }
}
