import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { StudentComponent } from './student/student.component';
import { StaffComponent } from './staff/staff.component';
import { authGuard } from './guards/auth.guard';
import { canDeactivateGuard } from './guards/can-deactivate.guard';
import { roleGuard } from './guards/role.guard'; // ✅ update path if needed


// const routes: Routes = [
//   { path: 'login', component: LoginComponent },
//   { path: 'signup', component: SignupComponent},
//   { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
//   { path: 'header',component: HeaderComponent},
//   { path: 'student', component:StudentComponent, canActivate: [authGuard]},
//   { path: 'staff', component : StaffComponent, canActivate: [authGuard]},
//   { path: '', redirectTo: '/login', pathMatch: 'full' } // Optional default route,

// ];

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard],
    canActivateChild: [authGuard],  
    children: [
      { path: 'sidenav', component: SidenavComponent }
     ]
    },
    { path: 'student', component: StudentComponent, canActivate: [authGuard,roleGuard], canDeactivate: [canDeactivateGuard] ,data: { roles: ['admin', 'student'] }},
    { path: 'staff', component: StaffComponent , canActivate: [authGuard,roleGuard] ,data: { roles: ['admin', 'staff'] }},
    
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
