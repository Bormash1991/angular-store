import { Component, OnInit, OnChanges } from '@angular/core';
import { TypeOfProduct } from 'src/app/models/TypeOfProduct.inteface';
import { ProductsService } from 'src/app/products.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  protected date: TypeOfProduct[];

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.date = this.productsService.getDate();
  }
}
