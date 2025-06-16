import { Component } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { DrawerService } from '../drawer.service';
import { ViewChild } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ChangeDetectorRef } from '@angular/core';

export interface Staff {
  id: number;
  name: string;
  grade: number;
  subject: string;
}

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss']
})
export class StaffComponent {
@ViewChild('drawer') drawer!: MatDrawer;

  displayedColumns: string[] = ['id', 'name', 'grade', 'subject'];
  dataSource: Staff[] = [];

  constructor(private drawerService: DrawerService,    private apiService: ApiService,
      private cdr: ChangeDetectorRef) {}
    ngOnInit() {
    this.loadStaffData();
    this.drawerService.drawerToggle$.subscribe(() => {
      this.drawer.toggle(); // or .close()
    });
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