import { Component } from '@angular/core';
import { DrawerService } from '../drawer.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
constructor(private drawerService: DrawerService,
    private router: Router,
    private authService: AuthService, // If using auth service
    private dialog: MatDialog

) {}

    logout() {
    // If you have an auth service
    this.authService.logout();
    
    // Navigate to login page
    this.router.navigate(['/login']);
    
    // Optional: Show confirmation message
    // this.dialog.open(LogoutConfirmationComponent);
  }

  onToggleDrawer() {
    this.drawerService.toggleDrawer();
  }
  
  ngOnInit(): void {
  }

  handleSearch(searchTerm: string): void {
    console.log('Search term received in HeaderComponent:', searchTerm);

    this.router.navigate(['/search-results'], { queryParams: { q: searchTerm } });


  }
onSearch(value: string): void {
  console.log('Search:', value);
}

 

}
