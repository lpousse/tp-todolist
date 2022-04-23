import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Todo } from 'src/app/shared/models/todo';
import { User } from 'src/app/shared/models/user';
import { TodoService } from 'src/app/shared/services/todo.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent implements OnInit
{

  userId: number;
  user!: User;
  todoId: String | null;
  todo!: Todo;

  editmode: boolean;
  todoForm!: FormGroup;

  constructor(private router: Router, private route: ActivatedRoute, private userService: UserService, private todoService: TodoService)
  {
    this.userId = +<String>this.route.snapshot.paramMap.get('id');
    this.todoId = this.route.snapshot.paramMap.get('todoid');;
    this.editmode = this.todoId != null;

    this.todoForm = new FormGroup({
      task: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
      done: new FormControl('')
    })
  }

  ngOnInit(): void
  {
    this.userService.getUserById(this.userId).subscribe((user: User) => this.user = user);
    if (this.editmode)
    {
      this.todoService.getTodoById(+<String>this.todoId).subscribe((todo: Todo) => {
        this.todo = todo
        this.todoForm.setValue({
          task: todo.task,
          category: todo.category,
          done: todo.done
        })
      });
    }
  }

  submitForm()
  {
    if (!this.todoForm.valid)
      return;

    if (this.editmode)
    {
      this.todo.task = this.todoForm.value.task;
      this.todo.category = this.todoForm.value.category;
      this.todo.done = this.todoForm.value.done;
      this.todoService.modifyTodo(this.todo).subscribe(() => this.router.navigate(['users/' + this.userId]));;
    }
    else
    {
      this.todoService.addTodo({
        task: this.todoForm.value.task,
        category: this.todoForm.value.category,
        done: this.todoForm.value.done,
        userid: this.userId
      }).subscribe(() => this.router.navigate(['users/' + this.userId]));
    }
  }

  cancel()
  {
    this.router.navigate(['users/' + this.userId]);
  }
}
