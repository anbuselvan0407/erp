import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDrawer } from '@angular/material/sidenav';
import { DrawerService } from '../drawer.service';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent {
  @ViewChild('drawer') drawer!: MatDrawer;
  showForm = false;
  role: string | null = null;
  studentForm: FormGroup;
  submitted = false;

  constructor(private drawerService: DrawerService, private fb: FormBuilder, private authService: AuthService) {
    this.studentForm = this.fb.group({
      name: ['', Validators.required],
      age: ['', Validators.required],
      grade: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.role = this.authService.getUserRole();
    this.drawerService.drawerToggle$.subscribe(() => {
      this.drawer.toggle();
    });
  }

  // ngAfterViewInit(){
  //   this.role = this.authService.getUserRole();
  // }
  onAddStudentClick() {
    this.showForm = true;
  }

  onCancel() {
    this.showForm = false;
    this.studentForm.reset();
    this.submitted = false;
  }

  onSubmit() {
    this.submitted = true;
    if (this.studentForm.valid) {
      console.log('Form Submitted:', this.studentForm.value);
      this.studentForm.reset();
      this.showForm = false;
    }
  }

    canDeactivate(): boolean {
    if (this.studentForm.dirty && !this.submitted) {
      return confirm('You have unsaved changes. Leave page?');
    }
    return true;
  }

}
