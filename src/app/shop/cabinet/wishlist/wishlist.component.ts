import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import {
  Observable,
  combineLatest,
  forkJoin,
  switchMap,
  take,
  zip,
} from 'rxjs';
import { TypeOfProduct } from 'src/app/models/TypeOfProduct.inteface';
import { FilterService } from 'src/app/shared/services/filter.service';
import { ProductsService } from 'src/app/shared/services/products.service';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss'],
})
export class WishlistComponent implements OnInit {
  wishList: TypeOfProduct[] = [];
  wishListObservales: Observable<TypeOfProduct>[] = [];
  public wishListLength: number;
  public pageIndex: number = 0;
  constructor(
    private productsService: ProductsService,
    private usersService: UsersService,
    private filterService: FilterService<TypeOfProduct>,
    private titleService: Title

  ) {}
  ngOnInit(): void {
    this.titleService.setTitle('Список бажань');

    this.usersService
      .getUser()
      .pipe(switchMap((user) => this.usersService.getUserInf(user?.uid!)))
      .subscribe((userInf) => {
        if (userInf && userInf.wishList) {
          for (let prodId of Object.keys(userInf.wishList)) {
            this.wishListObservales.push(
              this.productsService.getProductById(
                prodId
              ) as Observable<TypeOfProduct>
            );
          }
          combineLatest(this.wishListObservales)
            .pipe(take(1))
            .subscribe({
              next: (products) => {
                this.wishListLength = products.length;
                this.wishList = this.filterService.setData(
                  products.reverse(),
                  8
                );
              },
              error: (err) => {
                console.log(err);
              },
            });
        }
      });
  }
  changePage(event: any) {
    let { items, pageIndex } = this.filterService.changePage(event);
    this.wishList = items;
    this.pageIndex = pageIndex;
  }
}
