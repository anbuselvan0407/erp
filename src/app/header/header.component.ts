import { Component } from '@angular/core';
import { DrawerService } from '../drawer.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
constructor(private drawerService: DrawerService) {}

  onToggleDrawer() {
    this.drawerService.toggleDrawer();
  }

onSearch(value: string): void {
  console.log('Search:', value);
}

}
