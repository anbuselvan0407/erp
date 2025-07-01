import { Component, OnInit } from '@angular/core';
import { DrawerService } from '../drawer.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../services/auth.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
   userName: string = '';
   role: string = ';'
   
constructor(private drawerService: DrawerService,
    private router: Router,
    private authService: AuthService, // If using auth service
    private cdRef: ChangeDetectorRef

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
    this.getuser()
  }

  getuser(){
        this.authService.getCurrentUser().subscribe({
      next: (res) => {
        console.log('User API response:', res);
        this.userName = res.user?.name || 'Unknown';
        this.role = res.user?.role;
        this.cdRef.detectChanges(); 
      },
      error: (err) => {
        console.error('Failed to load user info', err);
      }
    });
  }
  


  handleSearch(searchTerm: string): void {
    console.log('Search term received in HeaderComponent:', searchTerm);

    this.router.navigate(['/search-results'], { queryParams: { q: searchTerm } });


  }


onSearch(value: string): void {
  console.log('Search:', value);
}

 

}
