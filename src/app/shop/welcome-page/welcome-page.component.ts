import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';
import { TypeOfProduct } from 'src/app/models/TypeOfProduct.inteface';
import { ProductsService } from 'src/app/shared/services/products.service';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss'],
})
export class WelcomePageComponent implements OnInit {
  protected data: TypeOfProduct[] = [];
  loading$ = new BehaviorSubject<boolean>(true);
  constructor(
    private productsService: ProductsService,
    private titleService: Title
  ) {}
  ngOnInit(): void {
    this.productsService.getProducts().subscribe((products) => {
      this.data = [];
      this.loading$.next(false);
      this.setRondomProducts(products);
    });

    this.titleService.setTitle('Angular-store');
  }
  setRondomProducts(products: TypeOfProduct[]) {
    const maxNumber = products.length;
    for (let i = 0; i < 15; i++) {
      const rNumber = Math.floor(Math.random() * maxNumber);
      if (!this.data.length) {
        this.data.push(products[rNumber]);
      } else {
        this.data.forEach((product, i) => {
          if (i == this.data.length - 1 && product.id != products[rNumber].id) {
            this.data.push(products[rNumber]);
          }
        });
      }
    }
  }
}
