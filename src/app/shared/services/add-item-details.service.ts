import { Injectable } from '@angular/core';
import { ProductsService } from 'src/app/products.service';
import { TypeOfProduct } from '../../models/TypeOfProduct.inteface';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class AddItemDetailsService {
  item: TypeOfProduct;
  data: TypeOfProduct[] = [];
  constructor(
    private productsService: ProductsService,
    private router: Router
  ) {}
  getItem(id: any): TypeOfProduct {
    this.checkDate(id);
    return this.item;
  }
  checkDate(id: any) {
    this.productsService.getDate().subscribe((items) => (this.data = items));
    if (this.data.length) {
      for (let i = 0; i < this.data.length; i++) {
        if (this.data[i].id === +id) {
          this.item = this.data[i];
        }
      }
      if (!this.item) {
        this.router.navigateByUrl('/**');
      }
    }
  }
}
