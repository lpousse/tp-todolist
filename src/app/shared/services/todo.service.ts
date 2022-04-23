import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Todo, TodoDto } from '../models/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http: HttpClient) { }

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(environment.urlApi + "/todos");
  }

  getTodosByUserId(userId: number): Observable<Todo[]> {
    return this.http.get<Todo[]>(environment.urlApi + `/todos?userid=${userId}`);
  }

  getTodosByUserIdAndDone(userId: number, done: boolean): Observable<Todo[]> {
    return this.http.get<Todo[]>(environment.urlApi + `/todos?userid=${userId}&done=${done}`);
  }

  getTodosByUserIdAndDoneAndCategory(userId: number, done: boolean, category:String): Observable<Todo[]> {
    return this.http.get<Todo[]>(environment.urlApi + `/todos?userid=${userId}&done=${done}&category=${category}`);
  }

  getTodoById(id: number): Observable<Todo> {
    return this.http.get<Todo>(environment.urlApi + `/todos/${id}`);
  }

  modifyTodo(todo: Todo): Observable<Todo> {
    return this.http.put<Todo>(environment.urlApi + `/todos/${todo.id}`, todo)
  }

  addTodo(todo: TodoDto): Observable<Todo> {
    return this.http.post<Todo>(environment.urlApi + `/todos`, todo)
  }

  deleteTodo(id: number): Observable<Todo> {
    return this.http.delete<Todo>(environment.urlApi + `/todos/${id}`);
  }
}
