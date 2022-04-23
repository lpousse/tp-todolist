import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoFormComponent } from './components/todo-form/todo-form.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { UserlistComponent } from './components/userlist/userlist.component';

const routes: Routes = [
  { path: 'users', component: UserlistComponent },
  { path: 'users/:id', component: UserDetailsComponent },
  { path: 'users/:id/addtodo', component: TodoFormComponent },
  { path: 'users/:id/edittodo/:todoid', component: TodoFormComponent },
  { path: '', pathMatch: 'full', redirectTo: 'users'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
