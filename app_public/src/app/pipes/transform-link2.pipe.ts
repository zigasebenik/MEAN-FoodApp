import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transformLink2'
})
export class TransformLink2Pipe implements PipeTransform {

  transform(link: string, id: string, page: string): any {
    return '/' + link + '/' + id + '/' + page;
  }

}
