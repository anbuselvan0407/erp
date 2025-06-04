import { Component } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { DrawerService } from '../drawer.service';
import { ViewChild } from '@angular/core';
@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent {
@ViewChild('drawer') drawer!: MatDrawer;
  constructor(private drawerService: DrawerService) {}
    ngOnInit() {
    this.drawerService.drawerToggle$.subscribe(() => {
      this.drawer.toggle(); // or .close()
    });
}
}