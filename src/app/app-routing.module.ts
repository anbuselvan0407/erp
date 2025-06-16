import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { StudentComponent } from './student/student.component';
import { StaffComponent } from './staff/staff.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent},
  { path: 'dashboard', component: DashboardComponent},
  { path: 'header',component: HeaderComponent},
  { path: 'student', component:StudentComponent},
  { path: 'staff', component : StaffComponent},
  { path: '', redirectTo: '/login', pathMatch: 'full' } // Optional default route,

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
