import { Component } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { DrawerService } from '../drawer.service';
import { ViewChild } from '@angular/core';


@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss']
})
export class StaffComponent {
@ViewChild('drawer') drawer!: MatDrawer;

  constructor(private drawerService: DrawerService) {}
    ngOnInit() {
    this.drawerService.drawerToggle$.subscribe(() => {
      this.drawer.toggle(); // or .close()
    });
}
}