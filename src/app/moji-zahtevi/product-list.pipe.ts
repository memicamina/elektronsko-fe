import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'productList'
})
export class ProductListPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
