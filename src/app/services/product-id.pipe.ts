import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../models/product.model';

@Pipe({
  name: 'productId'
})
export class ProductIdPipe implements PipeTransform {

  transform(productId: number, products: Product[]): string {
    const product = products.find(product => product.id === productId);
    return product ? product.name : "";
  }

}
