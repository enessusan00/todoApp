import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
const baseUrl = 'http://localhost:8080/api/todos';
@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(
    private http: HttpClient,
  ) { }
  getTodos(): Observable<any> {
    return this.http.get(baseUrl + `/${localStorage.getItem('USER_ID')}/user`);
  }
  createTodo(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }
  updateTodo(id: string, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }
  deleteTodo(id: string): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }
  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }
  findByStatus(status: string): Observable<any> {
    return this.http.get(`${baseUrl}?status=${status}`);
  }
  deleteAllDisables(): Observable<any> {
    return this.http.delete(`${baseUrl}/disables`);
  }
  uploadImage(data: any,id: number): Observable<any> {
    return this.http.post(`${baseUrl}/${id}/upload`, data);
  }
  getTodoImages(id: number): Observable<any> {
    return this.http.get(`${baseUrl}/${id}/images`);
  }
  getTodoImage(path: string): Observable<any> {
    return this.http.get(path);
  }
  deleteTodoImage(id: number): Observable<any> {
    return this.http.delete(`${baseUrl}/deleteImage/${id}`);
  }
  
}
