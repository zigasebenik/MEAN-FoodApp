import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getDateFromDBFormat'
})
export class GetDateFromDBFormatPipe implements PipeTransform {

  transform(date: string): string {
    return date.substring(0,10);
  }

}
