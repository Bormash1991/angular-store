import { Component, OnInit, OnChanges } from '@angular/core';
import { TypeOfProduct } from 'src/app/models/TypeOfProduct.inteface';
import { ProductsService } from 'src/app/products.service';
import { AddCartItemService } from 'src/app/shared/services/add-cart-item.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  protected date: TypeOfProduct[];

  constructor(
    private productsService: ProductsService,
    private addCartItemService: AddCartItemService
  ) {}

  ngOnInit(): void {
    this.date = this.productsService.getDate();
  }
}
