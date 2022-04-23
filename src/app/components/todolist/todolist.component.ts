import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Todo } from 'src/app/shared/models/todo';
import { TodoService } from 'src/app/shared/services/todo.service';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.scss']
})
export class TodolistComponent implements OnInit {

  @Input() todos: Todo[] = [];
  @Output() todoChange: EventEmitter<Todo> = new EventEmitter<Todo>();

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
  }

  trackTodo(id: number, todo: Todo): number {
    return todo.id;
  }

  doneChange(todo: Todo) {
    todo.done = !todo.done;
    this.todoService.modifyTodo(todo).subscribe((newtodo: Todo) => this.todoChange.emit(newtodo));
  }

  deleteTodo(todo: Todo) {
    this.todoService.deleteTodo(todo.id).subscribe((deletedTodo: Todo) => this.todoChange.emit(deletedTodo));
  }
}
