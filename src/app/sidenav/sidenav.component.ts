import {
  ChangeDetectionStrategy,
  OnInit,
  Component,
  AfterViewInit,
  ViewChild,
  ChangeDetectorRef
} from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { DrawerService } from '../drawer.service';
import { ApiService } from '../services/api.service';
import { AddStudentDialogComponent } from '../add-student-dialog/add-student-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CdkDragDrop, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { HostListener } from '@angular/core';
import { AuthService } from '../services/auth.service';
export interface Student {
  sno?:number;
  id: number;
  age: number;
  name: string;
  grade: string;
  [key: string]: any;
}



@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidenavComponent implements OnInit, AfterViewInit {
  @ViewChild('drawer') drawer!: MatDrawer;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(CdkDropList) dropList!: CdkDropList;
  @ViewChild('scrollContainer') scrollContainer!: ElementRef;

  displayedColumns: string[] = ['id', 'name', 'age', 'grade'];
  dataSource: Student[] = [];
  protected column = 0;

  totalItems = 0;
  page = 1;
  limit = 5;



  isDragging: boolean = false;

  scrollDirection: 'up' | 'down' | null = null;
  scrolling: boolean = false;


  dragSource: {row: Student, column: string} | null = null;
  currentDraggedColumn: any | null = null;
    columnDisplayNames: { [key: string]: string } = {

    id: 'Id',
    name: 'Name',
    age: 'Age',
    grade: 'Grade'
  };




  constructor(
    private drawerService: DrawerService,
    private apiService: ApiService,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog,
    private http: HttpClient,
    private authService: AuthService
  ) {}

  role = this.authService.getUserRole();

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }



@HostListener('document:mousemove', ['$event'])
onMouseMove(event: MouseEvent) {
  if (!this.isDragging || !this.scrollContainer) return;

  const container = this.scrollContainer.nativeElement;
  const buffer = 50;
  const { top, bottom } = container.getBoundingClientRect();

  if (event.clientY < top + buffer) {
    this.scrollDirection = 'up';
    this.startSmoothScroll();
  } else if (event.clientY > bottom - buffer) {
    this.scrollDirection = 'down';
    this.startSmoothScroll();
  } else {
    this.scrollDirection = null;
    this.scrolling = false;
  }
}


startSmoothScroll() {
  if (this.scrolling || !this.scrollDirection) return;
  this.scrolling = true;

  const container = this.scrollContainer.nativeElement;
  const scrollSpeed = 5;

  const scrollStep = () => {
    if (!this.isDragging || !this.scrollDirection) {
      this.scrolling = false;
      return;
    }

    if (this.scrollDirection === 'up') {
      container.scrollTop -= scrollSpeed;
    } else if (this.scrollDirection === 'down') {
      container.scrollTop += scrollSpeed;
    }

    requestAnimationFrame(scrollStep);
  };

  requestAnimationFrame(scrollStep);
}



  ngOnInit() {
    this.fetchStudents(this.page, this.limit);
    this.setupDrawerToggle();
    this.role = this.authService.getUserRole();
  }

fetchStudents(page: number, limit: number): void {
  this.http.get<any>(`http://localhost:3000/?page=${page}&limit=${limit}`)
    .subscribe(response => {
      this.dataSource = response.data; // ← now this is a plain array
      this.totalItems = response.total; // ← total students in DB
      console.log(this.dataSource);
      this.cdr.markForCheck();
    });
}





  onPagechange(event: PageEvent): void {
    this.page = event.pageIndex + 1;
    this.limit = event.pageSize;
    this.fetchStudents(this.page, this.limit);
  }

  openAddStudentDialog() {
    const dialogRef = this.dialog.open(AddStudentDialogComponent, {
      width: '400px',
      panelClass: 'custom-dialog-container',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.apiService.createStudent(result).subscribe({
          next: (newStudent: Student) => {
          this.dataSource = [...this.dataSource, newStudent];

            this.cdr.markForCheck();
          },
          error: (err) => console.error('Error adding student:', err),
        });
      }
    });
  }

//   drop(event: CdkDragDrop<string[]>) {
//     const prevActive = this.displayedColumns[this.column];
//     moveItemInArray(this.displayedColumns, event.previousIndex, event.currentIndex);
//     this.column = this.displayedColumns.indexOf(prevActive);
//   }
// }

  setupDrawerToggle() {
    this.drawerService.drawerToggle$?.subscribe(() => {
      this.drawer?.toggle();
    });
  }


// onColumnDragStart(column: string): void {
//   this.currentDraggedColumn = column;
// }



onDragStart() {
  this.isDragging = true;

}

onDragEnd() {
  this.isDragging = false;
    this.scrollDirection = null;
  this.scrolling = false;
}




  dropTable(event:CdkDragDrop<Student[]>){
    moveItemInArray(this.dataSource, event.previousIndex, event.currentIndex);
    this.dataSource = [...this.dataSource];
    this.cdr.markForCheck();
  }

  dropColumn(event: any) {
    moveItemInArray(this.displayedColumns, event.previousIndex, event.currentIndex);
    this.displayedColumns=[...this.displayedColumns];
    this.cdr.markForCheck();
  }


  getColumnDisplayName(column: string): string {
    return this.columnDisplayNames[column] || column;
  }


  getMatColumnDefClass(column: string): string {

    return `mat-column-${column}`;
  }





}
