import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'titleCaser' })
export class TitleCaserPipe implements PipeTransform {
  transform(value: string): string {
    var returnValue = value[0].toUpperCase();
    for (var i = 1; i < value.length; i += 1)
      returnValue += value[i];

    return returnValue;
  }
}
