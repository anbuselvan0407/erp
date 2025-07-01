import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatTableModule} from '@angular/material/table';
import {MatSelectModule} from '@angular/material/select';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { StudentComponent } from './student/student.component';
import { StaffComponent } from './staff/staff.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { AddStudentDialogComponent } from './add-student-dialog/add-student-dialog.component';
import { MatPaginatorModule} from '@angular/material/paginator';
import { DragndropComponent } from './dragndrop/dragndrop.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import {
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';
import {NgFor} from '@angular/common';
import { HighlightDirective } from './highlight.directive';
import { RepeatDirective } from './directives/repeat.directive';
import { FilterPipe } from './pipes/filter.pipe';
import { UsernamecasePipe } from './pipes/usernamecase.pipe';
import { StudentFormComponent } from './student-form/student-form.component';
import { TableComponent } from './table/table.component';






@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    DashboardComponent,
    HeaderComponent,
    SidenavComponent,
    SearchBarComponent,
    StudentComponent,
    StaffComponent,
    AddStudentDialogComponent,
    DragndropComponent,
    HighlightDirective,
    RepeatDirective,
    FilterPipe,
    UsernamecasePipe,
    StudentFormComponent,
    TableComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatDividerModule,
    MatButtonModule ,
    MatInputModule,
    MatFormFieldModule,
    MatGridListModule,
    MatTableModule,
    MatSelectModule,
    FormsModule,
    MatMenuModule,
    MatDialogModule,
    HttpClientModule ,
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    DragDropModule,

    CdkDrag,
    CdkDropList,
    NgFor,
    BrowserAnimationsModule
  ],
   exports: [RouterModule],
providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ]
,
  bootstrap: [AppComponent],


})
export class AppModule { }
