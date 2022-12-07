import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'uah',
})
export class UahPipe implements PipeTransform {
  transform(value: number): string {
    return '₴' + value.toString();
  }
}
