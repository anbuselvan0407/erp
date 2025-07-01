import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter' // 🚨 Impure pipe
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchTerm: string): any[] {
    return items.filter(item =>
      item.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
}
