import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { TypeOfProduct } from '../models/TypeOfProduct.inteface';
import { ProductsService } from '../products.service';
import { BehaviorSubject, take } from 'rxjs';
import { FilterService } from '../shared/services/filter.service';
import { filterCongig } from '../models/TypeOfFilterConfig.interface';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: TypeOfProduct[] = [];
  productsSecond: TypeOfProduct[] = [];
  loading$ = new BehaviorSubject<boolean>(true);
  filterSubj: any;
  dataSubj: any;
  constructor(
    private productsService: ProductsService,
    private filterService: FilterService
  ) {}

  ngOnInit() {
    this.dataSubj = this.productsService.getDate().subscribe((data) => {
      this.products = data.slice(0, 5);
      this.productsSecond = data.slice(0, 5);
      if (this.products.length) {
        this.loading$.next(false);
      }
    });
    this.filterSubj = this.filterService.configuration$.subscribe((elem) =>
      this.changeData(elem)
    );
  }
  changeData(elem: filterCongig) {
    if (elem.search) {
      this.products = this.productsSecond.filter(
        (product) => product.name.search(elem.search) >= 0
      );
    }
    if (!elem.search && !elem.price) {
      this.products = this.productsSecond;
    }
    if (elem.price) {
      if (elem.select == 'More than') {
        this.products = this.products.filter(
          (product) => product.price > elem.price
        );
      }
      if (elem.select == 'Less than') {
        this.products = this.products.filter(
          (product) => product.price < elem.price
        );
      }
    }
  }
  ngOnDestroy() {
    this.filterSubj.unsubscribe();
    this.dataSubj.unsubscribe();
  }
}
