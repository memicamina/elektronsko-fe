import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../models/product';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(products: Product[], filterString: string): any {
    if (filterString != '') {
      products = products.filter((product) =>
        product.naziv.toLowerCase().includes(filterString.toLowerCase())
      );
      return products;
    } else {
      return products;
    }
  }
}
