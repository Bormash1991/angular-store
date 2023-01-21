import { Component, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TypeOfProduct } from 'src/app/models/TypeOfProduct.inteface';
import { ProductsService } from 'src/app/shop/products.service';
import { LocalStorageService } from 'src/app/shared/services/localstorage.service';
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
  constructor(private productsService: ProductsService) {}
  limit: number = 8;
  pageIndex: number = JSON.parse(sessionStorage.getItem('pageIndex')!) || 0;
  ngOnInit(): void {
    this.productsService.getData<TypeOfProduct[]>().subscribe((data) => {
      if (data) {
        this.dataLength = data.length;
      }
    });
    let index = this.pageIndex;
    this.productsService
      .getDataWithLimit<TypeOfProduct[]>(this.limit, ++index)
      .subscribe((data) => {
        if (data) {
          this.dataForView = data;
          this.loading$.next(false);
          this.dataLength = data.length;
        }
      });
  }
  changePage(event: any) {
    this.loading$.next(true);
    this.dataForView = [];
    this.pageIndex = event.pageIndex;
    sessionStorage.setItem('pageIndex', JSON.stringify(this.pageIndex));
    this.productsService
      .getDataWithLimit<TypeOfProduct[]>(this.limit, ++event.pageIndex)
      .subscribe((data) => {
        if (data) {
          this.dataForView = data;
          this.loading$.next(false);
        }
      });
  }
  ngOnDestroy() {}
}
