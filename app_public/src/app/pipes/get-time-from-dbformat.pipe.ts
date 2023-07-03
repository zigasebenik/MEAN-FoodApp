import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getTimeFromDBFormat'
})
export class GetTimeFromDBFormatPipe implements PipeTransform {

  transform(time: string): string {
    return time.substring(11,19);
  }

}
