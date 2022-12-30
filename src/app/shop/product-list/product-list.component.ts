import { Component, OnInit, OnChanges } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TypeOfProduct } from 'src/app/models/TypeOfProduct.inteface';
import { ProductsService } from 'src/app/shop/products.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  protected data: TypeOfProduct[];
  buttonText: string = 'Add to Cart';
  loading$ = new BehaviorSubject<boolean>(true);
  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.productsService.getDate().subscribe((data) => {
      this.data = data;
      if (this.data.length) {
        this.loading$.next(false);
      }
    });
  }
}
