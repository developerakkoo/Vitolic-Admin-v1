import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'subDetails'
})
export class SubDetailsPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
