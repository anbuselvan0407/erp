import { ChangeDetectionStrategy, OnInit, Component } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { DrawerService } from '../drawer.service';
import { ViewChild } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ChangeDetectorRef } from '@angular/core';
import { AddStudentDialogComponent } from '../add-student-dialog/add-student-dialog.component';
import { MatDialog } from '@angular/material/dialog';

export interface Student {
  id: number;
  name: string;
  age: number;
  grade: string;
}


@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidenavComponent implements OnInit {
  @ViewChild('drawer') drawer!: MatDrawer;

  displayedColumns: string[] = ['id', 'name', 'age', 'grade'];
  dataSource: Student[] = [];

  constructor(
    private drawerService: DrawerService,
    private apiService: ApiService,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.loadStudentData();
    this.setupDrawerToggle();
  }

  openAddStudentDialog() {
  const dialogRef = this.dialog.open(AddStudentDialogComponent, {
    width: '400px',
    panelClass: 'custom-dialog-container'
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      // Result contains form data
      this.apiService.createStudent(result).subscribe({
        next: (newStudent: Student) => {
          this.dataSource = [...this.dataSource, newStudent];
          this.cdr.markForCheck();
        },
        error: (err) => console.error('Error adding student:', err)
      });
    }
  });
}


  loadStudentData() {
    this.apiService.getStudents().subscribe({
      next: (data: Student[]) => {
        console.log(data);
        this.dataSource = data;
        this.cdr.markForCheck();
        
      },
      error: (err: any) => {
        console.error('Error fetching student data:', err);
      },
    });
  }

  setupDrawerToggle() {
    this.drawerService.drawerToggle$.subscribe(() => {
      this.drawer.toggle(); // or .close()
    });
  }
}
