import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'transformLink'
})
export class TransformLinkPipe implements PipeTransform {

  transform(link: string, id: string): any {
    return '/' + link + '/' + id;
  }

}
