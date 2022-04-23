import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Todo } from 'src/app/shared/models/todo';
import { User } from 'src/app/shared/models/user';
import { TodoService } from 'src/app/shared/services/todo.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit
{
  userId: number;
  user!: User;
  
  pendingTodos: Todo[] = [];
  doneTodos: Todo[] = [];

  categories: Set<String> = new Set<String>();
  ALL_CATEGORIES_LABEL = "Toutes";
  selectedCategory: String = this.ALL_CATEGORIES_LABEL;

  constructor(private route: ActivatedRoute, private userService: UserService, private todoService: TodoService)
  {
    this.userId = +<String>this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void
  {
    this.userService.getUserById(this.userId).subscribe((user: User) => this.user = user);
    this.loadTodos();
  }

  loadTodos()
  {
    //this.categories.clear();
    this.doneTodos = [];
    this.pendingTodos = [];
    this.todoService.getTodosByUserId(this.userId).subscribe((todos: Todo[]) => {
      todos.forEach(todo => {
        this.categories.add(todo.category);
        if (this.selectedCategory == this.ALL_CATEGORIES_LABEL || this.selectedCategory == todo.category) {
          if (todo.done)
            this.doneTodos.push(todo);
          else
            this.pendingTodos.push(todo);
        }
      });
    })
  }

  categoryChange(value: String) {
    this.selectedCategory = value;
    this.loadTodos();
  }
}
