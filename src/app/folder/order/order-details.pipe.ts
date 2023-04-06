import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderDetails'
})
export class OrderDetailsPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
