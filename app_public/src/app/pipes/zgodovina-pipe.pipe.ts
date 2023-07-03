import { Pipe, PipeTransform } from '@angular/core';
import {NavigationEnd} from "@angular/router";
import {filter} from "rxjs/operators";

@Pipe({
  name: 'zgodovinaPipe'
})
export class ZgodovinaPipePipe implements PipeTransform {

  transform(value: any): any {
    return filter(dogodekUsmerjanja => dogodekUsmerjanja instanceof NavigationEnd)
  }

}
