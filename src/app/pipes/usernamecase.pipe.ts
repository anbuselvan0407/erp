import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'usernamecase'
})
export class UsernamecasePipe implements PipeTransform {

transform(value: string): string {
  if (!value) return '';

  return value
    .split(' ')
    .map(word =>
      word && word.length > 0
        ? word[0].toUpperCase() + word.substring(1).toLowerCase()
        : ''
    )
    .join(' ');
}


}
