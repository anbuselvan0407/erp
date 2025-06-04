import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { DrawerService } from '../drawer.service';
import { ViewChild } from '@angular/core';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}


const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'boron', weight: 10.811, symbol: 'B'}
];


@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidenavComponent {
@ViewChild('drawer') drawer!: MatDrawer;

  constructor(private drawerService: DrawerService) {}
   
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;


  ngOnInit() {
    this.drawerService.drawerToggle$.subscribe(() => {
      this.drawer.toggle(); // or .close()
    });
  }
} 
