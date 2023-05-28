import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { BehaviorSubject, Subscription, take } from 'rxjs';
import { TypeOfProduct } from 'src/app/models/TypeOfProduct.inteface';
import { ProductsService } from 'src/app/shared/services/products.service';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss'],
})
export class WelcomePageComponent implements OnInit, OnDestroy {
  protected data: TypeOfProduct[] = [];
  loading$ = new BehaviorSubject<boolean>(true);
  protected sub: Subscription;
  constructor(
    private productsService: ProductsService,
    private titleService: Title
  ) {}
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
  ngOnInit(): void {
    this.sub = this.productsService
      .getProducts()
      .pipe(take(1))
      .subscribe((products) => {
        if (products.length) {
          this.data = this.setRandomProducts(products);
          this.loading$.next(false);
        }
      });

    this.titleService.setTitle('Angular-store');
  }
  setRandomProducts(products: TypeOfProduct[]) {
    const maxNumber = products.length;
    const productsArr = [];
    let n = 8;
    if (maxNumber < n) {
      n = maxNumber;
    }
    for (let i = 0; i < n; i++) {
      const rNumber = Math.floor(Math.random() * maxNumber);
      if (!productsArr.length) {
        productsArr.push(products[rNumber]);
      } else {
        productsArr.forEach((product, i) => {
          if (
            i == productsArr.length - 1 &&
            product.id != products[rNumber].id
          ) {
            productsArr.push(products[rNumber]);
          } else if (i == productsArr.length - 1) {
            n += 1;
          }
        });
      }
    }
    return productsArr;
  }
}
