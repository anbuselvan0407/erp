import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {
 searchTerm: string = '';

 itemList = ['Students', 'Staffs', 'Dashboard', 'Attendance'];
 seearch = '';
  

  // Use @Output to emit the search term to the parent component (e.g., HeaderComponent)
  @Output() search = new EventEmitter<any>();

  onSearch(): void {
    if (this.searchTerm.trim()) { // Only emit if the search term is not empty
      this.search.emit(this.searchTerm.trim());
      console.log('Search initiated for:', this.searchTerm.trim()); // For debugging
      // Optionally clear the search bar after emitting
      // this.searchTerm = '';
    }
  }
}
