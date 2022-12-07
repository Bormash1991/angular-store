import { Component, OnInit } from '@angular/core';
import { TypeOfProduct } from '../models/TypeOfProduct.inteface';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  protected date: TypeOfProduct[];

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.date = this.productsService.createRandomeDate(8);
  }
}
