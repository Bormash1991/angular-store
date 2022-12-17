import { TypeOfProduct } from './../../models/TypeOfProduct.inteface';
import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/products.service';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products: TypeOfProduct[];
  constructor(private productsService: ProductsService) {}
  ngOnInit() {
    this.products = this.productsService.getDate().slice(0, 5);
  }
}
