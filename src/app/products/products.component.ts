import { Component, OnInit, OnDestroy } from '@angular/core';
import { TypeOfProduct } from '../models/TypeOfProduct.inteface';
import { ProductsService } from '../products.service';
import { BehaviorSubject } from 'rxjs';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products: TypeOfProduct[] = [];
  loading$ = new BehaviorSubject<boolean>(true);
  constructor(private productsService: ProductsService) {}
  ngOnInit() {
    this.productsService.getDate().subscribe((data) => {
      this.products = data.slice(0, 5);
      if (this.products.length) {
        this.loading$.next(false);
      }
    });
  }
}
