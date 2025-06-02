import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DrawerService {
private drawerToggleSubject = new Subject<void>();

  drawerToggle$ = this.drawerToggleSubject.asObservable();

  toggleDrawer() {
    this.drawerToggleSubject.next();
  }
}
