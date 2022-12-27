import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { TypeOfProduct } from '../models/TypeOfProduct.inteface';
import { ProductsService } from '../products.service';
import { BehaviorSubject, Subscription, take } from 'rxjs';
import { filterCongig } from '../models/TypeOfFilterConfig.interface';
import { ConfigService } from '../shared/services/config.service';
import { FilterService } from '../shared/services/filter.service';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit, OnDestroy {
  public products: TypeOfProduct[] = [];
  public loading$ = new BehaviorSubject<boolean>(true);
  private filterSubj: Subscription;
  private dataSubj: Subscription;
  public productsLength: number;
  public pageIndex: number = 0;
  constructor(
    private productsService: ProductsService,
    private filterCongig: ConfigService,
    private filterService: FilterService
  ) {}

  ngOnInit() {
    this.dataSubj = this.productsService.getDate().subscribe((data) => {
      if (data.length) {
        this.loading$.next(false);
        this.products = this.filterService.setData(data, 5);
        this.productsLength = data.length;
      }
    });
    this.filterSubj = this.filterCongig.configuration$.subscribe((elem) => {
      this.changeData(elem, 'price');
      if (elem.sortAs) {
        this.sortData(elem);
      }
    });
  }
  changeData(elem: filterCongig, param: 'price' | 'date') {
    let arr = this.filterService.changeData(elem, param);
    this.products = arr[0] as TypeOfProduct[];
    this.productsLength = arr[1] as number;
    this.pageIndex = arr[2] as number;
  }
  sortData(elem: filterCongig) {
    this.products = this.filterService.sortData(elem) as TypeOfProduct[];
  }
  changePage(event: any) {
    let arr = this.filterService.changePage(event);
    this.products = arr[0] as TypeOfProduct[];
    this.pageIndex = arr[1] as number;
  }
  ngOnDestroy() {
    this.filterSubj.unsubscribe();
    this.dataSubj.unsubscribe();
  }
}
