import { Component } from '@angular/core';
import { TypeOfProduct } from '../models/TypeOfProduct.inteface';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent {
  products: TypeOfProduct[];
  constructor(private productsService: ProductsService) {}
  ngOnInit() {
    this.products = this.productsService.getDate().slice(0, 5);
  }
}
