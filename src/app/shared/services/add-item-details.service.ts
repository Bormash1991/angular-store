import { Injectable } from '@angular/core';
import { ProductsService } from 'src/app/products.service';
import { TypeOfProduct } from '../../models/TypeOfProduct.inteface';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class AddItemDetailsService {
  item: TypeOfProduct;
  constructor(
    private productsService: ProductsService,
    private router: Router
  ) {}
  getItem(id: any): TypeOfProduct {
    this.checkDate(id);
    return this.item;
  }
  checkDate(id: any) {
    let date: TypeOfProduct[] = this.productsService.getDate();
    for (let i = 0; i < date.length; i++) {
      if (date[i].id === +id) {
        this.item = date[i];
      }
    }
    if (!this.item) {
      this.router.navigateByUrl('/**');
    }
  }
}
