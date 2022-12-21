import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { AddItemDetailsService } from 'src/app/shared/services/add-item-details.service';
import { TypeOfProduct } from 'src/app/models/TypeOfProduct.inteface';
import { ActivatedRoute } from '@angular/router';
import { AddCartItemService } from 'src/app/shared/services/add-cart-item.service';
import { ProductsService } from 'src/app/products.service';

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
  constructor(
    private AddItemDetailsService: AddItemDetailsService,
    private route: ActivatedRoute,
    private addCartItemService: AddCartItemService,
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.productsService.getDate().subscribe((items) => {
      this.allData = items;
      this.productData = this.AddItemDetailsService.getItem(id, this.allData);
      if (this.productData) {
        this.check(this.productData);
      }
    });
    this.subj = this.addCartItemService.arrSubject$.subscribe((n) =>
      this.check(n)
    );
  }
  setData(elem: TypeOfProduct) {
    this.addCartItemService.setData(elem);
    this.check(elem);
  }
  check(elem: TypeOfProduct) {
    let count = this.addCartItemService.checkCount(elem);
    try {
      if (count && elem.id == this.productData.id) {
        this.buttonText = 'In Cart';
      } else if (elem.id == this.productData.id) {
        this.buttonText = 'Add to Cart';
      }
    } catch (error) {
      console.log('page-not-found');
    }
  }
  ngOnDestroy() {
    this.subj.unsubscribe();
  }
}
