import { Component, OnInit, OnDestroy } from '@angular/core';
import { BehaviorSubject, map, of, switchMap } from 'rxjs';
import { TypeOfProduct } from 'src/app/models/TypeOfProduct.inteface';
import { ProductsService } from 'src/app/shared/services/products.service';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { ActivatedRoute } from '@angular/router';
import { FilterService } from 'src/app/shared/services/filter.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit, OnDestroy {
  protected data: TypeOfProduct[];
  protected dataForView: TypeOfProduct[];
  dataLength: number = 0;
  buttonText: string = 'Add to Cart';
  loading$ = new BehaviorSubject<boolean>(true);

  constructor(
    private productsService: ProductsService,
    private db: AngularFireDatabase,
    private route: ActivatedRoute,
    private filterService: FilterService<TypeOfProduct>
  ) {}
  limit: number = 8;
  categoryUrl: string = sessionStorage.getItem('category')! || '';
  pageIndex: number = JSON.parse(sessionStorage.getItem('pageIndex')!) || 0;
  ngOnInit(): void {
    this.route.url
      .pipe(
        map((segments) => {
          return segments.map((segment) => segment.path).join('/');
        }),
        switchMap((url) => {
          console.log(url);
          if (this.categoryUrl != url) {
            sessionStorage.setItem('pageIndex', '0');
            this.pageIndex = 0;
          }
          sessionStorage.setItem('category', url);
          this.dataForView = [];
          this.dataLength = 0;
          this.loading$.next(true);
          return this.productsService.getProductsByCategory(url);
        })
      )
      .subscribe((products) => {
        if (products) {
          this.dataLength = products.length;
          this.dataForView = this.filterService.setData(
            products.reverse(),
            this.limit,
            this.pageIndex
          );
          this.loading$.next(false);
        }
      });
  }
  changePage(event: any) {
    sessionStorage.setItem('pageIndex', event.pageIndex);
    let { items, pageIndex } = this.filterService.changePage(event);
    this.dataForView = items;
    this.pageIndex = pageIndex;
  }
  ngOnDestroy() {}
}
