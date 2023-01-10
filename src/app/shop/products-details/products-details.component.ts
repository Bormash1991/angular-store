import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { TypeOfProduct } from 'src/app/models/TypeOfProduct.inteface';
import { ActivatedRoute, Router } from '@angular/router';
import { AddCartItemService } from 'src/app/shared/services/add-cart-item.service';
import { ProductsService } from 'src/app/shop/products.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-products-details',
  templateUrl: './products-details.component.html',
  styleUrls: ['./products-details.component.scss'],
})
export class ProductsDetailsComponent implements OnInit, OnDestroy {
  productData: TypeOfProduct;
  buttonText: string = 'Add to Cart';
  subj: any;
  allData: TypeOfProduct[];
  loading$ = new BehaviorSubject<boolean>(true);
  constructor(
    private route: ActivatedRoute,
    private addCartItemService: AddCartItemService,
    private productsService: ProductsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.productsService.getDataById<TypeOfProduct>(id).subscribe((data) => {
      if (!data) {
        this.router.navigateByUrl('/404');
      } else if (data) {
        this.productData = data;
        this.addCartItemService.reloadData();
        this.loading$.next(false);
      }
    });
    this.subj = this.addCartItemService.productsSubj$.subscribe((n) =>
      this.check(n)
    );
  }
  setData(elem: TypeOfProduct) {
    this.addCartItemService.setData(elem);
  }
  check(elems: TypeOfProduct[]) {
    for (let i = 0; i < elems.length; i++) {
      if (elems[i].id == this.productData.id) {
        this.productData = elems[i];
        this.buttonText = 'In Cart';
        return;
      }
    }
    this.buttonText = 'Add to Cart';
  }
  ngOnDestroy() {
    this.subj.unsubscribe();
  }
}
