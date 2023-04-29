import { Component, OnInit, OnDestroy } from '@angular/core';
import { BehaviorSubject, map, of } from 'rxjs';
import { TypeOfProduct } from 'src/app/models/TypeOfProduct.inteface';
import { ProductsService } from 'src/app/shared/services/products.service';
import { AngularFireDatabase } from '@angular/fire/compat/database';
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
    private db: AngularFireDatabase
  ) {}
  limit: number = 8;
  pageIndex: number = JSON.parse(sessionStorage.getItem('pageIndex')!) || 0;
  ngOnInit(): void {
    this.productsService.getProducts().forEach((products) => {
      if (products) {
        this.dataLength = products.length;
        this.dataForView = products;
        this.loading$.next(false);
      }
    });
  }
  changePage(event: any) {
    this.loading$.next(true);
    this.dataForView = [];
    this.pageIndex = event.pageIndex;
    sessionStorage.setItem('pageIndex', JSON.stringify(this.pageIndex));
    // this.productsService
    //   .getDataWithLimit<[TypeOfProduct[], number]>(
    //     this.limit,
    //     ++event.pageIndex
    //   )
    //   .subscribe((data) => {
    //     if (data) {
    //       this.dataForView = data[0];
    //       this.loading$.next(false);
    //     }
    //   });
  }
  ngOnDestroy() {}
}
