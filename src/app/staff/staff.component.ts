import { Component } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { DrawerService } from '../drawer.service';
import { ViewChild } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ChangeDetectorRef } from '@angular/core';
import { CdkDragStart,CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { AuthService } from '../services/auth.service';
export interface Staff {
  id: number;
  name: string;
  grade: number;
  subject: string;
  [key: string]: string | number;

}

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss']
})
export class StaffComponent {
@ViewChild('drawer') drawer!: MatDrawer;

  role: string | null = null;

  displayedColumns: string[] = ['id', 'name', 'grade', 'subject'];
  dataSource: Staff[] = [];


  constructor(private drawerService: DrawerService,    private apiService: ApiService,
      private cdr: ChangeDetectorRef,private authService: AuthService) {}
   
   
   
      ngOnInit() {

        this.role = this.authService.getUserRole() || '';
        console.log(this.role);
    this.loadStaffData();
    this.drawerService.drawerToggle$.subscribe(() => {
      this.drawer.toggle(); // or .close()

    });
}

//  ngAfterViewInit(){
//     this.role = this.authService.getUserRole();
//   }


  dropRow(event: any) {
    moveItemInArray(this.dataSource, event.previousIndex, event.currentIndex);
    this.dataSource = [...this.dataSource]; // trigger change detection
  }

  dropcolumn(event: any) {
    moveItemInArray(this.displayedColumns, event.previousIndex, event.currentIndex);
    // Optional: Update the table's data source if necessary
    this.displayedColumns = [...this.displayedColumns]; // Trigger change detection if using a DataSource
  }


  loadStaffData() {
    this.apiService.getStaff().subscribe({
      next: (data: Staff[]) => {
        console.log(data);
        this.dataSource = data;


      },
      error: (err: any) => {
        console.error('Error fetching student data:', err);
      },
    });
  }
}