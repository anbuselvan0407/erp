import { Component } from '@angular/core';
import { DrawerService } from '../drawer.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
constructor(private drawerService: DrawerService,
  private router: Router,
) {}

  onToggleDrawer() {
    this.drawerService.toggleDrawer();
  }
  
  ngOnInit(): void {
  }

  handleSearch(searchTerm: string): void {
    console.log('Search term received in HeaderComponent:', searchTerm);
    // Here you would implement your application's search logic:
    // 1. Navigate to a search results page:
    this.router.navigate(['/search-results'], { queryParams: { q: searchTerm } });

    // 2. Or, if it's a live search on the current page,
    //    you might call a service to filter data:
    // this.yourCourseService.filterCourses(searchTerm);
  }
onSearch(value: string): void {
  console.log('Search:', value);
}

}
